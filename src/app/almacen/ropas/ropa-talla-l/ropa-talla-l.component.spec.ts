import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RopaTallaLComponent } from './ropa-talla-l.component';

describe('RopaTallaLComponent', () => {
  let component: RopaTallaLComponent;
  let fixture: ComponentFixture<RopaTallaLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RopaTallaLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RopaTallaLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
