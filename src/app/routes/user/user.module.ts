import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared/shared.module';

import { UserService } from './user.service';

import { ListComponent } from './list/list.component';
import { TypeComponent } from './type/type.component';

import { AngularEchartsModule } from 'ngx-echarts';

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
        TypeComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [

    ]
})
export class UserModule { }
