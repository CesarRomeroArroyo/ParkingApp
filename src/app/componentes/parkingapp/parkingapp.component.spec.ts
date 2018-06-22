import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingappComponent } from './parkingapp.component';

describe('ParkingappComponent', () => {
  let component: ParkingappComponent;
  let fixture: ComponentFixture<ParkingappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
