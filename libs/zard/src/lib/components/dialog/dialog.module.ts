import { NgModule } from '@angular/core';
import {
  ZardDialogBodyComponent,
  ZardDialogComponent,
  ZardDialogFooterComponent,
  ZardDialogHeaderComponent,
  ZardDialogHeaderDescriptionComponent,
  ZardDialogHeaderTitleComponent,
} from './dialog.component';

const components = [
  ZardDialogComponent,
  ZardDialogBodyComponent,
  ZardDialogHeaderComponent,
  ZardDialogHeaderTitleComponent,
  ZardDialogHeaderDescriptionComponent,
  ZardDialogFooterComponent,
];

@NgModule({
  imports: components,
  exports: components,
})
export class ZardDialogModule {}
