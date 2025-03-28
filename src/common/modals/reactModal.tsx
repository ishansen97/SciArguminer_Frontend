import {FC, ReactNode} from "react";
import Modal from "react-bootstrap/Modal";

interface ReactModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

const ReactModal: FC<ReactModalProps> = ({isOpen, onClose, title, children}) => {
	return (
		<Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
	)
}

export default ReactModal;