import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <% classname %>RoutingModule } from './<% name %>-routing.module';

@NgModule({
  imports: [
    CommonModule,
    <% classname %>RoutingModule
  ],
  declarations: []
})
export class <% classname %>Module { }
