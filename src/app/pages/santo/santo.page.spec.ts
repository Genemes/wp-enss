import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SantoPage } from './santo.page';

describe('SantoPage', () => {
  let component: SantoPage;
  let fixture: ComponentFixture<SantoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SantoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
