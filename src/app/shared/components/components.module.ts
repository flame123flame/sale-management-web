import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordInputComponent } from './password-input/password-input.component';



const components: any[] = [PasswordInputComponent];

@NgModule({
 
  imports: [...components ],
  exports: [...components ],
})
export class ComponentsModule { }
