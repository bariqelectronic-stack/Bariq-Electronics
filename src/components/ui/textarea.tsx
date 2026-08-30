import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helper?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helper, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-[#0A0A0A] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full border bg-white text-[#0A0A0A] placeholder:text-[#BDBDBD]",
            "text-sm rounded-[6px] px-3 py-2.5 resize-y min-h-[100px] transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-[#DC2626]" : "border-[#E5E5E5] hover:border-[#D0D0D0]",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
        {helper && !error && <p className="mt-1 text-xs text-[#9E9E9E]">{helper}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
