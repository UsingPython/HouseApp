import { NgModule } from '@angular/core';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ActionComponent } from './components/action/action.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { EditWindowComponent } from './components/edit-window/edit-window.component';

@NgModule({
  declarations: [
    TablePageComponent,
    ActionComponent,
    ConfirmDeleteComponent,
    EditWindowComponent,
  ],
  imports: [
    SharedModule,
    OverviewRoutingModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxDatatableModule,
  ],
})
export class OverviewModule {}
