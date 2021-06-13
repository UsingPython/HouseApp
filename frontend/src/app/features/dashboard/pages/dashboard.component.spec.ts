import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { ChartService } from 'src/app/core/services/chart.service';
import { ChartDataI } from '../models/line-charts';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockChartService: jasmine.SpyObj<ChartService>;
  let mockApiBackendService: jasmine.SpyObj<ApiBackendService>;

  let dummyPowerChartRes: ChartDataI[] = [];
  let dummyOilChartRes: ChartDataI[] = [];
  let dummyWaterChartRes: ChartDataI[] = [];

  beforeEach(async () => {
    mockChartService = jasmine.createSpyObj('ChartService', [
      'getPowerChartData',
      'getOilChartData',
      'getWaterChartData',
    ]);
    mockApiBackendService = jasmine.createSpyObj('ApiBackendService', [
      'requestAll',
    ]);

    await TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        {
          provide: ChartService,
          useValue: mockChartService,
        },
        {
          provide: ApiBackendService,
          useValue: mockApiBackendService,
        },
      ],
      declarations: [DashboardComponent],
    }).compileComponents();

    // init mocks
    mockChartService.getOilChartData.and.returnValue(of(dummyOilChartRes));
    mockChartService.getPowerChartData.and.returnValue(of(dummyPowerChartRes));
    mockChartService.getWaterChartData.and.returnValue(of(dummyWaterChartRes));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should init component and load chart data',
    waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(mockApiBackendService.requestAll).toHaveBeenCalled();
        expect(mockChartService.getOilChartData).toHaveBeenCalled();
        expect(mockChartService.getPowerChartData).toHaveBeenCalled();
        expect(mockChartService.getWaterChartData).toHaveBeenCalled();

        expect(component.allOil).toEqual(dummyOilChartRes);
        expect(component.allPower).toEqual(dummyPowerChartRes);
        expect(component.allWater).toEqual(dummyWaterChartRes);
      });
    })
  );
});
