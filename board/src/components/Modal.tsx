import { ReactNode } from 'react'
import ReactModal from 'react-modal'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
}

function Modal({ isOpen, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      portalClassName="modal-portal"
      overlayClassName="modal-overlay"
      className="modal"
    >
      {children}
    </ReactModal>
  )
}

export default Modal
