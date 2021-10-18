import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataNode } from '../../storm-data/data-node';
import { StormDataService } from '../../storm-data/storm-data.service';

@Component({
  selector: 'x-search',
  templateUrl: './x-search.component.html',
  styleUrls: ['./x-search.component.scss']
})
export class XSearchComponent implements OnInit {

  @Output() selectedId = new EventEmitter<string>();

  searchStr = '';
  searchResults: Array<DataNode> = [];

  isOnBlur = false;

  constructor(private ds: StormDataService) { }

  ngOnInit(): void {
  }

  search(event: any, value: string): void {
    event.stopPropagation();
    this.searchResults = this.ds.search(value);
    if (this.searchResults.length === 1) {
      this._select(this.searchResults[0]);
    }
  }

  private _select(node: DataNode): void {
    this.cleanResult();
    this.searchStr = node.getName();
    this.selectedId.emit(node.getId());
  }

  select(event: any, node: DataNode): void {
    event.stopPropagation();
    this._select(node);
  }

  private cleanResult(): void {
    // TODO: Memory leak?
    this.searchResults = [];
  }

  onBlur(): void {
    if (this.isOnBlur) {
      this.cleanResult();
    }
  }

  private enableBlur() {
    this.isOnBlur = true;
  }

  private disableBlur() {
    this.isOnBlur = false;
  }

  onMouseEnter(): void {
    this.disableBlur()
  }

  onMouseLeave(): void {
    this.enableBlur();
  }
}
