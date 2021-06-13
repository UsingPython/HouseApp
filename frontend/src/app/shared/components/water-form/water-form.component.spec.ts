import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterFormComponent } from './water-form.component';

describe('WaterFormComponent', () => {
  let component: WaterFormComponent;
  let fixture: ComponentFixture<WaterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit water event', () => {
    const emitSpy = spyOn(component.submitWaterEvent, 'emit');
    component.submitWater({ value: 1, date: 'test' });
    expect(emitSpy).toHaveBeenCalledWith({ cubicmeter: 1, date: 'test' });
  });
});
