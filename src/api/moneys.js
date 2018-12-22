/* 账单增删改查接口 **/
import request from "../utils/request";

export const createMoney = data => 
	request.post("moneys/createMoney", data);

export const getDayMoneys = data => request.get(`moneys/getDayMoneys?year=${data.year}&month=${data.month}&date=${data.date}`);
