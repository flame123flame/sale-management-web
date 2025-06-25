import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../../core/service/user/user.service';
import { passwordComplexityValidator } from '../../../../shared/validators/password-complexity.validator';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})


export class UserFormComponent implements OnInit {
  form!: FormGroup;
  mode: 'add' | 'edit' = 'add';
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] || 'add';

    this.form = this.fb.group({
      id: [null], // ใช้สำหรับแก้ไข
      nickName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          passwordComplexityValidator
        ]
      ]
    });

    if (this.mode === 'edit') {
      this.userId = +this.route.snapshot.paramMap.get('id')!;
      this.loadUser();
      this.form.get('password')?.disable(); // ห้ามแก้รหัสผ่าน
    }
  }

  loadUser() {
    this.userService.findUserById(this.userId).subscribe({
      next: user => {
        console.log(user);

        this.form.patchValue(user);
        console.log(this.form.value);

      },
      error: err => console.error('โหลดข้อมูลผู้ใช้ล้มเหลว', err)
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    const action$ = this.mode === 'add'
      ? this.userService.createUser(formValue)
      : this.userService.updateUser(formValue);

    action$.subscribe({
      next: () => {
        const message = this.mode === 'add' ? 'เพิ่มผู้ใช้งานสำเร็จ' : 'แก้ไขข้อมูลสำเร็จ';
        this.modal.success({
          nzTitle: 'สำเร็จ',
          nzContent: message,
          nzOnOk: () => this.router.navigate(['/users']) // เมื่อกด "ตกลง"
        });
      },
      error: err => {
        console.error('บันทึกข้อมูลล้มเหลว', err);
        this.modal.error({
          nzTitle: 'เกิดข้อผิดพลาด',
          nzContent: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่ภายหลัง'
        });
      }
    });
  }



  onCancel() {
    this.router.navigate(['/users']);
  }
}
