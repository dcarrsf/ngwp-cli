import { TestBed, inject } from '@angular/core/testing';

import { <% serviceclassname %>Service } from './<% servicename %>.service';

describe('<% serviceclassname %>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [<% serviceclassname %>]
    });
  });

  it('should be created', inject([<% serviceclassname %>], (service: <% serviceclassname %>) => {
    expect(service).toBeTruthy();
  }));
});
