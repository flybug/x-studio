import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSearchComponent } from './x-search/x-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    XSearchComponent,
  ],
  exports: [
    XSearchComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    OverlayModule,
    FormsModule,
    MatCardModule,
    ScrollingModule,
  ]
})
export class XWidgetModule { }
