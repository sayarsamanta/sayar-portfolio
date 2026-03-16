import { Plus, Trash2 } from "lucide-react";
import { Input } from "./Input";
import { Section } from "./Section";

export function DynamicList({
  title,
  field,
  form,
  handleArrayChange,
  addArrayField,
  removeArrayField,
  errors,
}) {
  return (
    <Section title={title}>
      <div className="space-y-3">
        {" "}
        {/* Added spacing between rows */}
        {form[field].map((item, index) => (
          <div key={index} className="flex gap-3 items-center w-full">
            {/* Added className="flex-1" here */}
            <div className="flex-1">
              <Input
                name={field}
                value={item}
                onChange={(e) => handleArrayChange(index, field, e.target.value)}
                error={errors?.[field]} // Use dynamic field key
                placeholder={`Enter ${title.toLowerCase()}...`}
              />
            </div>

            <button
              type="button"
              onClick={() => removeArrayField(index, field)}
              className="text-red-400 hover:text-red-500 transition-colors pt-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => addArrayField(field)}
        className="flex items-center gap-2 text-sm text-[var(--primary)] mt-4 font-medium"
      >
        <Plus size={14} /> Add {title}
      </button>
    </Section>
  );
}
