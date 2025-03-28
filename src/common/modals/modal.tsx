import {FC, ReactNode, useEffect, useRef} from 'react';
import { Modal } from 'bootstrap';

interface BootstrapModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const BootstrapModal: FC<BootstrapModalProps> = ({ id, isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bsModalRef = useRef<Modal | null>(null);

  useEffect(() => {
    if (modalRef.current && !bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });

      // Attach the close listener only once
      modalRef.current.addEventListener('hidden.bs.modal', onClose);
    }

    return () => {
      if (modalRef.current) {
        console.log('removing')
        modalRef.current.removeEventListener('hidden.bs.modal', onClose);
      }
    };
  }, [onClose]);

  useEffect(() => {
    if (bsModalRef.current) {
      if (isOpen) {
        bsModalRef.current.show();
      } else {
        bsModalRef.current.hide();
      }
    }
  }, [isOpen]);

  return (
    <div id={id} className="modal fade" tabIndex={-1} ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
