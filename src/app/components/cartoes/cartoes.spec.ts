import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartoesComponent } from '../cartoes/cartoes';

describe('Cartoes', () => {
  let component: CartoesComponent;
  let fixture: ComponentFixture<CartoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartoesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartoesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
