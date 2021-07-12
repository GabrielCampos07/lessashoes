import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosattComponent } from './usuariosatt.component';

describe('UsuariosattComponent', () => {
  let component: UsuariosattComponent;
  let fixture: ComponentFixture<UsuariosattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosattComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
