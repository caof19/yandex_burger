import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleCard.module.less';
import PropTypes from 'prop-types';

const AssembleCard = (props) => {
  return (
    <div className={style.item}>

      {!props.isLocked &&
        <div className={style.icon}>
          <DragIcon type="primary"/>
        </div>
      }
      <ConstructorElement
        {...props}
        handleClose={props.deleteProduct}
      />
    </div>
  )
}

AssembleCard.propTypes = {
  text: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  type: PropTypes.oneOf(['top', 'bottom', 'main']),
  isLocked: PropTypes.bool,
  deleteProduct: PropTypes.func.isRequired
}

export default AssembleCard;