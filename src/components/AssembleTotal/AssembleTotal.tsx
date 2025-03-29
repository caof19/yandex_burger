import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleTotal.module.less'
import { useSelector } from 'react-redux';
import {fetchOrder} from "../../services/OrderDetailsSlice";
import {clearCart} from "../../services/BurgerConstructorSlice";
import {resetAllIngredients} from "../../services/IngredientsSlice";
import {useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const";
import {setLastURL} from "../../services/UserSlice";
import {RootState, useAppDispatch} from "../../services/store";
import {TProduct} from "../../utils/types";
import {FC} from "react";

const AssembleTotal: FC<{totalPrice:number}> = ({totalPrice}) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const products:TProduct[] = useSelector((state: RootState) => state.BurgerConstructor.main);
  const bun:TProduct = useSelector((state: RootState) => state.BurgerConstructor.bun);

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


    if(bun._id !== '') {
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
export default AssembleTotal;