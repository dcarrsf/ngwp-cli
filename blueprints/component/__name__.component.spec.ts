import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <% classname %> } from './<% name %>.component';

describe('<% classname %>Component', () => {
  let component: <% classname %>;
  let fixture: ComponentFixture<<% classname %>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <% classname %> ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<% classname %>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
