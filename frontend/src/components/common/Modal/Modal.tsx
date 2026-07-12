import type { ModalProps } from './Modal.types';
import { Button } from '../Button';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#1E293B] border border-[#334155] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#334155] flex items-center justify-between">
          <h3 className="font-semibold text-lg text-[#F8FAFC]">
            {title || 'Modal Title'}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC]"
            aria-label="Close modal"
          >
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-sm text-[#F8FAFC] overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#334155] bg-[#0F172A]/30 flex items-center justify-end gap-3">
          {footer || (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
