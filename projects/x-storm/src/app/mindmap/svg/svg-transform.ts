import { NumberUtils } from "../../x-utils/x-utils.module";

export interface SvgTransformRoate {
    rotateX: number;
    rotateY: number;
    rotateZ: number
}

export interface SvgTransformTranslate {
    x: number;
    y: number;
}

export interface SvgTransformSkew {
    skewX: number;
    skewY: number;
}

export interface SvgTransformScale {
    scaleX: number;
    scaleY: number;
}

export class SvgTransform {
    private _rotate: SvgTransformRoate | undefined;
    private _translateMark: SvgTransformTranslate = {x: 0, y: 0};
    private _translate: SvgTransformTranslate | undefined;
    private _skew: SvgTransformSkew | undefined;
    private _scaleMark: SvgTransformScale = {scaleX: 1, scaleY: 1};
    private _scale: SvgTransformScale | undefined;

    constructor() {
    }

    reset() {
        this._rotate = undefined;
        this._translate = undefined;
        this._skew = undefined;
        this._scale = undefined;
    }

    setTranslate(x: number, y: number) {
        this._translate = (x == 0 && y == 0) ? undefined : { x: NumberUtils.fixed2(x), y: NumberUtils.fixed2(y) };
    }

    getTranslate(): SvgTransformTranslate | undefined {
        return this._translate;
    }

    private _getTranslateStr(): string {
        return (this._translate) ? ("translate(" + this._translate.x + " " + this._translate.y + ")") : "";
    }

    setTranslateMark() {
        this._translateMark = this._translate ? { x: this._translate.x, y: this._translate.y } : {x: 0, y: 0};
    }

    getTranslateMark() {
        return this._translateMark;
    }

    setScale(scaleX: number, scaleY: number) {
        this._scale = (scaleX == 1 && scaleY == 1) ? undefined : { scaleX: NumberUtils.fixed2(scaleX), scaleY: NumberUtils.fixed2(scaleY) };
    }

    getScale(): SvgTransformScale | undefined {
        return this._scale;
    }

    private _getScaleStr(): string {
        return (this._scale) ? ("scale(" + this._scale.scaleX + " " + this._scale.scaleY + ")") : "";
    }

    setScaleMark() {
        this._scaleMark = this._scale ? { scaleX: this._scale.scaleX, scaleY: this._scale.scaleY } : {scaleX: 1, scaleY: 1};
    }

    getScaleMark() {
        return this._scaleMark;
    }

    transform(): string {
        return this._getTranslateStr() + " " + this._getScaleStr();
    }
}
