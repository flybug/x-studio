import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMindmapComponent } from './x-mindmap.component';

describe('XMindmapComponent', () => {
  let component: XMindmapComponent;
  let fixture: ComponentFixture<XMindmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XMindmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XMindmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
