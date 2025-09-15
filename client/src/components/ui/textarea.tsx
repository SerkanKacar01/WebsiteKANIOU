import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <div className="relative group">
      <textarea
        className={cn(
          "luxury-textarea w-full transition-all duration-300 focus:transform focus:translate-y-[-1px] placeholder:transition-all placeholder:duration-300 group-hover:shadow-gold-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
          className
        )}
        ref={ref}
        {...props}
      />
      {/* Luxury focus indicator */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 pointer-events-none group-focus-within:border-[#D5B36A]/30 group-focus-within:shadow-[0_0_0_4px_rgba(213,179,106,0.1)]" />
      {/* Subtle inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D5B36A]/5 via-transparent to-[#E0C188]/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
