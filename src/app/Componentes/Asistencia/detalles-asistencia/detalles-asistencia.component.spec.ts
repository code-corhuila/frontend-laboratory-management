import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAsistenciaComponent } from './detalles-asistencia.component';

describe('DetallesAsistenciaComponent', () => {
  let component: DetallesAsistenciaComponent;
  let fixture: ComponentFixture<DetallesAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesAsistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
