import IngredientsCard from "../IngredientsCard/IngredientsCard";
import style from "./IngredientsCategory.module.less";
import {FC} from "react";
import {TIngredientsCategory} from "../../utils/types";

const IngredientsCategory: FC<TIngredientsCategory> = ({slug, categoryName, products}) => {

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

export default IngredientsCategory;