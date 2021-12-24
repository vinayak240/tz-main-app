export const findCartItem = (cart, id) => {
  return cart.items.find((item) => item._id === id);
};

export const decideFoodType = (items) => {
  let flag = false;

  flag = items.some((item) => item.food_type === "non_veg");

  if (flag) return "non_veg";

  flag = items.some((item) => item.food_type === "egg_only");

  if (flag) return "egg_only";

  return "veg";
};

export const getItemsTotalCost = (items) => {
  return items.reduce((total, item) => {
    return item.versions.reduce((itemTotal, ver) => {
      return itemTotal + ver.totalCost * ver.itemCount;
    }, total);
  }, 0);
};

export const decideToShowMenuFAB = (menu) => {
  return menu.every((cat) => cat.type === "category");
};

export const getMenuType = (menu) => {
  if (menu.every((pack) => pack.type === "package")) {
    return "package";
  }
  return "category";
};

export const findOriginalPackage = (menu, packId) => {
  return menu.buffet.find((pack) => pack._id === packId);
};
