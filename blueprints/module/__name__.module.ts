import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <% moduleclassname %>RoutingModule } from './<% modulename %>-routing.module';

@NgModule({
  imports: [
    CommonModule,
    <% moduleclassname %>RoutingModule
  ],
  declarations: []
})
export class <% moduleclassname %>Module { }
