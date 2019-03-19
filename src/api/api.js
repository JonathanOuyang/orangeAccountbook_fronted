import request from "../utils/request";

/* 用户信息接口 **/
export const register = (data, options) =>
  request.post("users/register", data, options);

export const login = (data, options) =>
  request.post("users/login", data, options);

export const getUserInfo = (data, options) =>
  request.post("users/getUserInfo", data, options);

export const updateBudget = (data, options) =>
  request.post("users/updateBudget", data, options);

export const getBudget = (data, options) =>
  request.post("users/getBudget", data, options);

/* 添加账单 */
export const addMoney = (data, options) =>
  request.post("moneys/addMoney", data, options);

/* 查询账单 */
export const searchMoneyList = (data, options) =>
  request.post(`moneys/searchMoneyList`, data, options);

/* 获取指定账单信息 */
export const getMoneyDetail = (data, options) =>
  request.post("moneys/getMoneyDetail", data, options);

/* 删除账单 */
export const deleteMoney = (data, options) =>
  request.post("moneys/deleteMoney", data, options);

/* 编辑账单 */
export const updateMoney = (data, options) =>
  request.post("moneys/updateMoney", data, options);

export const getCalendarInfo = (data, options) =>
  request.post("moneys/getCalendarInfo", data, options);

/* 获取分类 */
export const getCategoryList = (data, options) =>
  request.post("categorys/getCategoryList", data, options);

/* 获取账户 */
export const getAccountList = (data, options) =>
  request.post("accounts/getAccountList", data, options);

/* 添加账户 */
export const addAccount = (data, options) =>
  request.post("accounts/addAccount", data, options);

/* 编辑账户 */
export const updateAccount = (data, options) =>
  request.post("accounts/updateAccount", data, options);

/* 删除账户 */
export const deleteAccount = (data, options) =>
  request.post("accounts/deleteAccount", data, options);

/* 获得账单收入和支出总额 */
export const getMoneySum = (data, options) =>
  request.post("statistics/getMoneySum", data, options);
