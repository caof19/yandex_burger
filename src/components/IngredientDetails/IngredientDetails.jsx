import style from './IngredientDetails.module.less';
import PropTypes from "prop-types";

const IngredientDetails = ({image, name, proteins, calories, fat, carbohydrates}) => {
  return (
    <div className={style.info}>
      <p className="text text_type_main-large">Детали ингредиента</p>

      <div className={style.img}>
        <img src={image} alt={name} />
      </div>
      <p className={"text text_type_main-small "+style.name}>
        {name}
      </p>
      <div className={style.list}>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Калории,ккал</div>
          <div className="text text_type_digits-default text_color_inactive">{calories}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Белки, г</div>
          <div className="text text_type_digits-default text_color_inactive">{proteins}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Жиры, г</div>
          <div className="text text_type_digits-default text_color_inactive">{fat}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Углеводы, г</div>
          <div className="text text_type_digits-default text_color_inactive">{carbohydrates}</div>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  proteins: PropTypes.number,
  calories: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
}

export default IngredientDetails;