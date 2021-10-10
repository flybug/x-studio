import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XSearchComponent } from './x-search.component';

describe('XSearchComponent', () => {
  let component: XSearchComponent;
  let fixture: ComponentFixture<XSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
