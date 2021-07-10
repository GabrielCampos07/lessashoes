import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenislistaComponent } from './tenislista.component';

describe('TenislistaComponent', () => {
  let component: TenislistaComponent;
  let fixture: ComponentFixture<TenislistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenislistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenislistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
