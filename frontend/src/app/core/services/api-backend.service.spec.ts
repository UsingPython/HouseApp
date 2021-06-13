import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiBackendService } from './api-backend.service';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from './classes/api-backend';

describe('ApiBackendService', () => {
  let service: ApiBackendService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiBackendService,
        {
          provide: HttpClient,
          useValue: mockHttpClient,
        },
      ],
    });

    service = TestBed.inject(ApiBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create httpClient', () => {
    expect(mockHttpClient).toBeTruthy();
  });

  it('should request and get Oil-Array', fakeAsync(() => {
    const requested: Oil[] = [
      {
        id: 1,
        filled: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValue(of(requested));
    service.requestOil();
    let receivedOil: Oil[] = [];
    service.getOil().subscribe((oil) => {
      receivedOil = oil;
    });

    flush();

    expect(receivedOil).toBe(requested);
  }));

  it('should request and get Power-Array', fakeAsync(() => {
    const requested: Power[] = [
      {
        id: 1,
        kwh: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValue(of(requested));

    service.requestPower();
    let receivedPower: Power[] = [];
    service.getPower().subscribe((power) => {
      receivedPower = power;
    });

    flush();

    expect(receivedPower).toBe(requested);
  }));

  it('should request and get Water-Array', fakeAsync(() => {
    const requested: Water[] = [
      {
        id: 1,
        cubicmeter: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValue(of(requested));
    service.requestWater();

    let receivedWater: Water[] = [];
    service.getWater().subscribe((water) => {
      receivedWater = water;
    });

    flush();

    expect(receivedWater).toBe(requested);
  }));

  it('should request all and get all', fakeAsync(() => {
    const requestedOil: Oil[] = [
      {
        id: 1,
        filled: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const requestedPower: Power[] = [
      {
        id: 1,
        kwh: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const requestedWater: Water[] = [
      {
        id: 1,
        cubicmeter: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValues(
      of(requestedOil),
      of(requestedPower),
      of(requestedWater)
    );
    service.requestAll();

    let receivedOil: Oil[] = [];
    service.getOil().subscribe((oil) => {
      receivedOil = oil;
    });

    let receivedWater: Water[] = [];
    service.getWater().subscribe((water) => {
      receivedWater = water;
    });

    let receivedPower: Power[] = [];
    service.getPower().subscribe((power) => {
      receivedPower = power;
    });

    flush(3);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(3);
    expect(receivedOil).toBe(requestedOil);
    expect(receivedWater).toBe(requestedWater);
    expect(receivedPower).toBe(requestedPower);
  }));

  it('should submit Oil', fakeAsync(() => {
    const submittedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.post.and.returnValue(of(submittedOil));

    let receivedOil!: Oil;
    service.postOil(submittedOil).subscribe((oil) => {
      receivedOil = oil;
    });

    flush();

    expect(receivedOil).toBe(submittedOil);
    expect(mockHttpClient.post).toHaveBeenCalled();
  }));

  it('should submit Power', fakeAsync(() => {
    const submittedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.post.and.returnValue(of(submittedPower));

    let receivedPower!: Power;
    service.postPower(submittedPower).subscribe((power) => {
      receivedPower = power;
    });

    flush();

    expect(receivedPower).toBe(submittedPower);
    expect(mockHttpClient.post).toHaveBeenCalled();
  }));

  it('should submit Water', fakeAsync(() => {
    const submittedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockHttpClient.post.and.returnValue(of(submittedWater));

    let receivedWater!: Water;
    service.postWater(submittedWater).subscribe((water) => {
      receivedWater = water;
    });

    flush();

    expect(receivedWater).toBe(submittedWater);
    expect(mockHttpClient.post).toHaveBeenCalled();
  }));

  it('should delete oil by id', fakeAsync(() => {
    mockHttpClient.delete.and.returnValue(of({ status: 200 }));

    let status = 0;
    service.dropOilById(1).subscribe((statusCode) => {
      status = statusCode;
    });
    flush();
    expect(status).toBe(200);
  }));

  it('should delete water by id', fakeAsync(() => {
    mockHttpClient.delete.and.returnValue(of({ status: 200 }));

    let status = 0;
    service.dropWaterById(1).subscribe((statusCode) => {
      status = statusCode;
    });
    flush();
    expect(status).toBe(200);
  }));

  it('should delete power by id', fakeAsync(() => {
    mockHttpClient.delete.and.returnValue(of({ status: 200 }));

    let status = 0;
    service.dropPowerById(1).subscribe((statusCode) => {
      status = statusCode;
    });
    flush();
    expect(status).toBe(200);
  }));

  it('should get oil by id', fakeAsync(() => {
    const requestedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.get.and.returnValue(of(requestedOil));

    let rcvOil = {};
    service.getOilById(1).subscribe((oil) => {
      rcvOil = oil;
    });
    flush();
    expect(rcvOil).toBe(requestedOil);
  }));

  it('should get water by id', fakeAsync(() => {
    const requestedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.get.and.returnValue(of(requestedWater));

    let rcvWater = {};
    service.getWaterById(1).subscribe((water) => {
      rcvWater = water;
    });
    flush();
    expect(rcvWater).toBe(requestedWater);
  }));

  it('should get power by id', fakeAsync(() => {
    const requestedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.get.and.returnValue(of(requestedPower));

    let rcvPower = {};
    service.getPowerById(1).subscribe((power) => {
      rcvPower = power;
    });
    flush();
    expect(rcvPower).toBe(requestedPower);
  }));

  it('should get update by id', fakeAsync(() => {
    const updatedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.put.and.returnValue(of(updatedOil));

    let rcvOil = {};
    service.updateOilById(1, {} as unknown as OilInput).subscribe((oil) => {
      rcvOil = oil;
    });
    flush();
    expect(rcvOil).toBe(updatedOil);
  }));

  it('should update water by id', fakeAsync(() => {
    const updatedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.put.and.returnValue(of(updatedWater));

    let rcvWater = {};
    service
      .updateWaterById(1, {} as unknown as WaterInput)
      .subscribe((water) => {
        rcvWater = water;
      });
    flush();
    expect(rcvWater).toBe(updatedWater);
  }));

  it('should update power by id', fakeAsync(() => {
    const updatedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.put.and.returnValue(of(updatedPower));

    let rcvPower = {};
    service
      .updatePowerById(1, {} as unknown as PowerInput)
      .subscribe((power) => {
        rcvPower = power;
      });
    flush();
    expect(rcvPower).toBe(updatedPower);
  }));
});
