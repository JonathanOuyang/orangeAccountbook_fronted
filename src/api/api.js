import request from '../utils/request'

/* 用户信息接口 **/
export const register = data => request.post('users/register', data)

export const login = data => request.post('users/login', data)

/* 添加账单 */
export const addMoney = data => request.post('moneys/addMoney', data)

/* 查询账单 */
export const searchMoneyList = data => request.post(`moneys/searchMoneyList`, data)

/* 查询账单总额 */
export const getMoneySum = data => request.post(`moneys/getMoneySum`, data)

/* 获取指定账单信息 */
export const getMoneyDetail = data =>
  request.post('moneys/getMoneyDetail', data)

/* 删除账单 */
export const deleteMoney = data => request.post('moneys/deleteMoney', data)

/* 编辑账单 */
export const updateMoney = data => request.post('moneys/updateMoney', data)

/* 获取分类 */
export const getCategoryList = data =>
  request.post('users/getCategoryList', data)

/* 获取账户 */
export const getAccountList = data => request.post('users/getAccountList', data)
