import { Component, OnInit } from '@angular/core';
import { ServerService } from './server.service';
import { FormBuilder, FormGroup} from '@angular/forms';

import { NzModalService, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
//   系统注册弹窗
import { NzModalInComponent } from './modal-in.component';
//   确定开启部署模式
import { NzModalOpenDeployComponent } from './modal-open-deploy.component';
import { NzModalCloseDeployComponent } from './modal-close-deploy.component';
//   网络配置
import { NzModalIpComponent } from './modal-ip.component';

declare let terminal_device;
@Component({
    selector: 'app-table-full',
    templateUrl: './server.component.html',
    styleUrls: ['server.component.less']
})
export class ServerComponent implements OnInit {

    //
    constructor(
        private _ServerService: ServerService, 
        private message: NzMessageService, 
        private fb: FormBuilder,
        private modalService: NzModalService,
        private _notification: NzNotificationService
    ) {
        (<any>window).angularComponentRef = {
            msg: (value) => this.findFunctionList(value),
            component: this
        };
    }

    validateForm: FormGroup;

    //   圆
    chartOption1 = {
        series: [
            {
                type: 'pie',
                radius: ['80%', '100%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                animation: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 30, itemStyle: { normal: { color: '#feb609' } } },
                    { value: 70, itemStyle: { normal: { color: '#fdf3e5' } } }
                ]
            }
        ]
    };


    chartOption2 = {
        series: [
            {
                type: 'pie',
                radius: ['80%', '100%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                animation: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 30, itemStyle: { normal: { color: '#31CFC2' } } },
                    { value: 70, itemStyle: { normal: { color: '#E6FAF4' } } }
                ]
            }
        ]
    };


    chartOption3 = {
        series: [
            {
                type: 'pie',
                radius: ['80%', '100%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                animation: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 30, itemStyle: { normal: { color: '#FF499A' } } },
                    { value: 70, itemStyle: { normal: { color: '#FBE9F2' } } }
                ]
            }
        ]
    };

    // 列表
    table_data = {
        //   加载中图片
        loading: false,
        //   筛选条件
        'form': {
            'pageIndex': 1,
            'pageSize': 10,
            'key': '',
            'gid': '',
            //   排序
            'sortName': '',
            'sort': ''
        },
        //   返回数据
        'table_res': {
            retCode: 0,
            row: [],
            total: 1
        },
        //   每页显示多少条
        'selectChanged': function () {

        },
        //  checked 选中
        'checkbox': {
            'indeterminate': false,
            'allChecked': false,
            //   全选
            'checkAll': () => {
                this.table_data.table_res.row.forEach(item => item.checked = this.table_data.checkbox.allChecked);
                this.table_data.checkbox.refChecked();
            },
            //
            'refChecked': () => {
                const checkedCount = this.table_data.table_res.row.filter(w => w.checked).length;
                this.table_data.checkbox.allChecked = checkedCount === this.table_data.table_res.row.length;
                this.table_data.checkbox.indeterminate = this.table_data.checkbox.allChecked ? false : checkedCount > 0;
            }
        },
        //   排序
        'sort': (sort?: string, name?: string) => {
            this.table_data.form.sortName = name;
            this.table_data.form.sort = sort;
            this.findFunctionList();
        }
    };
    

    //   查询列表
    findFunctionList(pageIndex?: number) {
        if (typeof pageIndex !== 'undefined') {
            this.table_data.form.pageIndex = pageIndex || 1;
        }
        console.log(this.table_data.form);

        this.table_data.loading = true;
        this.table_data.checkbox.allChecked = false;
        this.table_data.checkbox.indeterminate = false;

        const form_obj = {
            'key': '',
            'page': this.table_data.form.pageIndex
        };

        this._ServerService.getList(form_obj)
            //   处理数据
            .map(data => {
                return data;
            })
            //   完成数据
            .subscribe(data => {
                this.table_data.loading = false;
                this.table_data.table_res.row = data.clients;
                this.table_data.table_res.total = 1;
            });

    }


    //   打开注册弹窗
    showModalIn() {
        setTimeout(() => {
            const subscription = this.modalService.open({
                // title: '对话框标题',
                content: NzModalInComponent,
                onOk() { },
                onCancel() { },
                footer: false,
                componentParams: {
                    name: '参数'
                }
            });
            subscription.subscribe(result => {
                if (result !== 'onShown' && result !== 'onHide' && result !== 'onCancel' 
                && result !== 'onHidden' && result !== 'onDestroy') {
                    console.log(result);
                    setTimeout(() => {
                        this._notification.create('success', '成功', '系统注册成功');
                    }, 1000);
                }
            });
        }, 400);
        
    }

    //   弹窗开启系统
    showModalOnServer() {
        setTimeout(() => {
            const subscription = this.modalService.confirm({
                title: '确定开启系统？',
                onOk: () => {
                    setTimeout(() => {
                        this._notification.create('success', '成功', '系统开启成功');
                    }, 1000);
                }
            });
        }, 400);
        
    }

    //   弹窗关闭系统
    showModalOffServer() {
        setTimeout(() => {
            const subscription = this.modalService.confirm({
                title: '确定关闭系统？',
                onOk: () => {
                    setTimeout(() => {
                        this._notification.create('success', '成功', '系统关闭成功');
                    }, 1000);
                }
            });
        }, 400);
        
    }

    //   打开部署模式
    showModalOpenDeploy() {
        setTimeout(() => {
            const subscription = this.modalService.open({
                // title: '对话框标题',
                content: NzModalOpenDeployComponent,
                onOk() { },
                onCancel() { },
                footer: false,
                componentParams: {
                    name: '参数'
                }
            });
            subscription.subscribe(result => {
                if (result !== 'onShown' && result !== 'onHide' && result !== 'onCancel' 
                && result !== 'onHidden' && result !== 'onDestroy') {
                    console.log(result);
                    setTimeout(() => {
                        this._notification.create('success', '成功', '已开启部署模式');
                    }, 1000);
                }
            });
        }, 400);
    }


    //   关闭部署模式
    showModalCloseDeploy() {
        setTimeout(() => {
            const subscription = this.modalService.open({
                // title: '对话框标题',
                content: NzModalCloseDeployComponent,
                onOk() { },
                onCancel() { },
                footer: false,
                componentParams: {
                    name: '参数'
                }
            });
            subscription.subscribe(result => {
                if (result !== 'onShown' && result !== 'onHide' && result !== 'onCancel' 
                && result !== 'onHidden' && result !== 'onDestroy') {
                    console.log(result);
                    setTimeout(() => {
                        this._notification.create('success', '成功', '已关闭部署模式');
                    }, 1000);
                }
            });
        }, 400);
        
    }


    //   打开网络配置弹窗
    showModalIp() {
        setTimeout(() => {
            const subscription = this.modalService.open({
                // title: '对话框标题',
                content: NzModalIpComponent,
                onOk() { },
                onCancel() { },
                footer: false,
                componentParams: {
                    name: '参数'
                }
            });
            subscription.subscribe(result => {
                if (result !== 'onShown' && result !== 'onHide' && result !== 'onCancel' 
                && result !== 'onHidden' && result !== 'onDestroy') {
                    console.log(result);
                    setTimeout(() => {
                        this._notification.create('success', '成功', '配置成功');
                    }, 1000);
                }
            });
        }, 400);
        
    }





    

    
    //   
    ngOnInit() {
        this.findFunctionList();
        //  this.load();
        //  const that = this;
        // terminal_device.build_card.cb_id = function () {
        //     that.showMsg('1234');
        //     console.log(123);
        // };
        // console.log(terminal_device);
        // this.showMsg('123');


        // this.validateForm = this.fb.group({
        //     select: ['China'],
        //     select_multiple: [['Red']],
        //     datepicker: [new Date()],
        //     timepicker: [new Date()],
        //     input_number: [4],
        //     switch: [false],
        //     slider: [0],
        //     radio_group: [1],
        //     radio_button: [1]
        // });
    }

    showMsg(msg: string) {
        console.log(msg);
        this.message.info(msg);
    }



    
    

}
