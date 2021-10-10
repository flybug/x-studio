import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import * as d3 from 'd3';
import { DataNode } from '../../storm-data/data-node';
import { StormDataService } from '../../storm-data/storm-data.service';
import { XStormOptions } from '../../storm-data/storm-model';

@Component({
  selector: 'x-mindmap',
  templateUrl: './x-mindmap.component.html',
  styleUrls: ['./x-mindmap.component.scss']
})
export class XMindmapComponent implements OnInit, AfterViewInit {
  @ViewChild('svgCanvas') private svgRef!: ElementRef;
  @ViewChild('svgRoot') private svgRootzRef!: ElementRef;

  screenSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  svg: any;
  svgRoot: any;
  zoom: any;

  private DURATION_MOVE_TO_CENTER = 2000;

  private editingNodeId: string | undefined | null;

  constructor(public ds: StormDataService) {
  }

  ngOnInit(): void {
    this.ds.demo();
  }

  ngAfterViewInit(): void {
    this.svg = d3.select(this.svgRef.nativeElement);
    this.svgRoot = d3.select(this.svgRootzRef.nativeElement);
    this.initZoom();
    this.initListener();
    setTimeout(() => {
      this.ds.getRootNode().updateChildrenY();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    setTimeout(() => {
      this.screenSize.width = window.innerWidth;
      this.screenSize.height = window.innerHeight;
    });
  }

  search(name: string): void {
    console.log(this.ds.search(name));
  }

  getPathFromParent(node: DataNode): string | undefined {
    const p = node.getParent();
    if (p) {
      return 'M' + p.pointOut.x + ' ' + p.pointOut.y
        + ' C ' + (node.pointIn.x + p.pointOut.x) / 2 + ' ' + p.pointOut.y
        + ' ' + (node.pointIn.x + p.pointOut.x) / 2 + ' ' + node.pointIn.y
        + ' ' + node.pointIn.x + ' ' + node.pointIn.y;
    }
    else {
      return undefined;
    }
  }

  moveToCenter(x: number, y: number): void {
    const tf = d3.zoomIdentity.scale(1).translate(this.screenSize.width / 2 - x, this.screenSize.height / 2 - y);
    this.svg.transition().duration(this.DURATION_MOVE_TO_CENTER).call(this.zoom.transform, tf);
  }

  private initZoom(): void {
    this.zoom = d3.zoom().on('zoom', (event: any) => {
      // console.log(event.transform)
      this.svgRoot.attr('transform', event.transform);
    });

    this.svg.call(this.zoom).on('dblclick.zoom', null);
  }

  private initListener(): void {
    d3.select('body')
      .on('keydown', (event: KeyboardEvent) => {
        this.onKeyDown(event);
      });
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'CapsLock':
        break;
      case 'Tab':
        event.preventDefault();
        this.addChild();
        break;
      case 'Enter':
        if (this.isEditing()) {
          this.stopEditing();
        }
        else {
          this.addSubline();
        }
        break;
      case 'Delete':
        if (this.isEditing()) {
          break;
        }
        else {
          this.ds.removeSelectedNode();
        }
        break;
      default:
        break;
    }
  }

  clickOnNode(event: any, id: string): void {
    if (this.ds.isNodeSelected(id)) {
      this.startNodeEditing(id);
    }
    else {
      this.ds.selectNodes([id]);
    }
  }

  doubleClickOnNode(event: any, id: string): void {
    event.stopPropagation();
    this.startNodeEditing(id);
  }

  select(id: string | undefined | null): void {
    if (!id) {
      return;
    }

    this.ds.selectNodes([id]);
    this.stopEditing();

    const node = this.ds.getNode(id);
    if (node) {
      this.moveToCenter(node.getX(), node.getY());
    }
  }

  startNodeEditing(id: string | undefined | null): void {
    this.editingNodeId = id;
  }

  isEditing(): boolean {
    return this.editingNodeId ? true : false;
  }

  stopEditing(): void {
    this.editingNodeId = undefined;
  }

  isNodeEditing(id: string | undefined | null): boolean {
    if (id && this.editingNodeId) {
      return id.localeCompare(this.editingNodeId) === 0;
    }
    else {
      return false;
    }
  }

  getVisibleState(id: string): string {
    if (this.isNodeEditing(id)) {
      return 'hidden';
    }
    else {
      return 'visible';
    }
  }

  addSubline(): void {
    const node = this.ds.getSingleSelectedNode();
    if (node) {
      const parent = node.getParent();
      if (parent) {
        // TODO: new node name
        const newNode = this.ds.newDataNode(parent.getName() + '-' + parent.getChildren().length);
        this.ds.addChild(parent, newNode, node);
        this.startNodeEditing(newNode.getId());
      }
    }
  }

  addChild(): void {
    const parent = this.ds.getSingleSelectedNode();
    if (parent) {
      // TODO: new node name
      const newNode = this.ds.newDataNode(parent.getName() + '-' + parent.getChildren().length);
      this.ds.addChild(parent, newNode);
      this.startNodeEditing(newNode.getId());
    }
  }

  onInputChange(value: string, node: DataNode): void {
    if (!value) {
      node.setName(XStormOptions.defaultName);
    }
  }
}
