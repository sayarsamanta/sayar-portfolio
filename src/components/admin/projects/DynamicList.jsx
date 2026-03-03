import { Plus, Trash2 } from "lucide-react";
import { Section } from "./Section";

export function DynamicList({
  title,
  field,
  form,
  handleArrayChange,
  addArrayField,
  removeArrayField,
}) {
  return (
    <Section title={title}>
      {form[field].map((item, index) => (
        <div key={index} className="flex gap-3 items-center">
          <input
            value={item}
            onChange={(e) => handleArrayChange(index, field, e.target.value)}
            className="input-glass flex-1"
          />
          <button onClick={() => removeArrayField(index, field)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayField(field)}
        className="flex items-center gap-2 text-sm text-[var(--primary)]"
      >
        <Plus size={14} /> Add {title}
      </button>
    </Section>
  );
}
