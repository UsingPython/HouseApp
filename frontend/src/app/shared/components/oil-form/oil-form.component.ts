import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Oil, OilInput } from 'src/app/core/services/classes/api-backend';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-oil-form',
  templateUrl: './oil-form.component.html',
  styleUrls: ['./oil-form.component.css'],
})
export class OilFormComponent implements OnInit {
  @Input() existingOil?: Oil;
  @Output() submitOilEvent = new EventEmitter<OilInput>();

  public placeholder = 'Gebe Ölstand ein';

  constructor() {}

  ngOnInit(): void {}

  public submitOil(submitValues: IFormResult): void {
    this.submitOilEvent.emit({
      filled: submitValues.value,
      date: submitValues.date,
    });
  }
}
