import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PowerInput } from 'src/app/core/services/classes/api-backend';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-power-form',
  templateUrl: './power-form.component.html',
  styleUrls: ['./power-form.component.css'],
})
export class PowerFormComponent implements OnInit {
  @Output() submitPowerEvent = new EventEmitter<PowerInput>();

  constructor() {}

  ngOnInit(): void {}

  public submitPower(submitValues: IFormResult) {
    this.submitPowerEvent.emit({
      kwh: submitValues.value,
      date: submitValues.date,
    });
  }
}
