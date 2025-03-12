import style from "../ModalOverlay/ModalOverlay.module.less";
import {FC} from "react";
import {TModalOverlay} from "../../utils/types";


const ModalOverlay : FC<TModalOverlay>= ({closeCallback}) => {
  if(!closeCallback) {
    return null;
  }
  return <div className={style.bg} onClick={closeCallback}></div>
}
export default ModalOverlay;