import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <% routeclassname %> } from './<% routename %>.component';

describe('<% routeclassname %>Component', () => {
  let component: <% componentclassname %>;
  let fixture: ComponentFixture<<% routeclassname %>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <% routeclassname %> ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<% routeclassname %>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
