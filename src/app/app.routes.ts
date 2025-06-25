import { Routes } from '@angular/router';

/**
 * ▸ 1) auth      ──> lazy-load AuthenticationModule
 * ▸ 2) layout    ──> LayoutsComponent + children (dashboard + modules)
 * ▸ 3) fallback  ──> ไป /auth/login
 */
export const routes: Routes = [
  /* ───── 1. กลุ่ม /auth ───── */
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },

  /* ───── 2. Main layout + children ───── */
  {
    path: '',
    loadComponent: () =>
      import('./layouts/layouts.component').then(m => m.LayoutsComponent),
    // canActivateChild: [AuthGuard] <-- เสริมภายหลังได้
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard.component').then(
            m => m.DashboardComponent
          )
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            m => m.ProductsModule
          )
      },
      {
        path: 'product-categories',
        loadChildren: () =>
          import('./modules/product-categories/product-categories.module').then(
            m => m.ProductCategoriesModule
          )
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module').then(
            m => m.CustomersModule
          )
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./modules/sales/sales.module').then(
            m => m.SalesModule
          )
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./modules/payments/payments.module').then(
            m => m.PaymentsModule
          )
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./modules/inventory/inventory.module').then(
            m => m.InventoryModule
          )
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            m => m.ReportsModule
          )
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then(
            m => m.UsersModule
          )
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./modules/permissions/permissions.module').then(
            m => m.PermissionsModule
          )
      },

      // เปิด root (/) → เด้งเข้า dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  /* ───── 3. fallback ───── */
  { path: '**', redirectTo: '/auth/login' }
];
