import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarNuevaSalaComponent } from './agendar-nueva-sala.component';

describe('AgendarNuevaSalaComponent', () => {
  let component: AgendarNuevaSalaComponent;
  let fixture: ComponentFixture<AgendarNuevaSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarNuevaSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarNuevaSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
