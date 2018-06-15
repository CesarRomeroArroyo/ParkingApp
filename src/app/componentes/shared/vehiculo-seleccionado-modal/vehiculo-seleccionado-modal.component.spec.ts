import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoSeleccionadoModalComponent } from './vehiculo-seleccionado-modal.component';

describe('VehiculoSeleccionadoModalComponent', () => {
  let component: VehiculoSeleccionadoModalComponent;
  let fixture: ComponentFixture<VehiculoSeleccionadoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculoSeleccionadoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoSeleccionadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
