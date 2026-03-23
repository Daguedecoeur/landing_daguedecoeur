import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContactFieldProps {
  id: string;
  label: string;
  type?: "input" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
}

export function ContactField({
  id,
  label,
  type = "input",
  placeholder,
  value,
  onChange,
  error,
  maxLength,
}: ContactFieldProps) {
  const inputClass = cn(
    "bg-cream/60 border-deep-violet/20 text-deep-violet placeholder:text-deep-violet/40",
    "focus:border-gold focus:ring-gold/20 focus-visible:ring-gold/20",
    "break-all overflow-hidden",
    error && "border-red-500"
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-cinzel text-xs tracking-widest uppercase text-deep-violet font-semibold"
      >
        {label}
      </label>

      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={5}
          className={cn(inputClass, "resize-none")}
        />
      ) : (
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className={inputClass}
        />
      )}

      <div className="flex justify-between items-center min-h-[1.25rem]">
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : (
          <span />
        )}
        {maxLength && type === "textarea" && (
          <p className="text-deep-violet/40 text-xs">
            {value.length} / {maxLength} caractères
          </p>
        )}
      </div>
    </div>
  );
}
