import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Modal from "../../components/Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import {useDispatch, useSelector} from 'react-redux'
import {closeModal, openModal} from "../../services/IngredientDetailsSlice";
import {closeOrderModal} from "../../services/OrderDetailsSlice";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {RootState} from "../../services/store";

function List() {
  const {isActiveIngredients} = useSelector((state:RootState) => state.IngredientsDetails.modalInfo);
  const {isActiveOrderDetail} = useSelector((state:RootState) => state.OrderDetails.modalInfo);
  const {ingredients} = useSelector((state:RootState) => state.Ingredients)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if(id && ingredients) {
      const activeIngredient = ingredients.find(item => item._id === id);

      if(activeIngredient) {
        dispatch(openModal(activeIngredient));
      }
    }
  }, [ingredients])

  const turnOffModal = () => {
    dispatch(closeModal(''));
    navigate(-1);
  }
  const turnOffModalOrder = () => {
    dispatch(closeOrderModal(''));
  }

  return (
    <>
      <HeaderWrapper />
      <main className="main">
        <div className="container">
          <div className="main__row">
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
            { isActiveIngredients &&
              <Modal onCloseModal={turnOffModal}>
                <IngredientDetails />
              </Modal>
            }
            { isActiveOrderDetail &&
              <Modal onCloseModal={turnOffModalOrder}>
                <OrderDetails/>
              </Modal>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default List;
