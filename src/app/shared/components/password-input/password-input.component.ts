import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-password-input',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
}
