import styles from './Header.module.less';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {PAGE_URI} from "../../utils/const";
import {THeader} from "../../utils/types";
import {FC} from "react";

const Header:FC<THeader> = ({menu}) => {

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
export default Header;