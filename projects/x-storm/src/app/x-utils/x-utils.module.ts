import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAutofocusDirective } from './x-autofocus.directive';

@NgModule({
  declarations: [
    XAutofocusDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    XAutofocusDirective
  ]
})
export class XUtilsModule { }
