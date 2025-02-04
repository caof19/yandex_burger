import {CurrencyIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import AssembleCard from '../AssembleCard/AssembleCard.jsx'
import style from './BurgerConstructor.module.less'
import AssembleTotal from "../AssembleTotal/AssembleTotal.jsx";
import {useEffect, useState} from "react";

const BurgerConstructor = () => {
  const [cart, setCart] = useState([]);
  const [bun, setBun] = useState({});

  const [main, setMain] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setMain([
      {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0
      }
    ])

    setBun(
      {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    })
  }, []);

  useEffect(() => {
    let topBun = {...bun};
    let bothBun = {...bun};

    topBun.locked = true;
    topBun.type = 'top';

    bothBun.locked = true;
    bothBun.type = 'bottom';

    main.map((item, index) => {
      item.mainOrder = index;
      return item;
    })
    setCart([
      {...topBun},
      ...main,
      {...bothBun}
    ])

  }, [bun, main]);

  useEffect(() => {
    let total = cart.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0)

    setTotalPrice(total);
  }, [cart]);

  const deleteFromCart = (id) => {
    let mainCart = main.filter(item => item.mainOrder !== id);


    setMain(mainCart);

    return false;
  }

  return (
    <div className={style.assemble}>
      <div className={style.list}>
        {cart.map((item, index) => (
            <AssembleCard
              type={item.type}
              isLocked={item.locked}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              deleteProduct={() => deleteFromCart(item.mainOrder)}
              key={index}
            />
        ))}
      </div>
      <AssembleTotal totalPrice={totalPrice}/>
    </div>
  )
}

export default BurgerConstructor;