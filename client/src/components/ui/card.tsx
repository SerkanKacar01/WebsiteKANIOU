import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    asButton?: boolean;
    'data-testid'?: string;
  }
>(({ className, asButton = false, ...props }, ref) => {
  const Component = asButton ? 'button' : 'div';
  
  return (
    <Component
      ref={ref as any}
      className={cn(
        "relative card-ultra-luxury group overflow-hidden transition-all duration-500 hover:shadow-depth-4 hover:translate-y-[-4px] hover:scale-[1.02] gpu-accelerated mobile-optimized",
        asButton && "focus:outline-none focus:ring-2 focus:ring-[#D5B36A] focus:ring-offset-2 focus:shadow-depth-4 focus:translate-y-[-4px] focus:scale-[1.02] cursor-pointer",
        !asButton && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B36A] focus-visible:ring-offset-2",
        className
      )}
      tabIndex={asButton ? 0 : props.tabIndex}
      role={asButton ? 'button' : props.role}
      {...props}
    >
      {/* Consolidated luxury overlay for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/6 via-transparent to-[#E0C188]/6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
      {/* Premium border glow */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#D5B36A]/20 group-focus:border-[#D5B36A]/30 transition-all duration-500 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        {props.children}
      </div>
    </Component>
  );
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 p-luxury-lg relative", className)}
    {...props}
  >
    {/* Subtle header accent line */}
    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D5B36A]/20 to-transparent" />
  </div>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref as any}
    className={cn(
      "text-title-lg text-gradient-luxury font-bold leading-tight text-shadow-luxury-medium transition-all duration-300 group-hover:text-shadow-luxury-strong group-focus:text-shadow-luxury-strong",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body text-[#2C3E50]/80 leading-relaxed group-hover:text-[#2C3E50] group-focus:text-[#2C3E50] transition-colors duration-300", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-luxury-lg pt-0 relative", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-luxury-lg pt-luxury-md relative", className)}
    {...props}
  >
    {/* Luxury footer accent */}
    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D5B36A]/15 to-transparent" />
  </div>
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
