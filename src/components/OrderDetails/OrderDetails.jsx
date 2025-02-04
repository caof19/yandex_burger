import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderDetails.module.less';
import PropTypes from "prop-types";

const OrderDetails = ({orderId}) => {
  return (
    <div className={style.order}>
      <p className="text text_type_digits-large">{orderId}</p>
      <p className={"text text_type_main-medium "+style.ident}>идентификатор заказа</p>
      <div className={style.success}>
        <CheckMarkIcon type="primary"/>
      </div>
      <p className={"text text_type_main-small "+style.start}>Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired
}
export default OrderDetails;