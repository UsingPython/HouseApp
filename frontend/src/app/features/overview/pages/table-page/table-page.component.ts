import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { Oil, Power, Water } from 'src/app/core/services/classes/api-backend';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { IEditWindowUpdate } from '../../models/edit-window';

registerLocaleData(localeDe, localeDeExtra);

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css'],
})
export class TablePageComponent implements OnInit, OnDestroy {
  public oilRow: Oil[] = [];
  public powerRow: Power[] = [];
  public waterRow: Water[] = [];
  private ngUnsubscribe = new Subject();
  private deleteSuccessMsg = 'Eintrag <strong>erfolgreich</strong> gelöscht!';

  constructor(
    private readonly apiService: ApiBackendService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.apiService.requestAll();
    this.apiService
      .getPower()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((power) => (this.powerRow = power));
    this.apiService
      .getOil()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((oil) => (this.oilRow = oil));
    this.apiService
      .getWater()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((water) => (this.waterRow = water));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public deleteOil(deleteId: number): void {
    this.apiService
      .dropOilById(deleteId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((status) => {
        this.createResponseAlertBasedOnStatus(status);
      });
  }

  public deleteWater(deleteId: number): void {
    this.apiService
      .dropWaterById(deleteId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((status) => {
        this.createResponseAlertBasedOnStatus(status);
      });
  }

  public deletePower(deleteId: number): void {
    this.apiService
      .dropPowerById(deleteId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((status) => {
        this.createResponseAlertBasedOnStatus(status);
      });
  }

  public updateEntry(updateEvent: IEditWindowUpdate): void {
    if (updateEvent.type === 'OIL' && updateEvent.filled != null) {
      this.apiService
        .updateOilById(updateEvent.id, {
          date: updateEvent.date,
          filled: updateEvent.filled,
        })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((_updatedOil) => {
          this.alertService.addAlert(
            this.constructSuccessUpdateMsg('Öl'),
            'success'
          );
          this.apiService.requestOil();
        });
    } else if (updateEvent.type === 'WATER' && updateEvent.cubicmeter != null) {
      this.apiService
        .updateWaterById(updateEvent.id, {
          date: updateEvent.date,
          cubicmeter: updateEvent.cubicmeter,
        })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((_updateWater) => {
          this.alertService.addAlert(
            this.constructSuccessUpdateMsg('Wasser'),
            'success'
          );
          this.apiService.requestWater();
        });
    } else if (updateEvent.type === 'POWER' && updateEvent.kwh != null) {
      this.apiService
        .updatePowerById(updateEvent.id, {
          date: updateEvent.date,
          kwh: updateEvent.kwh,
        })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((_updatePower) => {
          this.alertService.addAlert(
            this.constructSuccessUpdateMsg('Strom'),
            'success'
          );
          this.apiService.requestPower();
        });
    } else {
      throw new Error('Update event type unknown');
    }
  }

  private constructDeleteFailMsg(statusCode: number): string {
    return `<strong>Fehler!</strong> Eintrag konnte <strong>nicht gelöscht</strong> werden... (Fehlercode: ${statusCode})`;
  }

  private constructSuccessUpdateMsg(name: string): string {
    return `${name}-Eintrag <strong>erfolgreich aktualisiert</strong>.`;
  }

  private createResponseAlertBasedOnStatus(statusCode: number) {
    if (statusCode === 200) {
      this.alertService.addAlert(this.deleteSuccessMsg, 'success');
    } else {
      this.alertService.addAlert(
        this.constructDeleteFailMsg(statusCode),
        'danger'
      );
    }
  }
}
