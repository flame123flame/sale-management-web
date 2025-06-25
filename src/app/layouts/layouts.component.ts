import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from '../shared/models/menu-item.model';

import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layouts',
 imports: [SharedModule], // ✅
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  standalone: true
})
export class LayoutsComponent implements OnInit {
  private readonly _router = inject(Router)
  isCollapsed = false;
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  menuList: MenuItem[] = [
    { label: 'หน้าหลัก', icon: 'bar-chart', route: '/dashboard' },
    { label: 'สินค้า', icon: 'appstore', route: '/products' },
    { label: 'หมวดหมู่สินค้า', icon: 'tag', route: '/product-categories' },
    { label: 'ลูกค้า', icon: 'user', route: '/customers' },
    { label: 'การขาย', icon: 'shopping-cart', route: '/sales' },
    { label: 'การชำระเงิน', icon: 'credit-card', route: '/payments' },
    { label: 'คลังสินค้า', icon: 'database', route: '/inventory' },
    { label: 'รายงาน', icon: 'file', route: '/reports' },
    { label: 'ผู้ใช้งาน', icon: 'team', route: '/users' },
    { label: 'สิทธิการใช้งาน', icon: 'safety-certificate', route: '/permissions' }
  ];
currentDateTimeThai: string = '';
ngOnInit(): void {
  this.updateDateTime();
  setInterval(() => this.updateDateTime(), 1000); // อัปเดตทุกวินาที
}

updateDateTime() {
  const now = new Date();
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const day = now.getDate();
  const month = thaiMonths[now.getMonth()];
  const year = now.getFullYear() + 543;
  const time = now.toLocaleTimeString('th-TH', { hour12: false });

  this.currentDateTimeThai = `วันที่ ${day} ${month} ${year} เวลา ${time}`;
}
  navigateTo(routeName: string | undefined): void {
    this._router.navigate([routeName]);
  }

  showModal(): void {
    console.log('showModal');
    
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      // this._authService.signOut()
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
