import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared/shared.module';

import { TerminalService } from './terminal.service';
import { TerminalComponent } from './terminal.component';
import { ListComponent } from './list/list.component';

import { AngularEchartsModule } from 'ngx-echarts';

const routes: Routes = [
    { path: '', component: TerminalComponent },
    { path: 'list', component: ListComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgxChartsModule,
        AngularEchartsModule
    ],
    providers: [TerminalService ],
    declarations: [
        TerminalComponent,
        ListComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [

    ]
})
export class TerminalModule { }
