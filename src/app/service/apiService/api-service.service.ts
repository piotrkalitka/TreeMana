import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UpdateItemRequestBody} from '../../payload/UpdateItemRequestBody';
import {AddItemRequestBody} from '../../payload/AddItemRequestBody';
import {CopyItemRequestBody} from '../../payload/CopyItemRequestBody';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private BASE_URL = 'http://localhost:3000/api/';
  public loadingBarEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
  }

  enableLoading() {
    this.loadingBarEmitter.emit(true);
  }

  disableLoading() {
    this.loadingBarEmitter.emit(false);
  }

  ///////////////// HTTP REQUESTS METHODS /////////////////

  getData() {
    return this.http.get(this.BASE_URL);
  }

  addItem(parentId: number) {
    const requestBody = new AddItemRequestBody(0);
    return this.http.post(this.BASE_URL + parentId + '/', requestBody);
  }

  addFirstItem() {
    const requestBody = new AddItemRequestBody(0);
    return this.http.post(this.BASE_URL, requestBody);
  }

  removeItem(itemId: number) {
    return this.http.delete(this.BASE_URL + itemId + '/');
  }

  updateItemValue(itemId: number, value: number) {
    const requestBody = new UpdateItemRequestBody(value, null);
    return this.http.patch(this.BASE_URL + itemId + '/', requestBody);
  }

  moveItem(itemId: number, targetId: number) {
    const requestBody = new UpdateItemRequestBody(null, targetId);
    return this.http.patch(this.BASE_URL + itemId + '/', requestBody);
  }

  copyItem(itemId: number, targetId: number) {
    const requestBody = new CopyItemRequestBody(itemId);
    return this.http.post(this.BASE_URL + targetId + '/copy', requestBody);
  }

}
