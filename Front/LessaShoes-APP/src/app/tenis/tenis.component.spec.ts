/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TenisComponent } from './tenis.component';

describe('TenisComponent', () => {
  let component: TenisComponent;
  let fixture: ComponentFixture<TenisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
