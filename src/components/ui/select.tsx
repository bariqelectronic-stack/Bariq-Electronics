import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  helper?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, helper, placeholder, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-[#0A0A0A] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none border bg-white text-[#0A0A0A]",
              "text-sm rounded-[6px] px-3 py-2.5 pr-9 transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error ? "border-[#DC2626]" : "border-[#E5E5E5] hover:border-[#D0D0D0]",
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E] pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
        {helper && !error && <p className="mt-1 text-xs text-[#9E9E9E]">{helper}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
