import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { User, UserService } from '../../../../core/service/user/user.service';
import { log } from 'console';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})



export class UserListComponent implements OnInit {

  // ─────► Properties ◀─────
  dataList: User[] = [];

  // ─────► Constructor ◀─────
  constructor(private userService: UserService  ,private router: Router) {}

  // ─────► Lifecycle ◀─────
  ngOnInit(): void {
    this.loadUsers();
  }

// ─────► Business Logic ◀─────
private loadUsers(): void {
  this.userService.findUsers().subscribe({
    next: (data) => {
      console.log('✅ โหลดข้อมูลผู้ใช้สำเร็จ:', data);
      this.dataList = data;
    },
    error: (err) => {
      console.error('❌ โหลดข้อมูลผู้ใช้ล้มเหลว:', err);
    }
  });
}

  onEdit(id: number): void {
    this.router.navigate(['/users', id, 'edit']);
  }
}