import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from './common-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonMaterialModule,
    RouterModule
  ], 
  exports: [
    CommonMaterialModule,
  ]
})
export class CommonUiModule { }