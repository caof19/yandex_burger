import Header from "./Header";

const HeaderWrapper = () => {

  return (
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
  )
}

export default HeaderWrapper;