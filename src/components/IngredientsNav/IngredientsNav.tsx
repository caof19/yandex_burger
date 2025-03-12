import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from "./IngredientsNav.module.less";
import {FC} from "react";
import {TNavIngredient} from "../../utils/types";

const IngredientsNav: FC<TNavIngredient>= ({menu, onClick}) => {

  return (
    <div className={style.nav}>
      {
        menu && Object.keys(menu).map(slug => (
          <Tab
            value={slug}
            key={'nav'+slug}
            active={menu[slug].isActive}
            data-start-category={slug}
            onClick={onClick}
          >
            {menu[slug].name}
          </Tab>
        ))
      }
    </div>
  )
}

export default IngredientsNav;