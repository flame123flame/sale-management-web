import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/authentication/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error = '';
  constructor(private fb: FormBuilder, private router: Router,    private authService: AuthService,  private message: NzMessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
onSubmit() {
  if (this.form.valid) {
    const { username, password } = this.form.value;
    this.authService.login(username!, password!).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err) => {
        // ตรวจ statusCode แล้วโชว์ข้อความที่เหมาะสม
        const code = err?.error?.statusCode;
        const msg = code === 'E0003'
          ? 'ไม่พบบัญชีผู้ใช้งาน'
          : code === 'E0005'
          ? 'ผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'
          : 'เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ';

        this.message.error(msg); // ✅ popup แจ้งเตือน
      }
    });
  }
}
}
