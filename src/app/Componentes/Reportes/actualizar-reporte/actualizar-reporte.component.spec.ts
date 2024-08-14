import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarReporteComponent } from './actualizar-reporte.component';

describe('ActualizarReporteComponent', () => {
  let component: ActualizarReporteComponent;
  let fixture: ComponentFixture<ActualizarReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
