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
        {form[field].map((item, index) => (
          <div key={index} className="flex gap-3 items-start w-full">
            {/* Input container takes exactly 80% */}
            <div className="flex-[0_0_95%]">
              <Input
                name={field}
                value={item}
                onChange={(e) => handleArrayChange(index, field, e.target.value)}
                error={errors?.[field]}
                placeholder={`Enter ${title.toLowerCase()}...`}
                className="w-full"
              />
            </div>

            {/* Button container takes exactly 20% and centers the icon */}
            <div className="flex-[0_0_5%] flex items-center justify-center min-h-[42px]">
              {/* Only show delete if the item has text OR if there's more than one row */}
              {(item.trim() !== "" || form[field].length > 1) && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, field)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  title={`Remove ${title}`}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => addArrayField(field)}
        className="flex items-center gap-2 text-sm text-[var(--primary)] mt-4 font-medium hover:opacity-80 transition-opacity"
      >
        <Plus size={14} /> Add {title}
      </button>
    </Section>
  );
}
