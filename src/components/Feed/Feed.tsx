import HeaderWrapper from "../Header/HeaderWrapper.tsx";
import FeedCard from "../FeedCard/FeedCard.tsx";
import styles from './Feed.module.less'
import {useEffect } from "react";
import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {fetchIngredients} from "../../services/IngredientsSlice.ts";
import {connect, disconnect} from "../../services/HistoryListSlice.ts";

const Feed = () => {

    const {total, today, ordersList, successId, inProgressId} = useAppSelector(state => state.HistoryList);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(connect(
            {
                url: 'wss://norma.nomoreparties.space/orders/all',
            }
        ))

        return () => {
            dispatch(disconnect());
        };
    }, [])

    return (
        <>
            <HeaderWrapper/>
            <div className="container">
                <div className={styles.feed__wrap}>
                    <p className="text text_type_main-large mb-6">Лента заказов</p>
                    <div className={styles.feed__row}>
                        <div className={styles.feed__list}>
                            {
                                ordersList && ordersList.map(item => {
                                    return (
                                        <FeedCard
                                            key={item.number}
                                            number={item.number}
                                            name={item.name}
                                            date={item.date.toString()}
                                            ingredients={item.ingredients}
                                            createdAt={item.createdAt}
                                        />
                                    )
                                })

                            }
                        </div>
                        <div className={styles.feed__info}>
                            <div className={styles.feed__orders}>
                                <div className="feed__success">
                                    <p className="text text_type_main-default mb-6">Готовы:</p>
                                    {successId && successId.map((item, index) => {
                                        return (
                                            <p className={'text text_type_main-default ' + styles.text_success}
                                               key={index}>{item}</p>
                                        )
                                    })}

                                </div>
                                <div className="feed__inprogress">
                                    <p className="text text_type_main-default mb-6">В работе:</p>
                                    {
                                        inProgressId && inProgressId.map((item, index) => {
                                            return (
                                                item !== 0 &&
                                                <p className={'text text_type_main-default'} key={index}>{item}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="feed__total mb-15">
                                <p className="text text_type_main-default">Выполнено за все время:</p>
                                <p className="text text_type_digits-large">{total}</p>
                            </div>
                            <div className="feed__today">
                                <p className="text text_type_main-default">Выполнено за сегодня:</p>
                                <p className="text text_type_digits-large">{today}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feed;