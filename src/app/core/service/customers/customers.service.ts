import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';
export interface Customer {
  id: number;
  fullName: string;
  address: string;
  phone: number;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly baseUrl = '/api/customers'; // Interceptor จะเติม root URL ให้อัตโนมัติ

  constructor(private http: HttpClient) {}

  // ✅ ดึงรายชื่อลูกค้าทั้งหมด
  findCustomers(): Observable<Customer[]> {
    return this.http.get<ApiResponse<Customer[]>>(`${this.baseUrl}/findCustomers`).pipe(
      map(res => res.data)
    );
  }

  // ✅ ดึงข้อมูลลูกค้ารายเดียวด้วย ID
  findCustomerById(id: number): Observable<Customer> {
    return this.http.get<ApiResponse<Customer>>(`${this.baseUrl}/findByIdCustomers`, {
      params: { id: id.toString() }
    }).pipe(
      map(res => res.data)
    );
  }

  // ✅ สร้างลูกค้าใหม่
  createCustomer(body: Partial<Customer>): Observable<Customer> {
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/create`, body).pipe(
      map(res => res.data)
    );
  }

  // ✅ อัปเดตข้อมูลลูกค้า
  updateCustomer(body: Customer): Observable<Customer> {
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/edit`, body).pipe(
      map(res => res.data)
    );
  }
}
