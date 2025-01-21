import styles from './Header.module.less';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Header = ({menu}) => {

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.row}>
            <div className={styles.menu}>
              {
                menu.map((item, index) => {
                  const iconType = item.isActive ? 'primary' : 'secondary';
                  return (
                  <div className={styles.item} key={index}>
                    {item.icon === 'burger' && <BurgerIcon type={iconType}/>}
                    {item.icon === 'list' && <ListIcon type={iconType}/>}
                    <p className={"text text_type_main-default " + (
                      !item.isActive ? 'text_color_inactive' : ''
                    )}>
                      {item.name}
                    </p>
                    <a href="" className="full"></a>
                  </div>
                  )})
              }

            </div>
            <Logo />
            <div className={styles.item}>
              <ProfileIcon type="secondary"/>
              <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
Header.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    isActive: PropTypes.bool,
    href: PropTypes.string,
  })),
}
export default Header;