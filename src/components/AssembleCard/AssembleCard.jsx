import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleCard.module.less';
import PropTypes from 'prop-types';
import {
  removeIngredient,
  reorderIngredients
} from "../../services/BurgerConstructorSlice.js";
import {unUseIngredient} from "../../services/IngredientsSlice.js";
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from "react-dnd";

const AssembleCard = (props) => {

  const dispatch = useDispatch();

  const deleteFromCart = (id) => {
    dispatch(removeIngredient({id}))
    dispatch(unUseIngredient({id: props.id}))
  }

  const replaceIngredientsOrder = (id, replaceToId) => {
    dispatch(reorderIngredients({id, replaceToId}))
  }

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredientIsUsed',
    item: props,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  const [{isHover}, dropTarget] = useDrop({
        accept: "ingredientIsUsed",
        drop({ingredientsIndex}) {
          replaceIngredientsOrder(ingredientsIndex, props.ingredientsIndex)
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

  return (
    <div className={
      style.item + ' ' +
      (isDrag && style.item_drag) + ' ' +
      (isHover && style.item_hover)
    } draggable ref={dragRef}>
      <div ref={dropTarget}>
        {!props.isLocked &&
          <div className={style.icon}>
            <DragIcon type="primary"/>
          </div>
        }
        <ConstructorElement
          {...props}
          handleClose={() => deleteFromCart(props.mainId)}
        />
      </div>
    </div>
  )
}

AssembleCard.propTypes = {
  text: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  type: PropTypes.oneOf(['top', 'bottom', 'main']),
  isLocked: PropTypes.bool,
  mainId: PropTypes.string,
  ingredientsIndex: PropTypes.number,
  id: PropTypes.string,
}

export default AssembleCard;