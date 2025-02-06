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

const Modal = ({children}) => {

  const dispatch = useDispatch();
  const {isActiveIngredients} = useSelector(state => state.IngredientsDetails.modalInfo);
  const {isActiveOrderDetail} = useSelector(state => state.OrderDetails.modalInfo);

  const close = () => {
    dispatch(closeModal());
    dispatch(closeOrderModal());
  }
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === 'Escape' && typeof close === 'function') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [close]);

  return ReactDOM.createPortal(
    (isActiveIngredients || isActiveOrderDetail) && (
      <div className={style.modal}>
        <ModalOverlay closeCallback={close}/>
        <div className={style.body}>
          <div className={style.close} onClick={close}>
            <CloseIcon type="primary"/>
          </div>
          {children}
        </div>
      </div>
    ),
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Modal;