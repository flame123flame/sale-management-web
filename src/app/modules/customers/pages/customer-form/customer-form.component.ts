import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomerService } from '../../../../core/service/customers/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/), // ตัวเลขเท่านั้น
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.customerService.createCustomer(this.form.value).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: (err) => console.error('❌ Save failed', err),
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}
