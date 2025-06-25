import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>('/authenticate/login', {
      username,
      password
    }).pipe(
      tap(res => {
        if (res?.data?.token) {
          localStorage.setItem('token', res.data.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
