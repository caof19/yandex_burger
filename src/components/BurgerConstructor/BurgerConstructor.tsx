import AssembleCard from '../AssembleCard/AssembleCard'
import style from './BurgerConstructor.module.less'
import AssembleTotal from "../AssembleTotal/AssembleTotal";
import {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import {addIngredientToMenu, changeBun} from "../../services/BurgerConstructorSlice";
import {useIngredient, resetIngredient} from "../../services/IngredientsSlice";
import {nanoid} from "@reduxjs/toolkit";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {TProduct} from "../../utils/types";


const BurgerConstructor = () => {
  const bun = useAppSelector(state => state.BurgerConstructor.bun);
  const ingredients = useAppSelector(state => state.BurgerConstructor.main);
  const dispatch = useAppDispatch();


  const [cart, setCart] = useState<TProduct[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TProduct) {
          if(item.type === 'bun') {
            dispatch(changeBun({bun: item}))
            if(bun._id !== item._id) {
              dispatch(resetIngredient({id: bun._id}))
              dispatch(useIngredient({id: item._id}))
            }
          } else {
            if (bun._id !== '') {
              dispatch(addIngredientToMenu(item))
              dispatch(useIngredient({id: item._id}))
            } else {
              alert('Сначала добавьте булочку!')
            }
          }
        },
    });

  useEffect(() => {
    if(bun._id === '') {
      setCart([])
      return;
    }
    let topBun = {...bun};
    let bothBun = {...bun};

    topBun.locked = true;
    topBun.type = 'top';
    topBun.mainId = nanoid();
    topBun.name += ' (верх)'

    bothBun.locked = true;
    bothBun.type = 'bottom';
    bothBun.mainId = nanoid();
    bothBun.name += ' (низ)'

    setCart([
      {...topBun},
        ...ingredients,
      {...bothBun}
    ])

  }, [bun, ingredients]);

  useEffect(() => {
    let total = cart.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0)

    setTotalPrice(total);
  }, [cart]);

  return (
    <div className={style.assemble} ref={dropTarget} data-assambler="">
      <div className={style.list}>
        {cart.length > 0 && cart.map((item:TProduct, index) => (
            <AssembleCard
              type={item.type}
              isLocked={item.locked ?? false}
              text={item.name ?? ''}
              price={item.price}
              thumbnail={item.image_mobile ?? ''}
              key={item.mainId}
              ingredientsIndex={index - 1}
              mainId={item.mainId}
              id={item._id ?? ''}
              _id={item._id ?? ''}
            />
        ))}
      </div>
      <AssembleTotal totalPrice={totalPrice}/>
    </div>
  )
}

export default BurgerConstructor;