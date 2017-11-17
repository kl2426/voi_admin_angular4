import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
    selector: 'app-modal-in-component',
    template: `
    <div class="m-modal-in">
        <div class="customize-body">
            <h3>确定开启部署模式？</h3>
            <p>请输入管理员确认密码</p>
            <nz-input [(ngModel)]="code" [nzSize]="'large'" [nzPlaceHolder]="'输入密码'"></nz-input>
        </div>
        <div class="customize-footer">
            <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">取消</button>
        	<button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">确定</button>
        </div>
    </div>
    `
})
export class NzModalOpenDeployComponent implements OnInit {
    _name: string;

    //   code
    code: string;

    @Input()
    set name(value: string) {
        this._name = value;
    }

    emitDataOutside() {
        
        this.subject.next(this.code);
        this.subject.destroy('onCancel');
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    constructor(private subject: NzModalSubject) {
        this.subject.on('onDestory', () => {
            // console.log('destroy');
        });
    }

    ngOnInit() {
    }
}


