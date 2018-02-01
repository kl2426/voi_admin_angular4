import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import * as $ from 'jquery';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-modal-in-component',
    templateUrl: './modal-ip.component.html'
})
export class NzModalIpComponent implements OnInit {

    constructor(private fb: FormBuilder, private subject: NzModalSubject) {
        // this.validateForm = this.fb.group({
        //     ip[0]: [''],
        //     net: [[]]
        //     // userName: ['', [Validators.required], [this.userNameAsyncValidator]],
        //     // email: ['', [this.emailValidator]],
        //     // birthDay: ['', [this.birthDayValidator]],
        //     // password: ['', [Validators.required]],
        //     // passwordConfirmation: ['', [this.passwordConfirmationValidator]],
        //     // comment: ['', [Validators.required]]
        // });

        // this.subject.on('onDestory', () => {
        //     // console.log('destroy');
        // });
    }

    data_form = {
        ip: [null, null, null, null],
        net: [null, null, null, null],
    };
    
    //   输入IP地址栏
    ipChange(e) {
        const temp_val = this.data_form.ip[e.target.name] || '';
        if (e.key === '.') {
            this.data_form.ip[e.target.name] = temp_val.substr(0, temp_val.length - 1);
            $(e.target).parent().next().find('input').focus();
        } else if (e.key === 'Backspace' && (temp_val === null || temp_val === '') ) {
            $(e.target).parent().prev().find('input').focus();
        } else if (isNaN(e.key) && e.key !== 'Backspace') {
            this.data_form.ip[e.target.name] = temp_val.substr(0, temp_val.length - 1);
        } else if (e.key === 'Tab') {
            $(e.target).parent().next().find('input').focus();
        } else if (temp_val.length > 3) {
            this.data_form.ip[e.target.name] = temp_val.substr(0, temp_val.length - 1);
        }
    }


    _name: string;

    //   code
    code: string;

    @Input()
    set name(value: string) {
        this._name = value;
    }



    validateForm: FormGroup;
    submitForm = ($event, value) => {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        console.log(value);
    };

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }

    validateConfirmPassword() {
        setTimeout(_ => {
            this.validateForm.controls['passwordConfirmation'].updateValueAndValidity();
        })
    }

    userNameAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            setTimeout(() => {
                if (control.value === 'JasonWood') {
                    observer.next({ error: true, duplicated: true });
                } else {
                    observer.next(null);
                }
                observer.complete();
            }, 1000);
        });
    };

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    emailValidator = (control: FormControl): { [s: string]: boolean } => {
        const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!control.value) {
            return { required: true }
        } else if (!EMAIL_REGEXP.test(control.value)) {
            return { error: true, email: true };
        }
    };
    passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls['password'].value) {
            return { confirm: true, error: true };
        }
    };
    birthDayValidator = (control: FormControl): any => {
        if (new Date(control.value) > new Date()) {
            return { expired: true, error: true }
        }
    };

    


    


    emitDataOutside(e) {
        
        this.subject.next(this.code);
        this.subject.destroy('onCancel');
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

   
    ngOnInit() {
    }
}


