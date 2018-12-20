/* 账单增删改查接口 **/
import request from "../utils/request";

export const createMoney = data => 
	request.post("moneys/createMoney", data);

export const getDayMoneys = data =>
  request.post("moneys/getDayMoneys", data);
