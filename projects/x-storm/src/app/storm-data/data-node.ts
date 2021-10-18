import { Point2D } from '../mindmap/svg/svg-mouse-event';
import { NodeStyle } from './storm-model';

export class DataNode {

    private id = '';
    private name = '';
    private level = 0;
    private parent: DataNode | undefined;
    private children: Array<DataNode> = new Array();

    private x = 0;
    private y = 0;
    private width = 0;
    private height = 0;

    private boundingRect = {
        top: 0,
        left: 0
    };

    private viewBoxHeight = 0;

    private style: NodeStyle;

    pointIn: Point2D = {
        x: 0,
        y: 0
    };

    pointOut: Point2D = {
        x: 0,
        y: 0
    };


    constructor(id: string, nodeStyle: NodeStyle) {
        this.id = id;
        this.style = {
            fontSize: Math.floor(nodeStyle.fontSize),
            marginX: nodeStyle.marginX,
            marginY: nodeStyle.marginY,
            pointInPre: nodeStyle.pointInPre,
        };

        this.setFontSize(this.style.fontSize);
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): DataNode {
        this.name = name ? name : 'TOPIC';
        return this;
    }

    setFontSize(fontSize: number): DataNode {
        this.style.fontSize = Math.floor(fontSize);
        this.setHeight(this.style.fontSize * 2);
        return this;
    }

    updateAnchorPoint(): void {
        this.pointIn.x = this.x - this.style.fontSize;
        this.pointIn.y = this.y - this.style.fontSize / 2;
        this.pointOut.x = this.x + this.width + this.style.fontSize;
        this.pointOut.y = this.y - this.style.fontSize / 2;
        // this.pointIn.y = this.y;
        // this.pointOut.y = this.y;
    }

    setBoundingLocation(rect: any): void {
        this.boundingRect.top = rect.top;
        this.boundingRect.left = rect.left;
    }

    getBoundingRect(): any {
        return this.boundingRect;
    }

    setX(x: number): DataNode {
        this.x = x;
        this.updateAnchorPoint();
        return this;
    }

    initX(): void {
        if (this.parent) {
            this.setX(this.parent.x + this.parent.width + this.parent.style.marginX);
        }
    }

    getX(): number {
        return this.x;
    }

    private updateChildrenX(): void {
        this.children.forEach(node => {
            node.setX(this.x + this.width + this.style.marginX);
            node.updateChildrenX();
        });
    }

    setY(y: number): DataNode {
        this.y = y;
        this.updateAnchorPoint();
        return this;
    }

    getY(): number {
        return this.y;
    }

    updateChildrenY(): void {
        let y = this.pointOut.y - this.viewBoxHeight / 2;
        this.children.forEach((node, idx) => {
            const nodeHeight = node.getViewBoxHeight();
            node.setY(y + (nodeHeight + node.getStyle().fontSize) / 2);
            y += nodeHeight;
            node.updateChildrenY();
        });
    }

    setWidth(width: number): DataNode {
        const minWidth = this.style.fontSize;
        this.width = width > minWidth ? width : minWidth;
        this.updateAnchorPoint();
        this.updateChildrenX();
        return this;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    setHeight(height: number): DataNode {
        this.height = height;
        return this;
    }

    getViewBoxHeight(): number {
        return this.height > this.viewBoxHeight ? this.height : this.viewBoxHeight;
    }

    private updateViewBoxHeight(): void {
        let h = 0;
        this.children.forEach(node => {
            h += node.getViewBoxHeight();
        });

        this.viewBoxHeight = h;

        if (this.parent) {
            this.parent.updateViewBoxHeight();
        }
        else {
            this.updateChildrenY();
        }
    }

    getStyle(): NodeStyle {
        return this.style;
    }

    setLevel(level: number): DataNode {
        this.level = level;
        return this;
    }

    getLevel(): number {
        return this.level;
    }

    getParent(): DataNode | undefined {
        return this.parent;
    }

    setParent(node: DataNode): DataNode {
        this.parent = node;
        return this;
    }

    getChildren(): Array<DataNode> {
        return this.children;
    }

    addChild(node: DataNode, afterNode?: DataNode | undefined | null): void {
        node.setParent(this);
        node.setLevel(this.level + 1);
        const fs = Math.floor(this.style.fontSize * 0.8);
        node.setFontSize(fs > 16 ? fs : 16);
        node.initX();
        if (afterNode) {
            let idx = this.children.length;
            for (let index = 0; index < this.children.length; index++) {
                if (afterNode.getId().localeCompare(this.children[index].getId()) === 0) {
                    idx = index + 1;
                    break;
                }
            }
            this.children.splice(idx, 0, node);
        }
        else {
            this.children.push(node);
        }
        this.updateViewBoxHeight();
    }

    addSubline(node: DataNode, afterNode?: DataNode | undefined | null): void {
        if (this.parent) {
            this.parent.addChild(node, afterNode);
        }
    }

    removeChild(node: DataNode): void {
        this.children.splice(this.children.indexOf(node), 1);

        const p = node.getParent();
        if (p) {
            p.updateViewBoxHeight();
        }
    }
}
