import HeaderWrapper from "../Header/HeaderWrapper.tsx";
import FeedCard from "../FeedCard/FeedCard.tsx";
import styles from './Feed.module.less'
import {useSocket} from '../../utils/useSocket.ts'
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../services/store.ts";
import {setInProgress, setSuccess, setToday, setTotal, setOrdersInfo} from "../../services/FeedSlice.ts";
import {TOrderInfo} from '../../utils/types'
import {fetchIngredients} from "../../services/IngredientsSlice.ts";
import {formatOrders} from "../../utils/functions.ts"

const Feed = () => {

    const orders = useSelector((state: RootState) => state.FeedSlice);
    const {ingredients} = useSelector((state: RootState) => state.Ingredients)
    const dispatch = useAppDispatch();

    const ws = useSocket('wss://norma.nomoreparties.space/orders/all', {
        onMessage: msg => {
            const {total, totalToday, orders} = JSON.parse(msg.data)

            dispatch(setTotal({total}))
            dispatch(setToday({today: totalToday}))
            dispatch(setSuccess({successId: getSuccessIds(orders)}))
            dispatch(setInProgress({inProgressId: getInProgressIds(orders)}))
            dispatch(setOrdersInfo({orders: formatOrders(orders, ingredients)}))
        }
    });

    const filterIds = (orders: TOrderInfo[], status: string) => {
        return orders.map((item: TOrderInfo) => {
            if (item.status === status) {
                return item.number;
            }
        })
    }
    const getSuccessIds = (orders: TOrderInfo[]) => {
        return filterIds(orders, 'done')
    }

    const getInProgressIds = (orders: TOrderInfo[]) => {
        return filterIds(orders, 'pending')
    }

    useEffect(() => {
        dispatch(fetchIngredients());
        ws.connect();
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
                                orders.orders.info && orders.orders.info.map(item => {
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
                                    {orders.successId.map((item, index) => {
                                        return (
                                            <p className={'text text_type_main-default ' + styles.text_success}
                                               key={index}>{item}</p>
                                        )
                                    })}

                                </div>
                                <div className="feed__inprogress">
                                    <p className="text text_type_main-default mb-6">В работе:</p>
                                    {
                                        orders.inProgressId.map((item, index) => {
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
                                <p className="text text_type_digits-large">{orders.orders.total}</p>
                            </div>
                            <div className="feed__today">
                                <p className="text text_type_main-default">Выполнено за сегодня:</p>
                                <p className="text text_type_digits-large">{orders.orders.today}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feed;