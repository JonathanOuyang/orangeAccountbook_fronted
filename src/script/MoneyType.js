function MoneyType(name, icon, color) {
    this.name = name;
    this.icon = icon;
    // this.color = color;
}

let typeList = [
    new MoneyType('餐饮', 'canyin'),
    new MoneyType('交通', 'jiaotong'),
    new MoneyType('购物', 'gouwu')
];

export default typeList;