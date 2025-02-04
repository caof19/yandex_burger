import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleTotal.module.less'
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import {useState} from "react";
import PropTypes from "prop-types";

const AssembleTotal = ({totalPrice}) => {

  const [modalActive, setModalActive] = useState(false);

  const toggleOrderShow = () => {
    setModalActive(!modalActive);
  }

  return (
    <div className={style.total}>
      <div className="val">
        <span className="text text_type_digits-medium">{!isNaN(totalPrice) && totalPrice}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={toggleOrderShow}>
        Оформить заказ
      </Button>
      {
        modalActive &&
        <Modal closeCallback={toggleOrderShow}>
          <OrderDetails orderId={'034536'}/>
        </Modal>
      }
    </div>
  )
}

AssembleTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}
export default AssembleTotal;