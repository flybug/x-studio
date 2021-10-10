
export class XStormOptions {
    static defaultName = 'TOPIC';
}

export interface NodeStyle {
    fontSize: number;
    marginX: number;
    marginY: number;
    pointInPre: number;
}

export class DefaultNodeStyle implements NodeStyle {
    fontSize = 36;
    width = 0;
    height = 16;
    x = 100;
    y = 200;
    marginX = 128;
    marginY = 16;
    pointInPre = 8;
}

// TODO: removed or setup node viewbox
export interface NodeViewBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
