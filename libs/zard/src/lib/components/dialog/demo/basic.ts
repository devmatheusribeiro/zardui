import { Component, inject, OnInit } from '@angular/core';

import { ZardButtonComponent } from '../../button/button.component';
import { DialogService } from '../dialog.component';
import { ZardDialogModule } from '../dialog.module';
import { ZardInputDirective } from '../../input/input.directive';

@Component({
  selector: 'app-custom-dialog',
  imports: [ZardDialogModule, ZardButtonComponent, ZardInputDirective],
  template: `
    <z-dialog>
      <z-dialog-header>
        <z-dialog-header-title>Edit profile </z-dialog-header-title>
        <z-dialog-header-description>Make changes to your profile here. Click save when you're done.</z-dialog-header-description>
      </z-dialog-header>

      <z-dialog-body>
        <input z-input placeholder="Your Name" />
      </z-dialog-body>

      <z-dialog-footer>
        <z-button>Cancel</z-button>
        <z-button>Save</z-button>
      </z-dialog-footer>
    </z-dialog>
  `,
})
export class CustomDialogComponent {}

@Component({
  standalone: true,
  imports: [ZardButtonComponent],
  template: ` <button z-button (click)="openDialog()">Open Dialog</button> `,
})
export class ZardDemoDialogBasicComponent {
  dialog = inject(DialogService);

  constructor() {
    this.dialog.openDialog(CustomDialogComponent);
  }

  openDialog() {
    this.dialog.openDialog(CustomDialogComponent);
  }
}
