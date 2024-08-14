import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarInventarioComponent } from './registrar-inventario.component';

describe('RegistrarInventarioComponent', () => {
  let component: RegistrarInventarioComponent;
  let fixture: ComponentFixture<RegistrarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
