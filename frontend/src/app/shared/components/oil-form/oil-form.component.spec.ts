import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilFormComponent } from './oil-form.component';

describe('OilFormComponent', () => {
  let component: OilFormComponent;
  let fixture: ComponentFixture<OilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OilFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit oil event', () => {
    const emitSpy = spyOn(component.submitOilEvent, 'emit');
    component.submitOil({ value: 1, date: 'test' });
    expect(emitSpy).toHaveBeenCalledWith({ filled: 1, date: 'test' });
  });
});
