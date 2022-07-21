import { CART_REASON_TYPES } from "../../../enums/order_subs";

export const checkIfCustumizationSame = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let flag = arr1.every((cust1) => {
    let cIdx = arr2.findIndex((cust2) => cust2._id === cust1._id);
    if (cIdx === -1) {
      return false;
    }

    let cust2 = arr2[cIdx];
    if (cust1.options.length !== cust2.options.length) {
      return false;
    }
    let flag2 = cust1.options.every(
      (op1) => cust2.options.findIndex((op2) => op2._id === op1._id) !== -1
    );

    return flag2;
  });

  return flag;
};

export const filterSameVersions = (versions) => {
  versions.forEach((ver, idx) => {
    if (!Boolean(ver)) {
      return ver;
    }
    let sameIdx = versions.findIndex((s_ver) =>
      checkIfCustumizationSame(ver.custumization_arr, s_ver.custumization_arr)
    );

    if (sameIdx !== -1 && sameIdx !== idx) {
      versions[idx].itemCount += versions[sameIdx].itemCount;
      versions[sameIdx] = false;
    }

    return ver;
  });

  return versions.filter((ver) => Boolean(ver));
};

export const getChargesMap = (charges, total) => {
  return charges.map((chr) => {
    let charge = {};
    charge.text = chr.label_text;

    if (chr.method === "compound") {
      charge.sub_charges = chr.sub_charges.map((s_chr) => {
        return {
          text: s_chr.label_text,
          total: round(
            calculateTotalByPerc(s_chr.method, total, s_chr.value),
            2
          ),
        };
      });
      charge.total = charge.sub_charges.reduce(
        (m_total, m_chr) => m_chr.total + m_total,
        0
      );
    } else {
      charge.sub_charges = [];
      charge.total = round(
        calculateTotalByPerc(chr.method, total, chr.value),
        2
      );
    }

    return charge;
  });
};

export const calculateTotalByPerc = (method, total, value) => {
  let tkns = method.split("-");
  if (tkns.length > 1 && tkns[1] === "perc") {
    let result = total * (Number(value) / 100);
    switch (tkns[0]) {
      case "minus":
        return -result;
      default:
        return result;
    }
  }

  return Number(value);
};

export const getErrorTypeMessage = (type) => {
  switch (type) {
    case CART_REASON_TYPES.ITEMS_UNAVAILABLE:
      return "Some of the Items are Not Available"; //manual - semi status
    case CART_REASON_TYPES.KITCHEN_CLOSED:
      return "Sorry the Kitchen is Closed";
    case CART_REASON_TYPES.MANUAL_REJECTION:
      return "Order rejected by the Restaurant";
    case CART_REASON_TYPES.ORDER_INVALID:
      return "Something Went Wrong..";
    case CART_REASON_TYPES.ANONYMOUS:
      return "Something Went Wrong..";
    default:
      return "";
  }
};

export const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};
