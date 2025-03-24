import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  createComponent,
  EnvironmentInjector,
  inject,
  Injector,
  input,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { mergeClasses } from '../../shared/utils/utils';
import {
  dialogContainerVariants,
  ZardDialogVariants,
  dialogVariants,
  dialogHeaderTitleVariants,
  dialogHeaderVariants,
  dialogHeaderDescriptionVariants,
  dialogFooterVariants,
} from './dialog.variants';
import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ClassValue } from 'clsx';

export abstract class DialogRef {
  abstract close(value: unknown): void;
}

function createDialogContainer(_document: Document) {
  const container = _document.createElement('div');

  const classesToArray = mergeClasses(dialogContainerVariants()).split(' ');
  container.classList.add(...classesToArray);

  container.setAttribute('id', Math.random().toString());

  return container;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  applicationRef = inject(ApplicationRef);
  environmentInjector = inject(EnvironmentInjector);
  document = inject(DOCUMENT);

  openDialog<T>(component: Type<T>) {
    const container = createDialogContainer(this.document);

    this.document.body.appendChild(container);

    let componentRef: ComponentRef<T> | null = null;

    const afterClosed$ = new Subject();

    const dialogRef: DialogRef = {
      close: (value: unknown) => {
        this.applicationRef.detachView((componentRef as ComponentRef<T>).hostView);
        (componentRef as ComponentRef<T>).destroy();
        container.remove();

        afterClosed$.next(value);
        afterClosed$.complete();
      },
    };

    const dialogInjector = Injector.create({
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRef,
        },
      ],
    });

    componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      hostElement: container,
      elementInjector: dialogInjector,
    });

    this.applicationRef.attachView(componentRef.hostView);

    return {
      afterClosed: () => afterClosed$.asObservable(),
    };
  }
}

@Component({
  selector: 'z-dialog',
  exportAs: 'zDialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="z-dialog-header"></ng-content>
    <ng-content select="z-dialog-description"></ng-content>
    <ng-content select="z-dialog-body"></ng-content>
    <ng-content select="z-dialog-footer"></ng-content>
  `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardDialogComponent {
  readonly class = input<ClassValue>('');

  readonly zSize = input<ZardDialogVariants['zSize']>('default');

  protected readonly classes = computed(() => mergeClasses(dialogVariants({ zSize: this.zSize() }), this.class()));
}

@Component({
  selector: 'z-dialog-header',
  exportAs: 'zDialogHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="z-dialog-header-title"></ng-content>
    <ng-content select="z-dialog-header-description"></ng-content>
  `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardDialogHeaderComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(dialogHeaderVariants(), this.class()));
}

@Component({
  selector: 'z-dialog-header-title',
  exportAs: 'zDialogHeaderTitle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardDialogHeaderTitleComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(dialogHeaderTitleVariants(), this.class()));
}

@Component({
  selector: 'z-dialog-header-description',
  exportAs: 'zDialogHeaderDescription',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardDialogHeaderDescriptionComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(dialogHeaderDescriptionVariants(), this.class()));
}

@Component({
  selector: 'z-dialog-body',
  exportAs: 'zDialogBody',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardDialogBodyComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(this.class()));
}

@Component({
  selector: 'z-dialog-footer',
  exportAs: 'zDialogFooter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardDialogFooterComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(dialogFooterVariants(), this.class()));
}

// @Component({
//   standalone: true,
//   selector: 'app-dialog-actions',
//   template: `
//     <div class="modal-action">
//       <ng-content></ng-content>
//     </div>
//   `,
// })
// export class DialogActionsComponent {}

// @Directive({
//   standalone: true,
//   selector: '[appDialogTitle]',
// })
// export class DialogTitleDirective {
//   @HostBinding('class') class = 'text-lg font-bold text-base-content';
// }

// @NgModule({
//   imports: [DialogComponent, DialogActionsComponent, DialogTitleDirective],
//   exports: [DialogComponent, DialogActionsComponent, DialogTitleDirective],
// })
// export class DialogModule {}
