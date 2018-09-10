import {Component, OnInit} from '@angular/core';
import {Item} from '../../model/Item';
import {ApiServiceService} from '../../service/apiService/api-service.service';
import {ItemsServiceService} from '../../service/itemsService/items-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})

export class TreeComponent implements OnInit {

  private item: Item;
  private cancelPasteVisible = false;

  constructor(private apiService: ApiServiceService, private itemsService: ItemsServiceService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadData();
    this.itemsService.reloadDataEmitter.subscribe(() => this.loadData());
    this.itemsService.pasteBtnVisibleEmitter.subscribe(state => this.cancelPasteVisible = state);
  }

  loadData() {
    this.apiService.enableLoading();
    this.apiService.getData().subscribe(data => {
      this.item = data as Item;
      this.apiService.disableLoading();
    }, error => {
      this.showError(error);
      this.apiService.disableLoading();
    });
  }

  addFirstItem() {
    this.apiService.enableLoading();
    this.apiService.addFirstItem().subscribe(value => {
      this.item = value as Item;
      this.apiService.disableLoading();
    }, error => {
      this.showError(error);
      this.apiService.disableLoading();
    });
  }

  cancelPaste() {
    this.itemsService.cancelPaste();
  }

  getItem() {
    return this.item;
  }


  private showError(error: Error) {
    this.snackBar.open((error as HttpErrorResponse).message, null, {
      duration: 3000,
    });
  }


}
