'use client';

/**
 * Label Component
 * Simple label for form fields with optional tooltip
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  tooltip?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, tooltip, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-medium text-gray-700', className)}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
        {tooltip && (
          <span className="ml-2 text-xs text-gray-500 font-normal italic">
            ({tooltip})
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

