import { clone } from "ramda";
import ALERT_TYPES from "../../enums/alert_types";
import {
  checkIfCustumizationSame,
  filterSameVersions,
} from "../../pages/cart/utils/helpers";
import { isOfferApplicable, processOffer } from "../../pages/cart/utils/offers";
import { getItemsTotalCost } from "../../pages/menu/utils/helper";
import store from "../store";
import { setAlert } from "./alert";
import { CLEAR_CART, UPDATE_CART } from "./types";

//#region Action creators

export const addItem =
  (payload, itemId, versionIdx = -1) =>
  (dispatch) => {
    try {
      let item = {
        _id: itemId,
        ...payload,
      };
      let flag = false;
      let cart = clone(store.getState().cart);
      cart.items = cart.items.map((c_item) => {
        if (item._id === c_item._id) {
          flag = true;
          item.versions =
            versionIdx === -1
              ? payload.versions
              : checkIfCustumizationSame(
                  payload.versions[payload.versions.length - 1]
                    .custumization_arr,
                  c_item.versions[versionIdx].custumization_arr
                )
              ? c_item.versions.map((ver, idx) => {
                  if (idx === versionIdx) {
                    ver.itemCount +=
                      payload.versions[payload.versions.length - 1].itemCount;
                  }
                  return ver;
                })
              : [
                  ...c_item.versions.slice(0, versionIdx),
                  payload.versions[payload.versions.length - 1],
                  ...c_item.versions.slice(
                    versionIdx + 1,
                    c_item.versions.length
                  ),
                ];
          item.versions = filterSameVersions(item.versions);
          return item;
        }
        return c_item;
      });

      if (!flag) {
        cart.items = [...cart.items, item];
      }

      cart.totalCost = getItemsTotalCost(cart.items);

      cart = reApplyAllOffers(cart);

      dispatch({
        type: UPDATE_CART,
        payload: cart,
      });
    } catch (err) {
      setAlert("Error updating cart..", ALERT_TYPES.ERROR);
    }
  };

export const removeItem =
  (itemId, itemCount, versionIdx = -1) =>
  (dispatch) => {
    try {
      let cart = clone(store.getState().cart);
      cart.items =
        itemCount > 0
          ? cart.items
              .map((c_item) => {
                if (itemId === c_item._id) {
                  let mIdx =
                    versionIdx !== -1 ? versionIdx : c_item.versions.length - 1;
                  if (c_item.versions.length > 0) {
                    if (c_item.versions[mIdx].itemCount === 1) {
                      c_item.versions = [
                        ...c_item.versions.slice(0, mIdx),
                        ...c_item.versions.slice(
                          mIdx + 1,
                          c_item.versions.length
                        ),
                      ];
                    } else {
                      c_item.versions[mIdx].itemCount -= 1;
                    }
                  }
                }
                c_item.itemCount = itemCount;
                return c_item;
              })
              .filter((c_item) => c_item.versions.length > 0)
          : versionIdx !== -1
          ? cart.items
              .map((c_item) => {
                if (c_item._id === itemId) {
                  c_item.versions = [
                    ...c_item.versions.slice(0, versionIdx),
                    ...c_item.versions.slice(
                      versionIdx + 1,
                      c_item.versions.length
                    ),
                  ];
                }

                return c_item;
              })
              .filter((c_item) => c_item.versions.length > 0)
          : cart.items.filter((c_item) => c_item._id !== itemId);

      cart.totalCost = getItemsTotalCost(cart.items);

      cart = reApplyAllOffers(cart);

      dispatch({
        type: UPDATE_CART,
        payload: cart,
      });
    } catch (err) {
      setAlert("Error updating cart..", ALERT_TYPES.ERROR);
    }
  };

export const updateItem = (itemId, version, versionIdx) => (dispatch) => {
  try {
    let cart = clone(store.getState().cart);
    cart.items = cart.items.map((c_item) => {
      if (itemId === c_item._id) {
        let anyIdx = c_item.versions.findIndex((ver) =>
          checkIfCustumizationSame(
            version.custumization_arr,
            ver.custumization_arr
          )
        );

        if (anyIdx !== -1 && anyIdx !== versionIdx) {
          c_item.versions[anyIdx].itemCount += version.itemCount;
          c_item.versions = [
            ...c_item.versions.slice(0, versionIdx),
            ...c_item.versions.slice(versionIdx + 1, c_item.versions.length),
          ];
        } else {
          c_item.versions = [
            ...c_item.versions.slice(0, versionIdx),
            version,
            ...c_item.versions.slice(versionIdx + 1, c_item.versions.length),
          ];
        }
      }

      return c_item;
    });

    cart.totalCost = getItemsTotalCost(cart.items);

    cart = reApplyAllOffers(cart);

    dispatch({
      type: UPDATE_CART,
      payload: cart,
    });
  } catch (err) {
    setAlert("Error updating cart..", ALERT_TYPES.ERROR);
  }
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};

export const applyOfferOnCart = (discountedValue, offer) => (dispatch) => {
  let cart = clone(store.getState().cart);
  let applied_offer = {
    label_text: "Offer Discount",
    type: "applied",
    offer_id: offer?._id,
    discount: discountedValue,
    is_applicable: true,
    code: offer?.code,
  };

  cart.offers = cart.offers.filter((o) => o.type !== "applied");

  cart.offers.push(applied_offer);

  dispatch({
    type: UPDATE_CART,
    payload: cart,
  });
};

export const removeOffers = (offerIds) => (dispatch) => {
  let cart = store.getState().cart;

  cart.offers = cart.offers.filter((o) => !offerIds.includes(o.offer_id));

  dispatch({
    type: UPDATE_CART,
    payload: cart,
  });
};

//#endregion

//#region Helpers

const reApplyAllOffers = (cart) => {
  // use is_applicale flag before place order/ After delete not applicable offers
  let restOffers = clone(store.getState().restaurant.offers);
  let appliedOffers = cart.offers;
  if (appliedOffers?.length === 0) {
    return cart;
  }
  let appIds = appliedOffers.map((o) => o.offer_id);
  let offers = restOffers.filter((o) => appIds.includes(o._id));
  let remIds = offers
    .filter((o) => !isOfferApplicable(o, cart))
    .map((o) => o._id);

  console.log("Reapplying Offers");

  cart.offers = cart.offers.map((o) => {
    o.is_applicable = !remIds.includes(o.offer_id);

    if (o.is_applicable) {
      let offer = restOffers.find((off) => off._id === o.offer_id);
      let discount = processOffer(offer, cart);
      o.discount = discount;
    }

    return o;
  });

  return cart;
};

//#endregion
