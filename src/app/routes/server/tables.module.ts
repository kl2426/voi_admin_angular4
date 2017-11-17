import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared/shared.module';

import { ServerService } from './server.service';
import { ServerComponent } from './server.component';

import { AngularEchartsModule } from 'ngx-echarts';

//   弹窗
import { NzModalInComponent } from './modal-in.component';
import { NzModalOpenDeployComponent } from './modal-open-deploy.component';
import { NzModalCloseDeployComponent } from './modal-close-deploy.component';
import { NzModalIpComponent } from './modal-ip.component';

const routes: Routes = [
    { path: '', component: ServerComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgxChartsModule,
        AngularEchartsModule
    ],
    providers: [ServerService ],
    declarations: [
        ServerComponent,
        NzModalInComponent,
        NzModalOpenDeployComponent,
        NzModalCloseDeployComponent,
        NzModalIpComponent,
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        NzModalInComponent,
        NzModalOpenDeployComponent,
        NzModalCloseDeployComponent,
        NzModalIpComponent,
    ]
})
export class TablesModule { }
