import request from '../utils/request'

/* 用户信息接口 **/
export const register = data => request.post('users/register', data)

export const login = data => request.post('users/login', data)

/* 添加账单 */
export const addMoney = data => request.post('moneys/addMoney', data)

/* 查询账单 */
export const getDayMoneys = data => request.post(`moneys/searchMoneyList`, data)

/* 获得指定账单信息 */
export const getMoneyDetail = data => request.post('moneys/getMoneyDetail', data)

/* 删除账单 */
export const deleteMoney = data => request.post('moneys/deleteMoney', data)

/* 编辑账单 */
export const updateMoney = data => request.post('moneys/updateMoney', data)

/* 获得分类 */
export const getCategoryMap = data => request.post('moneys/getCategoryMap', data)

/* 获得账户 */
export const getAccountMap = data => request.post('moneys/getAccountMap', data)
