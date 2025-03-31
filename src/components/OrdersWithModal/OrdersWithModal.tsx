import FeedDetail from "../FeedDetail/FeedDetail.tsx";
import Modal from "../Modal/Modal"
import {useNavigate} from "react-router-dom";
import Orders from "../Orders/Orders.tsx";
import HeaderWrapper from "../Header/HeaderWrapper.tsx";

const OrdersWithModal = () => {
    const navigate = useNavigate();
    const onCloseModal = () => {
        navigate(-1)
    }

    return (
        <>
            <HeaderWrapper/>
            <Orders />
            <Modal onCloseModal={onCloseModal}>
                <FeedDetail />
            </Modal>
        </>
    );
}

export default OrdersWithModal;