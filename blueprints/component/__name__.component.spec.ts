import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <% classname %>Component } from './<% name %>.component';

describe('<% classname %>Component', () => {
  let component: <% classname %>Component;
  let fixture: ComponentFixture<<% classname %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <% classname %>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<% classname %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
