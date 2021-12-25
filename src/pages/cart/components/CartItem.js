import React from "react";
import Item from "./Item";
import { addItem as addItemToCart } from "../../../redux/actions/cart";
import { clone } from "ramda";
import { decideFoodType } from "../../menu/utils/helper";
import { checkIfCustumizationSame } from "../utils/helpers";
import { useDispatch } from "react-redux";

function CartItem(props) {
  const { cart_item } = props;
  const dispatch = useDispatch();

  async function addItem(
    isRepeatLast = false,
    itemCustomizations = [],
    totalItemCost = 0,
    repeatCount = 1,
    versionIdx
  ) {
    let versions = clone(props.cart_item.versions);
    let nameField =
      props.cart_item.type === "package" ? "package_name" : "item_name";
    let priceField =
      props.cart_item.type === "package" ? "package_price" : "item_price";
    if (isRepeatLast && versions.length > 0 && versionIdx !== -1) {
      versions[versionIdx].itemCount += 1;
    } else {
      let item = {
        itemCount: repeatCount,
        totalCost:
          totalItemCost ||
          Number(
            props.cart_item[
              props.cart_item.type === "package"
                ? "package_price"
                : "item_price"
            ]
          ),
        custumization_arr: [...itemCustomizations],
      };

      versions = [...versions, item];
    }

    const count = versions.reduce((total, item) => total + item.itemCount, 0);

    let payload = {
      itemCount: count,
      versions,
      type: props.cart_item.type,
      [nameField]: props.cart_item[nameField],
      [priceField]: props.cart_item[priceField],
      custumization_arr: props.cart_item.custumization_arr,
      food_type:
        props.cart_item.type === "package"
          ? decideFoodType(props.cart_item.items)
          : props.cart_item.food_type,
    };

    if (props.cart_item.type === "package")
      payload.items = props.cart_item.items;

    dispatch(
      addItemToCart(
        payload,
        props.cart_item._id,
        !isRepeatLast &&
          props.cart_item.versions.some((ver) =>
            checkIfCustumizationSame(
              ver.custumization_arr,
              versions[versions.length - 1].custumization_arr
            )
          )
          ? versionIdx
          : -1
      )
    );
  }

  return (
    <div>
      {cart_item.versions.map((ver, idx) => (
        <Item
          key={String(cart_item._id + idx)}
          cart_item={{
            ...cart_item,
            versions: [ver],
            itemCount: ver.itemCount,
          }}
          addItem={addItem}
          version_idx={idx}
        />
      ))}
    </div>
  );
}

export default CartItem;
