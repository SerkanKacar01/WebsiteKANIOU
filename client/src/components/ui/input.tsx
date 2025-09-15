import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  'data-testid'?: string;
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, 'data-testid': testId, ...props }, ref) => {
    const inputId = React.useId();
    const errorId = error ? `${inputId}-error` : undefined;
    
    return (
      <div className="relative group w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-[#2C3E50] mb-2"
            data-testid={testId ? `${testId}-label` : undefined}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "luxury-input w-full transition-all duration-300 focus:transform focus:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-[#D5B36A]/50 focus:border-[#D5B36A]/50 placeholder:transition-all placeholder:duration-300 group-hover:shadow-gold-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 mobile-reduced-blur gpu-accelerated",
            error && "border-red-300 focus:border-red-500 focus:ring-red-200",
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          data-testid={testId}
          {...props}
        />
        
        {/* Enhanced focus indicator with better contrast */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 pointer-events-none group-focus-within:border-[#D5B36A]/40 group-focus-within:shadow-[0_0_0_4px_rgba(213,179,106,0.15)]" aria-hidden="true" />
        
        {/* Performance-optimized inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#D5B36A]/6 via-transparent to-[#E0C188]/6 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none gpu-accelerated" aria-hidden="true" />
        
        {/* Error state indicator */}
        {error && (
          <div className="absolute inset-0 rounded-xl border-2 border-red-300 pointer-events-none" aria-hidden="true" />
        )}
        
        {/* Error message */}
        {error && (
          <p 
            id={errorId}
            className="mt-2 text-sm text-red-600"
            role="alert"
            data-testid={testId ? `${testId}-error` : undefined}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
