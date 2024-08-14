import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSalaComponent } from './registrar-sala.component';

describe('RegistrarSalaComponent', () => {
  let component: RegistrarSalaComponent;
  let fixture: ComponentFixture<RegistrarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
