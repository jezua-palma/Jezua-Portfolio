import { useEffect, useRef } from 'react';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const useDialogAccessibility = (isOpen, onClose, dialogRef) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return undefined;

    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const getFocusableElements = () => [...dialog.querySelectorAll(focusableSelector)]
      .filter((element) => element.getClientRects().length > 0);

    document.body.style.overflow = 'hidden';
    const focusableElements = getFocusableElements();
    if (focusableElements.length) focusableElements[0].focus({ preventScroll: true });
    else {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;
      const currentFocusableElements = getFocusableElements();
      if (!currentFocusableElements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = currentFocusableElements[0];
      const last = currentFocusableElements[currentFocusableElements.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [dialogRef, isOpen]);
};

export default useDialogAccessibility;
