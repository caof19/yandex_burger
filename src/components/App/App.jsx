import Header from "..//Header/Header.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";

function App() {

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
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
