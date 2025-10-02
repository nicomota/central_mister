import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoDeContasComponent } from './plano-de-contas.component';

describe('PlanoDeContasComponent', () => {
  let component: PlanoDeContasComponent;
  let fixture: ComponentFixture<PlanoDeContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoDeContasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanoDeContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
