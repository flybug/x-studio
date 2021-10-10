
export interface Point2D {
    x: number;
    y: number;
}

export class SvgMouseEvent {

    private _isDragging = false;
    private _event: any;

    constructor() {
    }

    reset() {
        this._isDragging = false;
    }

    setEventMark(event: any) {
        this._event = event;
    }

    getEventMark(): any {
        return this._event;
    }

    startDrag(event: any) {
        event.stopPropagation();
        this._isDragging = true;
    }

    endDrag(event: any) {
        event.stopPropagation();
        this._isDragging = false;
    }

    isDragging(): boolean {
        return this._isDragging;
    }
}
