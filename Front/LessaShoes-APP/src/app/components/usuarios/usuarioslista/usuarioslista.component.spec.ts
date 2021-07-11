import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioslistaComponent } from './usuarioslista.component';

describe('UsuarioslistaComponent', () => {
  let component: UsuarioslistaComponent;
  let fixture: ComponentFixture<UsuarioslistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioslistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
