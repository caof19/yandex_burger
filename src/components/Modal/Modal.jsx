import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.less'
import {useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modals");

const Modal = ({children, closeCallback}) => {

  /*
    тут не совсем уверен что только так можно
    Не придумал как можно избавиться от колбека на закрытие
  */
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === 'Escape' && typeof closeCallback === 'function') {
        closeCallback();
      }
    };

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [closeCallback]);

  return ReactDOM.createPortal(
    (
      <div className={style.modal}>
        <div className={style.bg} onClick={closeCallback}></div>
        <div className={style.body}>
          <div className={style.close} onClick={closeCallback}>
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
  closeCallback: PropTypes.func.isRequired,
}
export default Modal;