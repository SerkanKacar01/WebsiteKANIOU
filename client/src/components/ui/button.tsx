import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium overflow-hidden transition-all duration-300 cubic-bezier(0.23, 1, 0.320, 1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D5B36A] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group gpu-accelerated",
  {
    compoundVariants: [
      {
        variant: ["destructive"],
        className: "focus-visible:ring-red-500 focus-visible:ring-offset-red-100"
      },
      {
        variant: ["outline", "ghost"],
        className: "focus-visible:ring-[#D5B36A] focus-visible:ring-offset-white"
      }
    ],
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#D5B36A] to-[#C4A55A] text-white font-semibold shadow-gold-medium hover:shadow-gold-strong hover:translate-y-[-2px] hover:scale-105 active:translate-y-[-1px] active:scale-102 text-shadow-luxury-soft focus-visible:translate-y-[-2px] focus-visible:shadow-gold-strong focus-visible:scale-105",
        destructive:
          "glass-luxury-medium border border-red-300 text-red-700 font-semibold shadow-depth-3 hover:shadow-depth-4 hover:bg-red-50 hover:translate-y-[-1px] hover:scale-102 active:translate-y-0 focus-visible:bg-red-50 focus-visible:translate-y-[-1px] focus-visible:scale-102",
        outline:
          "glass-luxury-light border-2 border-[#D5B36A] text-[#D5B36A] font-semibold hover:bg-[#D5B36A] hover:text-white hover:translate-y-[-2px] hover:scale-105 active:translate-y-[-1px] shadow-depth-2 hover:shadow-gold-medium focus-visible:bg-[#D5B36A] focus-visible:text-white focus-visible:translate-y-[-2px] focus-visible:scale-105",
        secondary:
          "glass-luxury-medium bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 font-semibold shadow-depth-2 hover:shadow-depth-3 hover:translate-y-[-1px] hover:scale-102 focus-visible:shadow-depth-3 focus-visible:translate-y-[-1px] focus-visible:scale-102",
        ghost: "bg-transparent hover:glass-luxury-light hover:shadow-depth-2 text-[#D5B36A] font-medium hover:translate-y-[-1px] transition-all duration-300 focus-visible:glass-luxury-light focus-visible:shadow-depth-2 focus-visible:translate-y-[-1px]",
        link: "text-[#D5B36A] font-medium hover:text-[#C4A55A] underline-offset-4 hover:underline transition-colors duration-200 focus-visible:text-[#C4A55A] focus-visible:underline",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-xl text-base",
        sm: "h-10 px-4 py-2 rounded-lg text-sm",
        lg: "h-14 px-8 py-4 rounded-xl text-lg",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {(variant === "default" || variant === "outline") && (
          <>
            {/* Performance-optimized shimmer effect with reduced motion support */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full group-focus-visible:translate-x-full shimmer-gpu" aria-hidden="true" />
            {/* Inner highlight for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-xl" aria-hidden="true" />
          </>
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
