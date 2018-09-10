import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../service/apiService/api-service.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

  visible = false;

  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.initProgressBarListener();
  }

  private initProgressBarListener() {
    this.apiService.loadingBarEmitter.subscribe(state => this.visible = state);
  }

}
