import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from 'src/app/core/services/classes/api-backend';
import { EditWindowType, IEditWindowUpdate } from '../../models/edit-window';

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css'],
})
export class EditWindowComponent implements OnInit, OnDestroy {
  @Input() type?: EditWindowType;
  @Input() entryId?: number;
  public update$ = new Subject<IEditWindowUpdate>();
  public oilEntry?: Oil;
  public waterEntry?: Water;
  public powerEntry?: Power;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly bsModalRef: BsModalRef,
    private readonly backendService: ApiBackendService
  ) {}

  ngOnInit(): void {
    if (this.type === 'OIL' && this.entryId != null) {
      this.backendService
        .getOilById(this.entryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((oil) => (this.oilEntry = oil));
    } else if (this.type === 'POWER' && this.entryId != null) {
      this.backendService
        .getPowerById(this.entryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((power) => (this.powerEntry = power));
    } else if (this.type === 'WATER' && this.entryId != null) {
      this.backendService
        .getWaterById(this.entryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((water) => (this.waterEntry = water));
    } else {
      throw new Error('No type or entryId defined');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public close(): void {
    this.bsModalRef.hide();
  }

  public updateEntry(formInput: PowerInput | OilInput | WaterInput): void {
    if (this.type == null || this.entryId == null) {
      throw new Error('Type or id is not defined');
    }
    this.update$.next({ ...formInput, type: this.type, id: this.entryId });
    this.bsModalRef.hide();
  }
}
