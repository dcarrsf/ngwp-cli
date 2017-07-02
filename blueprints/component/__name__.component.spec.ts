import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <% componentclassname %>Component } from './<% componentname %>.component';

describe('<% componentclassname %>Component', () => {
  let component: <% componentclassname %>Component;
  let fixture: ComponentFixture<<% componentclassname %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <% componentclassname %>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<% componentclassname %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
