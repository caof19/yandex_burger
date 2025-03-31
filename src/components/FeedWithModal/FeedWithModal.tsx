import Feed from "../Feed/Feed.tsx";
import FeedDetail from "../FeedDetail/FeedDetail.tsx";
import Modal from "../Modal/Modal"
import {useNavigate} from "react-router-dom";

const FeedWithModal = () => {
    const navigate = useNavigate();
    const onCloseModal = () => {
        navigate(-1)
    }

    return (
        <>
            <Feed />
            <Modal onCloseModal={onCloseModal}>
                <FeedDetail />
            </Modal>
        </>
    );
}

export default FeedWithModal;