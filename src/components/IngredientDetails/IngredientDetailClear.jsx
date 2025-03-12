import IngredientDetails from "./IngredientDetails.jsx";
import Modal from "../Modal/Modal.jsx";
import HeaderWrapper from "../Header/HeaderWrapper.jsx";

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