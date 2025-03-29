import style from './IngredientsCard.module.less';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux'
import { openModal } from "../../services/IngredientDetailsSlice";
import { useDrag } from "react-dnd";
import {useNavigate} from "react-router-dom";
import {FC} from "react";
import {TProduct} from "../../utils/types";

const IngredientsCard : FC<TProduct> = (product) => {
  const dispatch = useDispatch();
  const {current, image, price, name} = product;
  const navigate = useNavigate();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: product,
  });

  const cardClick = () => {
    dispatch(openModal(product))
    navigate('/ingredients/' + product._id, {state: {showInModal: true}})
  }

  return (
    <div className={style.item} ref={dragRef}>
      <div className="wrapper" onClick={cardClick}>
        {!!current && current > 0 && (
            <div className={"text text_type_digits-default " + style.current}>
              {current}
            </div>
          )
        }
        <div className={style.img}>
          <img src={image} alt={name} />
        </div>
        <div className={style.price}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={"text text_type_main-default " + style.name}>{name}</p>
      </div>
    </div>
  )
}
export default IngredientsCard;