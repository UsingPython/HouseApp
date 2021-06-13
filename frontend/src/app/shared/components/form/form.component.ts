import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { defineLocale, deLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IFormResult } from '../../models/form-result';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/de';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() header: string = '';
  @Input() valueLabel: string = '';
  @Input() valuePlaceholder: string = '';
  @Input() valueInput?: number;
  @Input() dateLabel: string = 'Datum';
  @Input() dateInput?: string;

  @Output() submitFormEvent = new EventEmitter<IFormResult>();

  form = this.fb.group({
    value: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly bsLocalService: BsLocaleService
  ) {
    defineLocale('de', deLocale);
    this.bsLocalService.use('de');
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['valueInput'] != null &&
      changes['valueInput'].currentValue != null
    ) {
      this.form.patchValue({ value: changes['valueInput'].currentValue });
    }
    if (
      changes['dateInput'] != null &&
      changes['dateInput'].currentValue != null
    ) {
      this.form.patchValue({
        date: this.parseDateString(changes['dateInput'].currentValue),
      });
    }
  }

  submitForm(): void {
    this.submitFormEvent.emit({
      date: this.form.value['date'],
      value: this.form.value['value'],
    });
    this.form.reset();
  }

  private parseDateString(dateString: string): string {
    dayjs.extend(customParseFormat);
    dayjs.locale('de');
    return dayjs(dateString.split('T')[0], 'YYYY-MM-DD', true).format(
      'DD.MM.YYYY'
    );
  }
}
