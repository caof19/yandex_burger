import style from './IngredientDetails.module.less';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const {img, name, info} = useSelector(state => state.IngredientsDetails.modalInfo)

  return (
    <div className={style.info}>
      <p className="text text_type_main-large">Детали ингредиента</p>

      <div className={style.img}>
        <img src={img} alt={name} />
      </div>
      <p className={"text text_type_main-small "+style.name}>
        {name}
      </p>
      <div className={style.list}>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Калории,ккал</div>
          <div className="text text_type_digits-default text_color_inactive">{info.calories}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Белки, г</div>
          <div className="text text_type_digits-default text_color_inactive">{info.proteins}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Жиры, г</div>
          <div className="text text_type_digits-default text_color_inactive">{info.fat}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Углеводы, г</div>
          <div className="text text_type_digits-default text_color_inactive">{info.carbohydrates}</div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;