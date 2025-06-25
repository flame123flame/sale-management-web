import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { TranslateModule } from '@ngx-translate/core';


const coreModules: any[] = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgZorroAntdModule, TranslateModule];
const additionalModules: any[] = [];

@NgModule({
 
  imports: [...coreModules, ...additionalModules],
  exports: [...coreModules, ...additionalModules],
})
export class SharedModule { }
