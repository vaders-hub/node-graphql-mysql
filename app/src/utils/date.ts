export const tzoffset = new Date().getTimezoneOffset() * 60000;

export const toIsoDate = (date: any): any => {
  return date.toISOString().slice(0, -1).replace(/T/, " ").replace(/\..+/, "");
};
