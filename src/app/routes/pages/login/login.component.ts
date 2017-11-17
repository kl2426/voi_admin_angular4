import { Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagesPageService } from '../pagesPage.service';
import { SettingsService } from '@core/services/settings.service';
import { TokenService } from '../../../core/net/token/token.service';

declare let terminal_device;

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  valForm: FormGroup;

  constructor(
    public settings: SettingsService, 
    private _pagesPage: PagesPageService, 
    private TokenService: TokenService, 
    private injector: Injector,
    fb: FormBuilder, 
    private router: Router) {
      this.valForm = fb.group({
        user: [null, Validators.compose([Validators.required])],
        pwd: [null, Validators.required],
        remember_me: [null]
      });
  }


  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    terminal_device.build_card.cb_card = function () {
      console.log(123);
    };
    console.log(terminal_device);
    

    if (this.valForm.valid) {
      console.log('Valid!');
      console.log(this.valForm.value);
      //  this.valForm.value.remember_me = undefined;
      this._pagesPage.pageLogin(this.valForm.value).subscribe((res: any) => {
        if (res.retCode === 0) {
          this.injector.get(TokenService).data = res;
          this.injector.get(TokenService).user = this.valForm.value;
          //  this.TokenService = res;
          this.router.navigate(['server']);
        }
        
      });
    }
  }

  ngOnInit() {
    //   登录页清空登录数据
    this.TokenService.logout();
  }


}
