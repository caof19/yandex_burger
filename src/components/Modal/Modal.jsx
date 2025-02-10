import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.less'
import {useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import { useSelector, useDispatch } from 'react-redux';
import {closeModal} from "../../services/IngredientDetailsSlice.js";
import {closeOrderModal} from "../../services/OrderDetailsSlice.js";

const modalRoot = document.getElementById("modals");

const Modal = ({children, onCloseModal}) => {


  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === 'Escape' && typeof close === 'function') {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [onCloseModal]);

  return ReactDOM.createPortal(
      <div className={style.modal}>
        <ModalOverlay closeCallback={onCloseModal}/>
        <div className={style.body}>
          <div className={style.close} onClick={onCloseModal}>
            <CloseIcon type="primary"/>
          </div>
          {children}
        </div>
      </div>
    ,
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}
export default Modal;