import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleTotal.module.less'
import { useDispatch, useSelector } from 'react-redux';
import {fetchOrder} from "../../services/OrderDetailsSlice.js";
import PropTypes from "prop-types";
import {clearCart} from "../../services/BurgerConstructorSlice.js";
import {resetAllIngredients} from "../../services/IngredientsSlice.js";
import {useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.js";
import {setLastURL} from "../../services/UserSlice.js";

const AssembleTotal = ({totalPrice}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const products = useSelector(state => state.BurgerConstructor.main);
  const bun = useSelector(state => state.BurgerConstructor.bun);

  const toggleOrderShow = () => {
    const productIds = products.map(product => product._id);
    productIds.unshift(bun._id)
    productIds.push(bun._id)

    if(!localStorage.getItem('accessToken')) {
      alert('Авторизуйтесь');
      navigate(PAGE_URI.login)
      dispatch(setLastURL('/'))
      return;
    }


    if(bun._id !== undefined) {
      dispatch(fetchOrder({"ingredients": productIds}));
      dispatch(clearCart());
      dispatch(resetAllIngredients());
    } else {
      alert('Бургер не собран!');
    }
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