import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivadorProductoComponent } from './archivador-producto.component';

describe('ArchivadorProductoComponent', () => {
  let component: ArchivadorProductoComponent;
  let fixture: ComponentFixture<ArchivadorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivadorProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivadorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
