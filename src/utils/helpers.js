export const isObjEmpty = (obj) => {
  if (!Boolean(obj)) {
    return true;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const delay = async (secs) => {
  return new Promise((res, rej) => {
    try {
      setTimeout(res, secs);
    } catch (err) {
      rej();
    }
  });
};

export const canRequestJoin = (joinReq) => {
  if (!Boolean(joinReq)) {
    return true;
  }
  return (
    Boolean(joinReq?.table_id) &&
    Boolean(joinReq?.rest_id) &&
    Boolean(joinReq?.user_id) &&
    !Boolean(joinReq?.flag)
  );
};

export const diff_minutes = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};
