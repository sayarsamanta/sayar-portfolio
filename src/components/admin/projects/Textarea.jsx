export function Textarea({ error, ...props }) {
  return (
    <div>
      <textarea {...props} rows={4} className="input-glass w-full resize-none" />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
