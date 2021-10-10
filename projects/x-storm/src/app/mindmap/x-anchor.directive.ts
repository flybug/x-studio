import { Directive, DoCheck, ElementRef, Input, OnDestroy } from '@angular/core';
import { DataNode } from '../storm-data/data-node';

import * as d3 from 'd3';

@Directive({
  selector: '[xAnchor]'
})
export class XAnchorDirective implements DoCheck, OnDestroy {

  @Input() node: DataNode | undefined;
  private preName: string | undefined;

  constructor(private el: ElementRef) { }

  ngDoCheck(): void {
    if (this.node) {
      const name = this.node.getName();
      if (this.preName?.localeCompare(name) !== 0) {
        this.preName = name;
        this.el.nativeElement.textContent = name;
        const bbox = this.el.nativeElement.getBBox();
        this.node.setWidth(bbox.width);
        const boundingRect = this.el.nativeElement.getBoundingClientRect();
        this.node.setBoundingLocation(boundingRect);
      }
    }
  }

  ngOnDestroy(): void {
    this.node = undefined;
  }
}
