import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMantenimientoComponent } from './detalle-mantenimiento.component';

describe('DetalleMantenimientoComponent', () => {
  let component: DetalleMantenimientoComponent;
  let fixture: ComponentFixture<DetalleMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMantenimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
