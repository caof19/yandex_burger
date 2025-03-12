import IngredientDetails from "./IngredientDetails";
import Modal from "../Modal/Modal";
import HeaderWrapper from "../Header/HeaderWrapper";

const IngredientDetailClear = () => {
  return (
    <>
      <HeaderWrapper />
      <Modal hideClose hideOverlay>
        <IngredientDetails />
      </Modal>
    </>
  )
}

export default IngredientDetailClear;