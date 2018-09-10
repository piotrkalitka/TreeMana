import {EventEmitter, Injectable} from '@angular/core';
import {ApiServiceService} from '../apiService/api-service.service';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {

  pasteBtnVisibleEmitter = new EventEmitter<boolean>();
  reloadDataEmitter = new EventEmitter();
  itemId: number;
  currentAction: Action;

  constructor(private apiService: ApiServiceService, private snackBar: MatSnackBar) {

  }

  cancelPaste() {
    this.itemId = null;
    this.pasteBtnVisibleEmitter.emit(false);
  }

  copy(itemId: number) {
    this.itemId = itemId;
    this.currentAction = Action.COPY;
    this.pasteBtnVisibleEmitter.emit(true);
  }

  move(itemId: number) {
    this.itemId = itemId;
    this.currentAction = Action.MOVE;
    this.pasteBtnVisibleEmitter.emit(true);
  }

  paste(targetId: number) {
    this.apiService.enableLoading();
    if (this.currentAction === Action.COPY) {
      this.apiService.copyItem(this.itemId, targetId).subscribe(value => {
        this.reloadDataEmitter.emit();
        this.apiService.disableLoading();
      }, error => {
        this.showError(error);
        this.apiService.disableLoading();
      });
    } else {
      this.apiService.moveItem(this.itemId, targetId).subscribe(value => {
        this.reloadDataEmitter.emit();
        this.apiService.disableLoading();
      }, error => {
        this.showError(error);
        this.apiService.disableLoading();
      });
    }
    this.itemId = null;
    this.pasteBtnVisibleEmitter.emit(false);
  }

  private showError(error: Error) {
    this.snackBar.open((error as HttpErrorResponse).message, null, {
      duration: 3000,
    });
  }
}


enum Action {
  COPY, MOVE
}
