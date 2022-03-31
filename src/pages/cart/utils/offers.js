import {
  FIELDS,
  FIELD_TYPE,
  OFFER_PROCESS_TYPE,
  OPERATORS,
  OPERATOR_TYPE,
} from "../../../enums/offer";
import { isObjEmpty } from "../../../utils/helpers";

function processOffer(offer, payload) {
  // For Custom offers it is always enabled, but the offer is processed using a API call..
  let discountedValue = 0;
  if (offer.process_type === OFFER_PROCESS_TYPE.COMPUTED) {
    let operators = offer.value_type.split("-");
    discountedValue = operate(operators[1], payload.totalCost, offer.value);

    discountedValue =
      discountedValue > Number(offer.cap_value)
        ? Number(offer.cap_value)
        : discountedValue;
  }

  return discountedValue;
}

function isOfferApplicable(offer, payload) {
  if (isObjEmpty(offer) || isObjEmpty(payload)) {
    return false;
  }
  const isConditionallyValid = offer.conditions.every((condtn) => {
    let field = getFieldFromFieldType(condtn.decider_field);

    if (!condtn.always_valid && !Boolean(field)) {
      return false;
    }

    if (
      !condtn.always_valid &&
      !isConditionValid(
        condtn.operator,
        getFieldValueFromPayload(field.split("/"), payload),
        condtn.decider_value
      )
    ) {
      return false;
    }

    return true;
  });

  return isConditionallyValid;
}

function isConditionValid(operator, a, b) {
  switch (operator) {
    case OPERATOR_TYPE.GREATER_THAN:
      return Number(a) > Number(b);
    case OPERATOR_TYPE.GREATER_THAN_OR_EQUAL:
      return Number(a) >= Number(b);
    case OPERATOR_TYPE.LESS_THAN:
      return Number(a) < Number(b);
    case OPERATOR_TYPE.LESS_THAN_OR_EQUAL:
      return Number(a) <= Number(b);
    default:
      return false;
  }
}

function getFieldFromFieldType(field) {
  switch (field) {
    case FIELD_TYPE.ORDER_TOTAL:
      return FIELDS.ORDER_TOTAL;
    case FIELD_TYPE.TABLE_TOTAL:
      return FIELDS.TABLE_TOTAL;
    default:
      return "";
  }
}

function getFieldValueFromPayload(paramArr, payload) {
  if (paramArr.length === 1) {
    return payload[paramArr[0]];
  }
  return getFieldValueFromPayload(
    [...paramArr.slice(1, paramArr.length)],
    payload[paramArr[0]]
  );
}

function operate(operator, a, b) {
  switch (operator) {
    case OPERATORS.MINUS:
      return Number(a) - Number(b);
    case OPERATORS.DIVIDE:
      return Number(a) / Number(b);
    case OPERATORS.PERC:
      return (a / 100) * b; // gives a% of b
    default:
      return a;
  }
}

export { processOffer, isOfferApplicable };
