import { Plus, Trash2 } from "lucide-react";

export default function ArrayInputField({
  label,
  values = [],
  onChange,
  placeholder = "Enter value",
  max = 20,
}) {
  const handleChange = (index, value) => {
    const updated = [...values];
    updated[index] = value;
    onChange(updated);
  };

  const addField = () => {
    if (values.length >= max) return;
    onChange([...values, ""]);
  };

  const removeField = (index) => {
    const updated = [...values];
    updated.splice(index, 1);
    onChange(updated.length ? updated : [""]);
  };

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </p>
      )}

      {values.map((value, index) => (
        <div key={index} className="flex items-center gap-3">

          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={placeholder}
            className="
            flex-1
            px-4 py-2
            rounded-lg
            border border-[var(--border)]
            bg-[var(--bg-soft)]
            text-[var(--text-primary)]
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--primary)]
            "
          />

          {values.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(index)}
              className="
              p-2
              rounded-md
              hover:bg-red-500/10
              text-red-500
              transition
              "
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="
        flex items-center gap-2
        text-sm
        px-3 py-2
        rounded-lg
        border border-dashed
        border-[var(--border)]
        hover:bg-[var(--bg-soft)]
        transition
        "
      >
        <Plus size={14} />
        Add {label}
      </button>
    </div>
  );
}