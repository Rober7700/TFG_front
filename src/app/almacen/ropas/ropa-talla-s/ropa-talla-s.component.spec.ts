import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RopaTallaSComponent } from './ropa-talla-s.component';

describe('RopaTallaSComponent', () => {
  let component: RopaTallaSComponent;
  let fixture: ComponentFixture<RopaTallaSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RopaTallaSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RopaTallaSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
