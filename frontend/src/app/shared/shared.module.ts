import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { WaterFormComponent } from './components/water-form/water-form.component';
import { OilFormComponent } from './components/oil-form/oil-form.component';
import { PowerFormComponent } from './components/power-form/power-form.component';

@NgModule({
  declarations: [
    FormComponent,
    WaterFormComponent,
    OilFormComponent,
    PowerFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    CommonModule,
    IconsModule,
    PowerFormComponent,
    WaterFormComponent,
    OilFormComponent,
  ],
})
export class SharedModule {}
