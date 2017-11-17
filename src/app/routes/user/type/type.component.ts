import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-table-full',
    templateUrl: 'type.component.html',
    styleUrls: ['type.component.less']
})
export class TypeComponent implements OnInit {

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





    pi = 1;
    ps = 10;
    total = 200; // mock total
    list = [];
    loading = false;
    args = {};
    _indeterminate = false;
    _allChecked = false;

    load(pi?: number) {
        if (typeof pi !== 'undefined') {
            this.pi = pi || 1;
        }

        this.loading = true;
        this._allChecked = false;
        this._indeterminate = false;


        const form_obj = {
            'key': '',
            'page': this.pi,
            'pageSize': this.ps
        };
        
        this._UserService.getList(form_obj)
            .map(data => {
                // data.results.forEach(item => {
                //     item.checked = false;
                //     item.price = +((Math.random() * (10000000 - 100)) + 100).toFixed(2);
                // });
                return data;
            })
            .subscribe(data => {
                this.loading = false;
                this.list = data.cliGroups;
            });
    }

    clear() {
        this.args = {};
        this.load(1);
    }

    _checkAll() {
        this.list.forEach(item => item.checked = this._allChecked);
        this.refChecked();
    }
    refChecked() {
        const checkedCount = this.list.filter(w => w.checked).length;
        this._allChecked = checkedCount === this.list.length;
        this._indeterminate = this._allChecked ? false : checkedCount > 0;
    }

    constructor(private _UserService: UserService, private message: NzMessageService) {
    }

    ngOnInit() {
        this.load();
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
