import Header from "..//Header/Header.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import Modal from "../Modal/Modal.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import {useSelector} from 'react-redux'

function App() {
  const {isActiveIngredients} = useSelector(state => state.IngredientsDetails.modalInfo);
  const {isActiveOrderDetail} = useSelector(state => state.OrderDetails.modalInfo);

  return (
    <>
      <Header menu={
        [
          {
            icon: 'burger',
            name: 'Конструктор',
            isActive: true,
            href: '/'
          },
          {
            icon: 'list',
            name: 'Лента заказов',
            isActive: false,
            href: '/list'
          }
        ]
      }/>
      <main className="main">
        <div className="container">
          <div className="main__row">
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
            { isActiveIngredients &&
              <Modal>
                <IngredientDetails />
              </Modal>
            }
            { isActiveOrderDetail &&
              <Modal>
                <OrderDetails/>
              </Modal>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
