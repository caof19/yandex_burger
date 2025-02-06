import style from './IngredientsCard.module.less';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from "../../services/IngredientDetailsSlice.js";
import { useDrag } from "react-dnd";

const IngredientsCard = (product) => {
  const dispatch = useDispatch();
  const {current, image, price, name, type} = product;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: product,
  });

  return (
    <div className={style.item} ref={dragRef}>
      <div className="wrapper" onClick={() => {dispatch(openModal(product))}}>
        {current > 0 && (
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

IngredientsCard.propTypes = {
  current: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
}
export default IngredientsCard;