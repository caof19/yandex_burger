import Header from "./components/Header/Header.jsx";
import Ingredients from "./components/Ingredients/Ingredients.jsx";
import Assemble from "./components/Assemble/Assemble.jsx";

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
            <Ingredients />
            <Assemble />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
