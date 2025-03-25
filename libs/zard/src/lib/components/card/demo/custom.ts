import { Component } from '@angular/core';

import { ZardBadgeComponent } from '../../badge/badge.component';
import { ZardCardComponent } from '../card.component';

@Component({
  standalone: true,
  imports: [ZardCardComponent, ZardBadgeComponent],
  template: `
    <z-card [zTitle]="title" [zDescription]="description">
      <ng-template #title>
        <div class="flex items-center gap-2">
          Create project
          <z-badge>New</z-badge>
        </div>
      </ng-template>

      <ng-template #description> Deploy your new project in one-click. </ng-template>

      Body content
    </z-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
      }
    `,
  ],
})
export class ZardDemoCardCustomComponent {}
