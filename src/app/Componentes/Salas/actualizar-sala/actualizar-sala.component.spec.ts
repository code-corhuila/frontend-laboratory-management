import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSalaComponent } from './actualizar-sala.component';

describe('ActualizarSalaComponent', () => {
  let component: ActualizarSalaComponent;
  let fixture: ComponentFixture<ActualizarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
