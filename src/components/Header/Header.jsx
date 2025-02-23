import styles from './Header.module.less';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.js";

const Header = ({menu}) => {

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.menu}>
            {
              menu.map((item, index) => {
                const iconType = item.isActive ? 'primary' : 'secondary';
                return (
                  <NavLink to={item.href} className={({isActive}) => isActive ? styles.item_active + ' ' +styles.item : styles.item}key={index}>
                    {item.icon === 'burger' && <BurgerIcon type={iconType}/>}
                    {item.icon === 'list' && <ListIcon type={iconType}/>}
                    <p className={"text text_type_main-default " + (
                      !item.isActive ? 'text_color_inactive' : ''
                    )}>
                      {item.name}
                    </p>
                  </NavLink>
                )
              })
            }

          </div>
          <Logo/>
          <NavLink to={PAGE_URI.profile} className={({isActive}) => isActive ? styles.item_active + ' ' +styles.item : styles.item}>
            <ProfileIcon type="secondary"/>
            <p className="text text_type_main-default">Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
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