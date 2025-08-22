// React
import { useEffect, useRef } from "react";
// React-DOM
import ReactDOM from "react-dom";
// Icons
import { Close } from "@/icons/components";
// Styles
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  primaryText = "Confirm",
  secondaryText = "Cancel",
  onPrimary,
  onSecondary,
  primaryDisabled,
  secondaryDisabled,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleId = "modal-title";

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="a-modal" aria-modal="true" aria-labelledby={titleId}>
      <button className="a-modal__backdrop" onClick={onClose} />
      <div className="a-modal__content" ref={contentRef}>
        <header className="a-modal__header">
          <h2 id={titleId} className="a-modal__title">
            {title}
          </h2>
          <button
            type="button"
            className="a-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <Close />
          </button>
        </header>

        <div className="a-modal__body">{children}</div>

        <footer className="a-modal__footer">
          <div className="a-modal__actions">
            <button
              type="button"
              className="a-modal__btn"
              onClick={onSecondary ?? onClose}
              disabled={secondaryDisabled}
            >
              {secondaryText}
            </button>
            <button
              type="button"
              className="a-modal__btn a-modal__btn--primary"
              onClick={onPrimary}
              disabled={primaryDisabled}
            >
              {primaryText}
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
