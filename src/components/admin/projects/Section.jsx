export function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
