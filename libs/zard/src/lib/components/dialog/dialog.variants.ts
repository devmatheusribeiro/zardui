import { cva, VariantProps } from 'class-variance-authority';

export const dialogContainerVariants = cva('fixed w-full h-full top-0 left-0 flex items-center justify-center z-50', {
  variants: {},
});

export const dialogVariants = cva('border rounded p-6 z-100 space-y-4', {
  variants: {
    zSize: {
      default: 'w-full max-w-lg',
      sm: 'w-full max-w-sm',
      lg: 'w-full max-w-xl',
    },
  },
});

export type ZardDialogVariants = VariantProps<typeof dialogVariants>;

export const dialogHeaderVariants = cva('flex flex-col space-y-1.5');

export const dialogHeaderTitleVariants = cva('text-lg font-semibold leading-none tracking-tight');
export const dialogHeaderDescriptionVariants = cva('text-sm text-muted-foreground');

export const dialogFooterVariants = cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2');
