import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  createComponent,
  Directive,
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
  dialogBackdropVariants,
} from './dialog.variants';
import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ClassValue } from 'clsx';

export abstract class DialogRef {
  abstract close(value?: unknown): void;
}

function createDialogContainer(_document: Document) {
  const container = _document.createElement('div');

  const classesToArray = mergeClasses(dialogContainerVariants()).split(' ');
  container.classList.add(...classesToArray);

  container.setAttribute('id', Math.random().toString());

  return container;
}

function createDialogBackdrop(_document: Document) {
  const backdrop = _document.createElement('div');

  const classesToArray = mergeClasses(dialogBackdropVariants()).split(' ');
  backdrop.classList.add(...classesToArray);

  return backdrop;
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

    const backdrop = createDialogBackdrop(this.document);

    backdrop.addEventListener('click', () => {
      dialogRef.close(null);
    });

    container.appendChild(backdrop);

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
  selector: 'z-dialog-close-icon',
  exportAs: 'zDialogCloseIcon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ml-auto -mt-2 -mr-2',
    '(click)': 'onClick()',
  },
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-x-icon lucide-x h-5 w-5"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,
})
export class ZardDialogCloseIsonComponent {
  dialogRef = inject(DialogRef);

  onClick() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'z-dialog-header',
  exportAs: 'zDialogHeader',
  imports: [ZardDialogCloseIsonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex">
      <ng-content select="z-dialog-header-title"></ng-content>
      <z-dialog-close-icon />
    </div>
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
