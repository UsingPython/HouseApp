import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IConfirmedDeleteMsg } from '../../models/confirm-delete';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() entryId?: number;
  public decision$ = new Subject<IConfirmedDeleteMsg>();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  public closeAndDecline(): void {
    if (this.entryId == null) {
      throw new Error('entryId not defined in confirm modal');
    }
    this.decision$.next({ id: this.entryId, shouldDelete: false });
    this.bsModalRef.hide();
  }

  public closeAndConfirm(): void {
    if (this.entryId == null) {
      throw new Error('entryId not defined in confirm modal');
    }
    this.decision$.next({ id: this.entryId, shouldDelete: true });
    this.bsModalRef.hide();
  }
}
