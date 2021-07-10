import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenisaddComponent } from './tenisadd.component';

describe('TenisaddComponent', () => {
  let component: TenisaddComponent;
  let fixture: ComponentFixture<TenisaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenisaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenisaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
