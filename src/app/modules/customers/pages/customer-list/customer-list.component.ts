import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { User, UserService } from '../../../../core/service/user/user.service';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../../../../core/service/customers/customers.service';

@Component({
  selector: 'app-customer-list',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent  implements OnInit {

  // ─────► Properties ◀─────
  customers: Customer[] = [];

  // ─────► Constructor ◀─────
  constructor(private customerService: CustomerService  ,private router: Router) {}

  // ─────► Lifecycle ◀─────
  ngOnInit(): void {
    this.loadUsers();
  }

// ─────► Business Logic ◀─────
private loadUsers(): void {
  this.customerService.findCustomers().subscribe({
    next: (data) => {
      console.log('✅ โหลดข้อมูลผู้ใช้สำเร็จ:', data);
      this.customers = data;
    },
    error: (err) => {
      console.error('❌ โหลดข้อมูลผู้ใช้ล้มเหลว:', err);
    }
  });
}

  onEdit(id: number): void {
    this.router.navigate(['/customers', id, 'edit']);
  }
}