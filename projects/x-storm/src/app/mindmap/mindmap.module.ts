import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAnchorDirective } from './x-anchor.directive';
import { FormsModule } from '@angular/forms';
import { XUtilsModule } from '../x-utils/x-utils.module';
import { XMindmapComponent } from './x-mindmap/x-mindmap.component';

@NgModule({
  declarations: [
    XAnchorDirective,
    XMindmapComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    XUtilsModule,
  ],
  exports: [
    XMindmapComponent,
  ]
})
export class MindmapModule { }
