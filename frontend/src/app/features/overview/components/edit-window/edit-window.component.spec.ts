import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { EditWindowComponent } from './edit-window.component';

describe('EditWindowComponent', () => {
  let component: EditWindowComponent;
  let fixture: ComponentFixture<EditWindowComponent>;
  let ngUnsubscribe: Subject<unknown>;
  let mockModalRef: jasmine.SpyObj<BsModalRef>;

  beforeEach(async () => {
    let ngUnsubscribe = new Subject();
    mockModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      declarations: [EditWindowComponent],
      providers: [
        {
          provide: BsModalRef,
          useValue: mockModalRef,
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    //ngUnsubscribe.next();
    //ngUnsubscribe.complete();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.close();
    expect(mockModalRef.hide).toHaveBeenCalled();
  });
});
