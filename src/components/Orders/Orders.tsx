import HeaderWrapper from "../Header/HeaderWrapper.tsx";
import style from "../../pages/profile/index.module.less";
import {NavLink, useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.ts";
import {fetchExit} from "../../services/UserSlice.ts";
import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {useEffect} from "react";
import OrdersCard from "../OrdersCard/OrdersCard";
import {fetchIngredients} from "../../services/IngredientsSlice.ts";
import {connect, disconnect} from "../../services/HistoryListSlice.ts";


const Orders = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {ordersList} = useAppSelector((state => state.HistoryList))
    const exitClick = async () => {

        const result = await dispatch(fetchExit());

        if (fetchExit.fulfilled.match(result)) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate(PAGE_URI.login)
        }
    }

    useEffect(() => {
        dispatch(fetchIngredients());
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(connect(
                {
                    url: 'wss://norma.nomoreparties.space/orders/all',
                    token: token.replace('Bearer ', ''),
                }
            ))
        }

        return () => {
            dispatch(disconnect());
        };

    }, []);

    return (
        <>
            <HeaderWrapper/>
            <main className="main">
                <div className="container">
                    <div className={style.row}>
                        <div className="profile__nav">
                            <NavLink to={PAGE_URI.profile}
                                     className={style.menu_item}>
                                <p className="text text_type_main-medium pb-2">
                                    Профиль
                                </p>
                            </NavLink>
                            <NavLink to={PAGE_URI.orders}
                                     className={({isActive}) => isActive ? style.menu_item_active : style.menu_item}>
                                <p className="text text_type_main-medium pt-2 pb-2">
                                    История заказов
                                </p>
                            </NavLink>
                            <p className={"text text_type_main-medium mb-20 pt-2 pb-2 " + style.menu_item}
                               onClick={exitClick}
                            >
                                Выход
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                В этом разделе вы можете просмотреть свою историю заказов
                            </p>
                        </div>
                        <div className="profile__wrap">
                            {
                                ordersList && ordersList.map(item => {
                                    return (
                                        <OrdersCard
                                            key={item.number}
                                            createdAt={item.date}
                                            number={item.number}
                                            name={item.name}
                                            date={item.date}
                                            ingredients={item.ingredients}
                                            status={item.status}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Orders;