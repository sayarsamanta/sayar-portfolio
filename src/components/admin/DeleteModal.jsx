import { createPortal } from "react-dom";
import { X, Trash2 } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className=" rounded-2xl p-6 w-full max-w-sm shadow-xl relative"
        style={{ background: "var(--gradient-bg)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <div className="flex justify-center mb-4">
          <Trash2 size={40} className="text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">Confirm Delete</h2>
        <p className="text-sm text-center text-[var(--text-muted)] mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
