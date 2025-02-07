import {CurrencyIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import AssembleCard from '../AssembleCard/AssembleCard.jsx'
import style from './BurgerConstructor.module.less'
import AssembleTotal from "../AssembleTotal/AssembleTotal.jsx";
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import {addIngredientToMenu, changeBun} from "../../services/BurgerConstructorSlice.js";
import {useIngredient, resetIngredient} from "../../services/IngredientsSlice.js";
import {nanoid} from "@reduxjs/toolkit";


const BurgerConstructor = () => {
  const bun = useSelector(state => state.BurgerConstructor.bun);
  const ingredients = useSelector(state => state.BurgerConstructor.main);
  const dispatch = useDispatch();


  const [cart, setCart] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
          if(item.type === 'bun') {
            dispatch(changeBun({bun: item}))
            if(bun._id !== item._id) {
              dispatch(resetIngredient({id: bun._id}))
              dispatch(useIngredient({id: item._id}))
            }
          } else {
            dispatch(addIngredientToMenu({item}))
            if (bun._id !== undefined) {
              dispatch(useIngredient({id: item._id}))
            } else {
              alert('Сначала добавьте булочку!')
            }
          }
        },
    });

  useEffect(() => {
    if(bun._id === undefined) {
      setCart([])
      return;
    }
    let topBun = {...bun};
    let bothBun = {...bun};

    topBun.locked = true;
    topBun.type = 'top';
    topBun.mainId = nanoid();

    bothBun.locked = true;
    bothBun.type = 'bottom';
    bothBun.mainId = nanoid();

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
    <div className={style.assemble} ref={dropTarget}>
      <div className={style.list}>
        {cart.length > 0 && cart.map((item, index) => (
            <AssembleCard
              type={item.type}
              isLocked={item.locked}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              key={item.mainId}
              ingredientsIndex={index - 1}
              mainId={item.mainId}
              id={item._id}
            />
        ))}
      </div>
      <AssembleTotal totalPrice={totalPrice}/>
    </div>
  )
}

export default BurgerConstructor;