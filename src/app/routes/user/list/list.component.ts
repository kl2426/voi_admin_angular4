import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-table-full',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.less']
})
export class ListComponent implements OnInit {

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

        this._UserService.getList(form_obj)
            //   处理数据
            .map(data => {
                return data;
            })
            //   完成数据
            .subscribe(data => {
                this.table_data.loading = false;
                this.table_data.table_res.row = data.users;
                this.table_data.table_res.total = 1;
            });

    }
    //    定义引用
    constructor(private _UserService: UserService, private message: NzMessageService) {
    }
    //    init
    ngOnInit() {
        this.findFunctionList();
    }
    //    show
    showMsg(msg: string) {
        this.message.info(msg);
    }
}
