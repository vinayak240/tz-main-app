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
