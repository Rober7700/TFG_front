import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscaparateHomeComponent } from './escaparate-home.component';

describe('EscaparateHomeComponent', () => {
  let component: EscaparateHomeComponent;
  let fixture: ComponentFixture<EscaparateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscaparateHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscaparateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
