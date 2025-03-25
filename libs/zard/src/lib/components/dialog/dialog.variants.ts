import { cva, VariantProps } from 'class-variance-authority';

export const dialogContainerVariants = cva('fixed w-full h-full top-0 left-0 flex items-center justify-center z-50');

export const dialogBackdropVariants = cva('fixed w-full h-full top-0 left-0 flex bg-black opacity-50 z-75');

export const dialogVariants = cva('border rounded-lg bg-background p-6 z-100 z-100', {
  variants: {
    zSize: {
      default: 'w-full max-w-lg',
      sm: 'w-full max-w-sm',
      lg: 'w-full max-w-xl',
    },
  },
});

export type ZardDialogVariants = VariantProps<typeof dialogVariants>;

export const dialogHeaderVariants = cva('flex flex-col space-y-1.5 mb-8');

export const dialogHeaderTitleVariants = cva('text-lg font-semibold leading-none tracking-tight');
export const dialogHeaderDescriptionVariants = cva('text-sm text-muted-foreground');

export const dialogFooterVariants = cva('flex flex-col-reverse *:not-first:mb-3 sm:*:not-first:mb-0 sm:flex-row sm:justify-end sm:space-x-2 mt-8');
