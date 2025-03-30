import {useEffect, useState} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './FeedDetail.module.less';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../services/store";
import {useParams} from "react-router-dom";
import {fetchOrder, setFormatedIngredients} from "../../services/FeedDetailSlice";
import {fetchIngredients} from "../../services/IngredientsSlice.ts";
import {TOrderIngredients} from "../../utils/types.ts";

const FeedDetail = () => {
    const {id} = useParams();
    const dispacth = useAppDispatch();

    const [total, setTotal] = useState(0);

    const {
        number,
        name,
        status,
        ingredients,
        date,
        formatIngredients
    } = useSelector(((state: RootState) => state.FeedDetail.info))
    const items = useSelector((state: RootState) => state.Ingredients.ingredients)


    useEffect(() => {
        dispacth(fetchIngredients())
    }, [])

    useEffect(() => {
        if (id && items.length) {
            dispacth(fetchOrder(Number(id)))
        }
    }, [items]);

    useEffect(() => {
        const formatIngredients: TOrderIngredients[] | undefined = [];
        if (ingredients.length && items.length) {
            let totalPrice = 0;

            ingredients.map(item => {
                const product = items.find(product => product._id === item)
                if (product) {
                    const img = product.image_mobile ?? '';
                    const activeProduct = formatIngredients.find(ingr => ingr._id === product._id);

                    if (activeProduct && activeProduct.count) {
                        activeProduct.count += 1;
                    } else {
                        formatIngredients.push({
                            _id: product._id,
                            img,
                            price: product.price,
                            count: 1,
                            name: product.name,
                        })
                    }
                    if(product) {
                        totalPrice += product.price;
                    }
                }
            })

            setTotal(totalPrice);

            dispacth(setFormatedIngredients(formatIngredients))
        }
    }, [ingredients]);

    return (
        <>
            <p className={"text text_type_main-default mb-10 " + styles.title}>#{number}</p>
            <p className="text text_type_main-medium mb-3">{name}</p>
            <p className="text text_type_main-default mb-15">{status}</p>
            <p className="text text_type_main-medium mb-15">Состав:</p>
            <div className={styles.feed__list}>
                {formatIngredients && formatIngredients.map((item, index) => {
                    return (
                        <div className={styles.feed__item} key={index}>
                            <div className={styles.feed__img}>
                                <img src={item.img} alt=""/>
                            </div>
                            <div className={styles.feed__head}>
                                <p className="text text_type_main-default">{item.name}</p>
                            </div>
                            <div className={styles.feed__price}>
                                <p className="text text_type_main-default">{item.count} x {item.price}</p>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.feed__both}>
                <div className="feed__date">
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(date)}/>
                    </p>
                </div>
                <div className={styles.feed__price}>
                    <p className="text text_type_main-default">{total}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </>
    )
}

export default FeedDetail;