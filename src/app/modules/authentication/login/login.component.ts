import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/authentication/auth.service';

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
  constructor(private fb: FormBuilder, private router: Router,    private authService: AuthService,) {}

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
        next: () => this.router.navigateByUrl('/dashboard'), // ✅ ตรงเข้า Dashboard
        error: () => (this.error = 'Login failed')
      });
    }
  }
}
