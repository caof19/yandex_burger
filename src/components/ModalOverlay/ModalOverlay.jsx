import style from "../ModalOverlay/ModalOverlay.module.less";
import PropTypes from "prop-types";

const ModalOverlay = ({closeCallback}) => {
  return <div className={style.bg} onClick={closeCallback}></div>
}

ModalOverlay.propTypes = {
  closeCallback: PropTypes.func,
}
export default ModalOverlay;