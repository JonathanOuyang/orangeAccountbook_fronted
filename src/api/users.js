/* 用户信息接口 **/
import request from "../utils/request";

export const createUser = data => 
	request.post("users/createUser", data);

export const checkUserLogin = data =>
  request.post("users/checkUserLogin", data);

