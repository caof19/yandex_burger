import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleTotal.module.less'
import { useDispatch, useSelector } from 'react-redux';
import {fetchOrder} from "../../services/OrderDetailsSlice.js";
import PropTypes from "prop-types";

const AssembleTotal = ({totalPrice}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.BurgerConstructor.main);
  const bun = useSelector(state => state.BurgerConstructor.bun);

  const toggleOrderShow = () => {
    const productIds = products.map(product => product._id);
    productIds.unshift(bun._id)
    productIds.push(bun._id)

    dispatch(fetchOrder({"ingredients": productIds}))
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
    </div>
  )
}

AssembleTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}
export default AssembleTotal;