import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TreeComponent} from './component/tree/tree.component';
import {HeaderComponent} from './component/header/header.component';
import {TreeItemComponent} from './component/treeItem/tree-item.component';
import {LoadingBarComponent} from './component/loading-bar/loading-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatSnackBarModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    HeaderComponent,
    TreeItemComponent,
    LoadingBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
