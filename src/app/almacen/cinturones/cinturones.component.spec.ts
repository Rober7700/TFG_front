import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinturonesComponent } from './cinturones.component';

describe('CinturonesComponent', () => {
  let component: CinturonesComponent;
  let fixture: ComponentFixture<CinturonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CinturonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CinturonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
