import { Component, inject, OnInit, signal } from '@angular/core';

import { ZardButtonComponent } from '../../button/button.component';
import { DialogRef, DialogService } from '../dialog.component';
import { ZardDialogModule } from '../dialog.module';
import { ZardInputDirective } from '../../input/input.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-dialog',
  imports: [ZardDialogModule, ZardButtonComponent, ZardInputDirective, FormsModule],
  template: `
    <z-dialog>
      <z-dialog-header>
        <z-dialog-header-title>What's your name? </z-dialog-header-title>
        <z-dialog-header-description>We need your name to save your progress</z-dialog-header-description>
      </z-dialog-header>

      <z-dialog-body>
        <input z-input placeholder="Your Name" class="w-full" [(ngModel)]="name" />
      </z-dialog-body>

      <z-dialog-footer>
        <z-button (click)="onCancel()">Cancel</z-button>
        <z-button (click)="onSave()">Save</z-button>
      </z-dialog-footer>
    </z-dialog>
  `,
})
export class CustomDialogComponent {
  dialogRef = inject(DialogRef);

  name = signal('');

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.name());
  }
}

@Component({
  standalone: true,
  imports: [ZardButtonComponent],
  template: `
    <button z-button (click)="openDialogWithConfig()">Open Dialog With Config</button>
    <button z-button (click)="openDialogWithCustomComponent()">Open Dialog With Custom Component</button>

    <div class="mt-6">User name: {{ userResponse() }}</div>
  `,
})
export class ZardDemoDialogBasicComponent {
  dialog = inject(DialogService);

  userResponse = signal('');

  openDialogWithCustomComponent() {
    this.dialog.openCustomDialog(CustomDialogComponent).afterClosed.subscribe({
      next: value => {
        this.userResponse.set(value as string);
      },
    });
  }

  openDialogWithConfig() {
    this.dialog
      .openCustomDialog({
        title: 'My Title',
        description: 'My description',
        content: 'This is my contentt. It can be a string, a component or a template',
        closeable: true,
        footer: [
          {
            label: 'Cancel',
            type: 'secondary',
            onClick: (instance: any) => {
              console.log('cancel', instance);
            },
          },
          {
            label: 'Ok',
            type: 'default',
            onClick: (instance: any) => {
              console.log('ok', instance);
            },
          },
        ],
      })
      .afterClosed.subscribe({
        next: value => {
          this.userResponse.set(value as string);
        },
      });
  }
}
