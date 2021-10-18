import { Injectable } from '@angular/core';
import { DataNode } from './data-node';
import { DefaultNodeStyle, NodeStyle } from './storm-model';

@Injectable({
  providedIn: 'root'
})
export class StormDataService {

  nodes: Map<string, DataNode> = new Map();

  selectedNodes: Map<string, DataNode> = new Map();

  private rootDefaultName = 'X';
  private rootNode: DataNode;
  private style: NodeStyle = new DefaultNodeStyle();

  private rootId = '__root__';

  constructor() {
    this.rootNode = new DataNode(this.rootId, this.getNodeStyle()).setName(this.rootDefaultName);
    this.rootNode.setX(200).setY(200);
    this.init();
  }

  demo(): void {
    const levelNum = 2;
    const numPerLevel = 2;
    const stack: Array<DataNode> = new Array();
    stack.push(this.rootNode);
    while (stack.length > 0) {
      const pnode = stack.pop();
      if (pnode) {
        for (let i = 0; i < numPerLevel; i++) {
          const node = this.newDataNode(pnode.getName() + '-' + i);
          this.addChild(pnode, node);
          if (node.getLevel() < levelNum) {
            stack.push(node);
          }
        }
      }
      else {
        break;
      }
    }
    stack.splice(0, stack.length);
    console.log('Nodes Num:', this.nodes.size);
  }

  newDataNode(name: string): DataNode {
    return new DataNode(this.generateId(), this.getNodeStyle()).setName(name);
  }

  private generateId(): string {
    let offset = 0;
    const ts = Date.now().toString();
    let id = ts + offset;
    while (this.nodes.has(id)) {
      offset++;
      id = ts + offset;
    }

    return id;
  }

  init(): void {
    this.nodes.clear();
    this.nodes.set(this.rootNode.getId(), this.rootNode);
  }

  getRootNode(): DataNode {
    return this.rootNode;
  }

  getNode(id: string): DataNode | undefined {
    return this.nodes.get(id);
  }

  addChild(parent: DataNode, newNode: DataNode, afterNode?: DataNode | undefined | null): void {
    this.nodes.set(newNode.getId(), newNode);
    parent.addChild(newNode, afterNode);
  }

  addSubline(node: DataNode, newNode: DataNode, afterNode?: DataNode | undefined | null): void {
    this.nodes.set(newNode.getId(), newNode);
    node.addSubline(newNode, afterNode);
  }

  removeSelectedNode(): void {
    this.getMultiSelectedNodes().forEach(node => {
      this.removeNode(node);
    });
  }

  removeNode(node: DataNode): void {
    if (node.getId().localeCompare(this.rootId) === 0) {
      return;
    }

    const children = node.getChildren();
    for (let idx = children.length - 1; idx >= 0; idx--) {
      this.removeNode(children[idx]);
    }

    const parent = node.getParent();
    if (parent) {
      parent.removeChild(node);
    }
    this.removeNodeById(node.getId());
  }

  removeNodeById(id: string | undefined | null): void {
    if (id && this.rootId.localeCompare(id) !== 0) {
      this.nodes.delete(id);
      this.selectedNodes.delete(id);
    }
  }

  setNodeStyle(style: NodeStyle): void {
    this.style = style;
  }

  getNodeStyle(): NodeStyle {
    return this.style;
  }

  search(value: string | undefined | null): Array<DataNode> {
    if (!value || value.length === 0) {
      return [];
    }

    return [...this.nodes.values()].filter((node) => node.getName().indexOf(value) >= 0);
  }

  selectNodes(ids: Array<string> | undefined | null): void {
    if (ids) {
      this.clearSelection();
      ids?.forEach(id => {
        const node = this.nodes.get(id);
        if (node) {
          this.selectedNodes.set(id, node);
        }
      });
    }
  }

  unselectNodes(ids: Array<string> | undefined | null): void {
    if (ids) {
      ids?.forEach(id => {
        this.selectedNodes.delete(id);
      });
    }
  }

  clearSelection(): void {
    this.selectedNodes.clear();
  }

  isNodeSelected(id: string | undefined | null): boolean {
    if (id) {
      return this.selectedNodes.has(id);
    }
    else {
      return false;
    }
  }

  getSingleSelectedNode(): DataNode | undefined {
    return this.selectedNodes.size === 1 ? this.selectedNodes.values().next().value : undefined;
  }

  getMultiSelectedNodes(): Array<DataNode> {
    return [...this.selectedNodes.values()];
  }
}
