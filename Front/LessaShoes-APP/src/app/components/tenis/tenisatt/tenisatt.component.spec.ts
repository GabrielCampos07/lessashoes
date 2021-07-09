/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TenisattComponent } from './tenisatt.component';

describe('TenisattComponent', () => {
  let component: TenisattComponent;
  let fixture: ComponentFixture<TenisattComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenisattComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenisattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
