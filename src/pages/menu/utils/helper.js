import { v4 } from "uuid";
import { isObjEmpty } from "../../../utils/helpers";

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
  for (const mt of menu) {
    if (mt.menu_type === "buffet") {
      let pack = mt.categories.find((pack) => pack._id === packId);
      if (!isObjEmpty(pack)) {
        return pack;
      }
    }
  }

  return menu.buffet.find((pack) => pack._id === packId);
};

export const createMenuMap = (menu) => {
  let menuMap = {};

  if (isObjEmpty(menu)) {
    return menuMap;
  }

  for (const mt of menu) {
    menuMap[mt._id || mt.name] = mt.categories;
  }

  return menuMap;
};

export const isBuffetType = (id, menu) => {
  let mt = menu.find((m) => m._id === id || m.name === id);

  return Boolean(mt?.menu_type === "buffet");
};

export const getMenuName = (id, menu) => {
  let mt = menu.find((m) => m._id === id || m.name === id);

  return mt?.name;
};

export const makeCustUnique = (arr = []) => {
  return arr.map((c, cidx) => {
    if (!Boolean(c._id)) {
      c._id = v4()
        .split("")
        .filter((s) => s !== "-")
        .join("");
    }

    c.options = c.options.map((o, oidx) => {
      if (!Boolean(o._id)) {
        o._id = v4()
          .split("")
          .filter((s) => s !== "-")
          .join("");
      }

      return o;
    });

    return c;
  });
};
