export default {
    data() {
        return {
            //商户 类别
            categoryList: [{
                label: '档口',
                value: 1
            },
            {
                label: '外卖',
                value: 2
            },
            {
                label: '超市便利',
                value: 3
            },
            {
                label: '生鲜水果',
                value: 4
            },
            {
                label: '生活服务',
                value: 5
            },
            {
                label: '团购',
                value: 6
            }
            ],
            //订单类别 1,普通商品订单，2团购订单 3积分商品
            orderTypes: [{
                label: '普通商品订单',
                value: 1
            },
            {
                label: '团购订单',
                value: 2
            },
            {
                label: '积分商品',
                value: 3
            },
            ],
            //订单状态表
            orderStatus: [{
                label: '已付款',
                value: 2345
            },
            {
                label: '待付款',
                value: 1
            },
            {
                label: '待发货',
                value: 2
            },
            {
                label: '配送中/待自提',
                value: 3
            },
            {
                label: '已收货',
                value: 4
            },
            {
                label: '已评价',
                value: 5
            },
            {
                label: '退款中',
                value: 6
            },
            {
                label: '已退款',
                value: 7
            },
            {
                label: '拒绝退款',
                value: 2636
            },
            {
                label: '已取消',
                value: 99
            }
            ],
            //订单状态表
            tradeStatus: [{
                label: '待支付',
                value: 1
            },
            {
                label: '支付成功',
                value: 2
            },
            {
                label: '已退款',
                value: 7
            },
            {
                label: '交易关闭',
                value: 99
            }
            ],
            //采购订单状态
            purchaseOrderStatus: [
                {
                    label: '待审核（食堂经理）',
                    value: 2
                },
                {
                    label: '待审核（报单员）',
                    value: 3
                },
                {
                    label: '已完成',
                    value: 5
                },
                {
                    label: '已取消',
                    value: 99
                }
            ],
            //审批开卡类型
            cardTypes: [{
                label: '编内卡',
                value: 1
            },
            {
                label: '编外卡',
                value: 2
            },
            {
                label: '编外卡30',
                value: 3
            },
            {
                label: '编外卡50',
                value: 4
            },
            {
                label: '编外卡（院外）',
                value: 5
            },
            {
                label: '编外卡30（院外）',
                value: 6
            },
            {
                label: '编外卡50（院外）',
                value: 7
            },

            {
                label: '编外卡30免',
                value: 9
            },
            {
                label: '编外卡50免',
                value: 10
            },
            {
                label: '编外卡30（院外）免',
                value: 11
            },
            {
                label: '编外卡50（院外）免',
                value: 12
            },
            {
                label: '市机关食堂社会卡',
                value: 13
            },

            ],
            //审批出入证类型
            peopleTypes: [{
                label: '临时出入证',
                value: 1
            },
            {
                label: '长期出入证',
                value: 2
            },


            ],
            // 车辆出入证
            carTypes: [{
                label: 'A',
                value: 1
            },
            {
                label: 'B1',
                value: 2
            },
            {
                label: 'B2',
                value: 3
            },
            {
                label: 'C',
                value: 4
            },
            {
                label: '临时停车证',
                value: 5
            },


            ],
        }
    },
    created() { },
    methods: {
        // 获取商家分类

        //获取商户类别中文
        //获取商户类别中文
        merchantTypesFormat(value) {
            for (let item of this.categoryList) {
                if (item.value == value) {
                    return item.label
                }
            }
        },


        //获取订单类型中文
        orderTypesFormat(value) {
            for (let item of this.orderTypes) {
                if (item.value == value) {
                    return item.label
                }
            }
        },
        //获取订单状态中文
        orderStatusFormat(value) {
            for (let item of this.orderStatus) {
                if (item.value == value) {
                    return item.label
                }
            }
        },
        //获取采购订单状态中文
        purchaseOrderStatusFormat(value) {
            for (let item of this.purchaseOrderStatus) {
                if (item.value == value) {
                    return item.label
                }
            }
        },
        //获取开卡类型中文
        cardTypesFormat(value) {
            for (let item of this.cardTypes) {
                if (item.value == value) {
                    return item.label
                }
            }
        }
    }
}