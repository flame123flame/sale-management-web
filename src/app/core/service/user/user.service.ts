import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';

// เปลี่ยนตามโครงสร้าง response ที่ได้จาก API
export interface User {
  id: number;
  fullName: string;
  nickName: string;
  username: string;
  // เพิ่ม field อื่นๆ ตามต้องการ
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = '/api/users'; // ใช้ environment.api_url + interceptor เติมเอง

  constructor(private http: HttpClient) { }

  findUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/findUser`).pipe(
      map(res => res.data) // ✅ ดึงเฉพาะ `data`
    );
  }

 findUserById(id: number): Observable<User> {
  return this.http
    .get<ApiResponse<User>>(`${this.baseUrl}/findById`, { params: { id: id.toString() } })
    .pipe(map(res => res.data));
}


 updateUser(body: User): Observable<User> {
  return this.http
    .post<ApiResponse<User>>(`${this.baseUrl}/edit`, body)
    .pipe(map(res => res.data));
}

  createUser(body: Partial<User>): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/create`, body).pipe(
      map(res => res.data)
    );
  }


}
