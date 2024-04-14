import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPedidoComponent } from './fin-pedido.component';

describe('FinPedidoComponent', () => {
  let component: FinPedidoComponent;
  let fixture: ComponentFixture<FinPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
