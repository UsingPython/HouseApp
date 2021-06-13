import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerFormComponent } from './power-form.component';

describe('PowerFormComponent', () => {
  let component: PowerFormComponent;
  let fixture: ComponentFixture<PowerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit power event', () => {
    const emitSpy = spyOn(component.submitPowerEvent, 'emit');
    component.submitPower({ value: 1, date: 'test' });
    expect(emitSpy).toHaveBeenCalledWith({ kwh: 1, date: 'test' });
  });
});
