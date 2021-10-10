import { EventEmitter, Injectable } from '@angular/core';
import { Event } from './message-model';

@Injectable({
  providedIn: 'root'
})
export class MessengeCenterService {

  messenger: Map<string, EventEmitter<Event>> = new Map();
  constructor() { }
}

class XEventEmitter<T> extends EventEmitter<T> {
}
