import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Water, WaterInput } from 'src/app/core/services/classes/api-backend';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-water-form',
  templateUrl: './water-form.component.html',
  styleUrls: ['./water-form.component.css'],
})
export class WaterFormComponent implements OnInit {
  @Input() existingWater?: Water;
  @Output() submitWaterEvent = new EventEmitter<WaterInput>();

  constructor() {}

  ngOnInit(): void {}

  public submitWater(submitValues: IFormResult) {
    this.submitWaterEvent.emit({
      date: submitValues.date,
      cubicmeter: submitValues.value,
    });
  }
}
