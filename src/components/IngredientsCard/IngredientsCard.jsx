import style from './IngredientsCard.module.less';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const IngredientsCard = ({current, img, price, name, id, clickCallback}) => {

  return (
    <div className={style.item} onClick={() => clickCallback(id)}>
      {current &&
        <div className={"text text_type_digits-default " + style.current}>
          {current}
        </div>
      }
      <div className={style.img}>
        <img src={img} alt={name} />
      </div>
      <div className={style.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={"text text_type_main-default " + style.name}>{name}</p>
    </div>
  )
}

IngredientsCard.propTypes = {
  current: PropTypes.number,
  img: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  clickCallback: PropTypes.func,
}
export default IngredientsCard;