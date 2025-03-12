import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.less'
import {FC, useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {TModal} from "../../utils/types";

const modalRoot = document.getElementById("modals");

const Modal : FC<TModal> = ({children, onCloseModal, hideClose, hideOverlay})=> {

  useEffect(() => {
    const handleEscPress = (e:KeyboardEvent) => {
      if (e.key === 'Escape' && typeof close === 'function' && onCloseModal) {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [onCloseModal]);

   if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
      <div className={style.modal + ' ' + (hideOverlay ? style.modal_clear : '')}>
        {!hideOverlay && onCloseModal && <ModalOverlay closeCallback={onCloseModal}/>}
        <div className={style.body + ' ' + (hideOverlay ? style.body_clear : '')}>
          {!hideClose && <div className={style.close} onClick={onCloseModal}>
            <CloseIcon type="primary"/>
          </div>}
          {children}
        </div>
      </div>
    ,
    modalRoot
  )
}
export default Modal;