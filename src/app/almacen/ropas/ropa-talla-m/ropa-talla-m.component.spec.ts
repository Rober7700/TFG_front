import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RopaTallaMComponent } from './ropa-talla-m.component';

describe('RopaTallaMComponent', () => {
  let component: RopaTallaMComponent;
  let fixture: ComponentFixture<RopaTallaMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RopaTallaMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RopaTallaMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
