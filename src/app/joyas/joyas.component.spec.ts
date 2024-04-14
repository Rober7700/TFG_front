import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyasComponent } from './joyas.component';

describe('JoyasComponent', () => {
  let component: JoyasComponent;
  let fixture: ComponentFixture<JoyasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoyasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoyasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
