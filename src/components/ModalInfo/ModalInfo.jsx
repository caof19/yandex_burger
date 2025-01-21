import style from './ModalInfo.module.less';
import PropTypes from "prop-types";

const ModalInfo = ({image, name, proteins, calories, fat, carbohydrates}) => {
  return (
    <div className={style.info}>
      <p className="text text_type_main-large">Детали ингредиента</p>

      <div className="img" style={{textAlign: "center", marginBottom: "16px"}} >
        <img src={image} alt="" />
      </div>
      <p className="text text_type_main-small" style={{textAlign: 'center'}}>
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

ModalInfo.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  proteins: PropTypes.string,
  calories: PropTypes.string,
  fat: PropTypes.string,
  carbohydrates: PropTypes.string,
}

export default ModalInfo;