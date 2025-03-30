import HeaderWrapper from "../Header/HeaderWrapper.tsx";
import style from "../../pages/profile/index.module.less";
import {NavLink, useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.ts";
import {fetchExit} from "../../services/UserSlice.ts";
import {RootState, useAppDispatch} from "../../services/store.ts";
import {useSocket} from "../../utils/useSocket.ts";
import {useEffect} from "react";
import {formatOrders} from "../../utils/functions"
import {useSelector} from "react-redux";
import {setOrdersInfo} from "../../services/OrderSlice";
import OrdersCard from "../OrdersCard/OrdersCard";
import {fetchIngredients} from "../../services/IngredientsSlice.ts";


const Orders = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {ingredients} = useSelector((state: RootState) => state.Ingredients)

    const {orders} = useSelector((state:RootState) => state.Orders)
    const exitClick = async () => {

        const result = await dispatch(fetchExit());

        if (fetchExit.fulfilled.match(result)) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate(PAGE_URI.login)
        }
    }

    const ws = useSocket('wss://norma.nomoreparties.space/orders', {
        onMessage: msg => {
            const {orders} = JSON.parse(msg.data)

            dispatch(setOrdersInfo({orders: formatOrders(orders.reverse(), ingredients)}))
        }
    });

    useEffect(() => {
        dispatch(fetchIngredients());
        const token = localStorage.getItem('accessToken');
        if(token) {
            ws.connect(token.replace('Bearer ', ''))
        }

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
                                orders && orders.map(item => {
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