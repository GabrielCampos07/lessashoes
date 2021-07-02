/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TenisaddComponent } from './tenisadd.component';

describe('TenisaddComponent', () => {
  let component: TenisaddComponent;
  let fixture: ComponentFixture<TenisaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenisaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenisaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
