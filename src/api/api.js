import request from "../utils/request";

/* 用户信息接口 **/
export const createUser = data => request.post("users/createUser", data);

export const checkUserLogin = data =>
  request.post("users/checkUserLogin", data);

/* 添加账单 */
export const createMoney = data => request.post("moneys/createMoney", data);

/* 查询指定日期账单 */
export const getDayMoneys = data =>
  request.get(
    `moneys/getDayMoneys?year=${data.year}&month=${data.month}&date=${
      data.date
    }`
  );

/* 获得主页数据 */
export const getHomeData = () => request.get('moneys/getHomeData')

/* 获得指定账单信息 */
export const getMoneyDetail = data => request.get('moneys/getMoneyDetail?id='+data.id)
