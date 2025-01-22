import IngredientsCard from "../IngredientsCard/IngredientsCard.jsx";
import style from "./IngredientsCategory.module.less";
import {useState} from "react";
import PropTypes from "prop-types";

const IngredientsCategory = ({slug, categoryName, products}) => {

  return (
    <div className={style.list} data-category={slug}>
      <div className="category">
        <div className="head text text_type_main-medium">{categoryName}</div>
        <div className={style.items}>
          {products.map((product) => (
            <div key={'product_'+product._id}>
              <IngredientsCard
                {...product}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

IngredientsCategory.propType = {
  slug: PropTypes.string,
  categoryName: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }))
}

export default IngredientsCategory;