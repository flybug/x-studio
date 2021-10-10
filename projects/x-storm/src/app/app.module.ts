import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { StormDataModule } from './storm-data/storm-data.module';
import { MessengerModule } from './messenger/messenger.module';
import { MindmapModule } from './mindmap/mindmap.module';
import { XWidgetModule } from './x-widget/x-widget.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MessengerModule.forRoot(),
    StormDataModule.forRoot(),
    MindmapModule,
    XWidgetModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
