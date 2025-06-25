// global-loading.component.ts
import { Component } from '@angular/core';
import { LoadingService } from '../../../core/intercetor/loading.service';
import { SharedModule } from '../../shared.module';


@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [SharedModule],
  template: `
    <ng-container *ngIf="loadingService.loading$ | async">
      <div class="spinner-container">
        <div class="cube-wrapper">
          <div class="cube-folding">
            <span class="leaf1"></span>
            <span class="leaf2"></span>
            <span class="leaf3"></span>
            <span class="leaf4"></span>
          </div>
          <span class="loading" data-name="Loading">Loading</span>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./global-loading.component.scss']
})
export class GlobalLoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
