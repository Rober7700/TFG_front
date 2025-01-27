import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedComponent } from './authorized.component';

describe('AutorizedComponent', () => {
  let component: AuthorizedComponent;
  let fixture: ComponentFixture<AuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
