import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const IngredientsNav = ({menu, onClick}) => {

  return (
    <div style={{display: 'flex', paddingBottom: 24}}>
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

IngredientsNav.propTypes = {
  menu: PropTypes.objectOf(PropTypes.shape({
    isActive: PropTypes.bool,
    name: PropTypes.string,
  })),
  onClick: PropTypes.func,
}

export default IngredientsNav;