export function Input({ error, ...props }) {
  return (
    <div>
      <input {...props} className="input-glass w-full" />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
