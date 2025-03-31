import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AssembleCard.module.less';
import {
    removeIngredient,
    reorderIngredients
} from "../../services/BurgerConstructorSlice";
import {unUseIngredient} from "../../services/IngredientsSlice";
import {useDrag, useDrop} from "react-dnd";
import {TProduct} from "../../utils/types";
import {FC} from "react";
import {useAppDispatch} from "../../services/store.ts";

const AssembleCard: FC<TProduct> = (props) => {

    const dispatch = useAppDispatch();

    const deleteFromCart = (id: string) => {
        dispatch(removeIngredient({id}))
        dispatch(unUseIngredient({id: props.id}))
    }

    const replaceIngredientsOrder = (id: string, replaceToId: number) => {
        dispatch(reorderIngredients({id, replaceToId}))
    }

    const [{isDrag}, dragRef] = useDrag<TProduct, void, { isDrag: boolean }>({
        type: 'ingredientIsUsed',
        item: props,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{isHover}, dropTarget] = useDrop<
        { ingredientsIndex: string },
        void,
        { isHover: boolean }
    >({
        accept: "ingredientIsUsed",
        drop({ingredientsIndex}: { ingredientsIndex: string }) {
            replaceIngredientsOrder(ingredientsIndex, props.ingredientsIndex)
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const type = (props.type === 'top' || props.type === 'bottom') ? props.type : undefined

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
                    type={type}
                    handleClose={() => deleteFromCart(props.mainId)}
                />
            </div>
        </div>
    )
}

export default AssembleCard;