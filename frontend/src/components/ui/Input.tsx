import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="flex flex-col gap-2 relative">
        <label htmlFor={inputId} className="font-bold text-sm text-heading font-clash">
          {label} {props.required && <span className="text-accent-red">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`w-full bg-white border ${
            error ? 'border-accent-red focus:outline-accent-red' : 'border-border focus:outline-primary'
          } rounded-lg px-4 py-3 text-heading placeholder:text-muted/70 transition-colors ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-accent-red font-medium mt-1 absolute -bottom-5 left-0">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
