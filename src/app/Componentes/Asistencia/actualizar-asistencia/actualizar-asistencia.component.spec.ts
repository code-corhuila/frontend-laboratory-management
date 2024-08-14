import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsistenciaComponent } from './actualizar-asistencia.component';

describe('ActualizarAsistenciaComponent', () => {
  let component: ActualizarAsistenciaComponent;
  let fixture: ComponentFixture<ActualizarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarAsistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
