import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared/shared.module';

import { UserService } from './user.service';

import { ListComponent } from './list.component';
import { TypeComponent } from './type/type.component';

import { AngularEchartsModule } from 'ngx-echarts';

import { NzModalCustomizeComponent } from './modal-add.component';

const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'type', component: TypeComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgxChartsModule,
        AngularEchartsModule
    ],
    providers: [UserService ],
    declarations: [
        ListComponent,
        TypeComponent,
        NzModalCustomizeComponent,
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        NzModalCustomizeComponent,
    ]
})
export class UserModule { }
