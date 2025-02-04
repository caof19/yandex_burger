import style from './IngredientsCard.module.less';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import {useState} from "react";

const IngredientsCard = (product) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const {current, image, price, name} = product;

  const toggleInfoIngredient = () => {
    setIsModalActive(!isModalActive);
  }


  return (
    <div className={style.item} >
      <div className="wrapper" onClick={toggleInfoIngredient}>
        {current &&
          <div className={"text text_type_digits-default " + style.current}>
            {current}
          </div>
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
      {
        isModalActive &&
        <Modal
          active={isModalActive}
          closeCallback={toggleInfoIngredient}
        >
          <IngredientDetails
            {...product}
          />
        </Modal>
      }
    </div>
  )
}

IngredientsCard.propTypes = {
  current: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  clickCallback: PropTypes.func,
  proteins: PropTypes.number,
  calories: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
}
export default IngredientsCard;