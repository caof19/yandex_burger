import {CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './FeedCard.module.less'
import {TOrderInfo} from "../../utils/types.ts";
import {useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.ts";

const FeedCard = ({number, name, date, ingredients}: TOrderInfo) => {
    const navigate = useNavigate()


    const totalPrice = ingredients.reduce((acc, item) => {
        return acc + item.price
    }, 0)

    const openFeedDetail = () => {
        navigate(PAGE_URI.feed+number, {state: {showInModal: true}});
    }

    return (
        <div className={styles.feed__card} onClick={openFeedDetail} key={number}>
            <div className={styles.feed__top}>
                <p className="text text_type_main-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive">

                    <FormattedDate date={new Date(date)}/>
                </p>
            </div>
            <div className="text text_type_main-medium mt-6">{name}</div>
            <div className={styles.feed__both}>
                <div className={styles.feed__ingredients}>
                    {
                        ingredients.map((item, index) => {
                            if(index === 5) {
                                return (
                                    <div className={styles.feed__stuff} key={index}>
                                        <img src={item.img} alt=""/>
                                        { ingredients.length - 6 > 0 &&
                                            <div className={styles.feed__more}>
                                                <p className="text text_type_main-default">+{ingredients.length - 5}</p>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                            if(index > 5) {
                                return ;
                            }
                            return (
                                <div className={styles.feed__stuff} key={index}>
                                    <img src={item.img} alt=""/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'text text_type_main-default '+styles.feed__price}>
                    {totalPrice}
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedCard;