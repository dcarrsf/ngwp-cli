import { TestBed, inject } from '@angular/core/testing';

import { <% classname %>Service } from './<% name %>.service';

describe('Service: <% classname %>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [<% classname %>Service]
    });
  });

  it('should be created', inject([<% classname %>Service], (service: <% classname %>Service) => {
    expect(service).toBeTruthy();
  }));
});
