import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <% componentclassname %> } from './<% componentname %>.component';

describe('<% componentclassname %>Component', () => {
  let component: <% componentclassname %>;
  let fixture: ComponentFixture<<% componentclassname %>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <% componentclassname %> ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<% componentclassname %>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
