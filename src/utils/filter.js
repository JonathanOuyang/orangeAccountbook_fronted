
export const filterDate = date => {
  const DATE = new Date(date);
  return `${DATE.getMonth() + 1}月${DATE.getDate()}日`;
};

export const filterDatetime = date => {
  const DATE = new Date(date);
  return `${DATE.getFullYear()}.${DATE.getMonth() + 1}.${DATE.getDate()} ${DATE.getHours()}:${DATE.getDate()}`;
};

export const filterCurrency = val => {
  return '¥ '+parseFloat(Number(val).toFixed(2)).toLocaleString();
};
