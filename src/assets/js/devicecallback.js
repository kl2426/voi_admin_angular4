'use strict';


//     .net 回调函数
var terminal_device = {
    //   进退卡
    in_out_card: {
        //  插入卡回调   string: loadding
        cb_in_card: null,
        //  插入卡完成回调  json string: str
        cb_in_ok_card: null,
        //  退卡完成加调  string: 状态码
        cb_out_ok_card: null
    },

    //   build_card  建卡挂号
    build_card: {
        //  身份证回调  
        cb_id: null,
        //  充值现金回调 
        cb_money: null,
        //  关闭充值现金回调 
        cb_money_close: null,
        //  建卡成功回调  null
        cb_card: null
    }
}
