import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from '../../model/Item';
import {ApiServiceService} from '../../service/apiService/api-service.service';
import {ItemsServiceService} from '../../service/itemsService/items-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.css']
})
export class TreeItemComponent implements OnInit {
  @ViewChild('sum')
  sum: HTMLElement;
  @Input()
  item: Item;
  @Output()
  removeEmitter: EventEmitter<number> = new EventEmitter<number>();

  isVisible = 'visible';
  pasteVisible = false;

  constructor(private apiService: ApiServiceService, private itemsService: ItemsServiceService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.refreshVisibilityState();
    this.itemsService.pasteBtnVisibleEmitter.subscribe(state => this.pasteVisible = state);
  }

  getIndent() {
    if (this === undefined) {
      return 0;
    }
    return this.item.level * 50 + 50;
  }

  ///////////////// BUTTONS HANDLERS //////////////////////

  onRemove() {
    this.removeEmitter.emit(this.item.id);
  }

  onAdd() {
    this.apiService.enableLoading();
    this.apiService.addItem(this.item.id).subscribe(data => {
      const newItem: Item = data as Item;
      this.item.children.push(newItem);
      this.refreshVisibilityState();
      this.apiService.disableLoading();
    }, error => {
      this.showError(error);
      this.refreshVisibilityState();
      this.apiService.disableLoading();
    });
  }

  onMove() {
    this.itemsService.move(this.item.id);
  }

  onCopy() {
    this.itemsService.copy(this.item.id);
  }

  onPaste() {
    this.itemsService.paste(this.item.id);
  }

  ///////////////// OTHERS METHODS ////////////////////////

  onValueChange() {
    this.apiService.enableLoading();
    this.apiService.updateItemValue(this.item.id, this.item.value).subscribe(value => {
      this.item = value as Item;
      this.apiService.disableLoading();
    }, error => {
      this.showError(error);
      this.apiService.disableLoading();
    });
  }

  onRemoveReceive(id: number) {
    this.removeSubItem(id);
    this.refreshVisibilityState();
  }

  private refreshVisibilityState() {
    if (!Array.isArray(this.item.children) || !this.item.children.length) {
      this.isVisible = 'visible';
    } else {
      this.isVisible = 'hidden';
    }
  }

  private removeSubItem(id: number) {
    this.apiService.enableLoading();
    this.apiService.removeItem(id).subscribe(data => {
      this.item.children.forEach((item, index) => {
        if (item.id === id) {
          this.item.children.splice(index, 1);
          this.refreshVisibilityState();
        }
      });
      this.apiService.disableLoading();
    }, error => {
      this.showError(error);
      this.refreshVisibilityState();
      this.apiService.disableLoading();
    });
  }

  private showError(error: Error) {
    this.snackBar.open((error as HttpErrorResponse).message, null, {
      duration: 3000,
    });
  }

}
