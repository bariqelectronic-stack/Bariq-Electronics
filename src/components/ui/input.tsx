import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helper?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helper, startIcon, endIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-[#0A0A0A] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full border bg-white text-[#0A0A0A] placeholder:text-[#BDBDBD]",
              "text-sm rounded-[6px] px-3 py-2.5 transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error ? "border-[#DC2626]" : "border-[#E5E5E5] hover:border-[#D0D0D0]",
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]">
              {endIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
        {helper && !error && <p className="mt-1 text-xs text-[#9E9E9E]">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
