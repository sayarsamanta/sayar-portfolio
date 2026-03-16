export const Input = ({ error, className = "", ...props }) => {
  return (
    <div>
      <input {...props} className={`input-glass w-full px-4 py-2 rounded-sm $ ${className}`} />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
