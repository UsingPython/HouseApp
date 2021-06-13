import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { ChartService } from 'src/app/core/services/chart.service';
import { ChartDataI } from '../models/line-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject();
  public allOil: ChartDataI[] = [];
  public allPower: ChartDataI[] = [];
  public allWater: ChartDataI[] = [];

  constructor(
    private readonly chartService: ChartService,
    private readonly apiService: ApiBackendService
  ) {}

  ngOnInit(): void {
    this.apiService.requestAll();
    combineLatest([
      this.chartService.getPowerChartData(),
      this.chartService.getOilChartData(),
      this.chartService.getWaterChartData(),
    ])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([powerChart, oilChart, waterChart]) => {
        this.allPower = powerChart;
        this.allOil = oilChart;
        this.allWater = waterChart;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
