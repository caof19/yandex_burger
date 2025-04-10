import style from './IngredientDetails.module.less';
import {useEffect} from "react";
import {fetchIngredients} from "../../services/IngredientsSlice";
import {loadData} from "../../services/IngredientDetailsSlice";
import {useLocation, useParams} from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../../services/store";
import {TProduct} from "../../utils/types";

const IngredientDetails = () => {
  const {img, name, info} = useAppSelector(state => state.IngredientsDetails.modalInfo)
  const {ingredients} = useAppSelector(state => state.Ingredients);
  const {id} = useParams();
  const location = useLocation();
  const showIngredientInModal = !!(location.state && location.state.showInModal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!showIngredientInModal && !ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    const currentIngredient = ingredients.find((item:TProduct) => item._id === id);

    if(currentIngredient && !showIngredientInModal) {
      dispatch(loadData(currentIngredient));
    }
  }, [ingredients]);


  return (
    <div className={style.info}>
      <p className="text text_type_main-large">Детали ингредиента</p>

      <div className={style.img}>
        <img src={img} alt={name} />
      </div>
      <p className={"text text_type_main-small "+style.name}>
        {name}
      </p>
      <div className={style.list}>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Калории,ккал</div>
          <div className="text text_type_digits-default text_color_inactive">{info.calories}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Белки, г</div>
          <div className="text text_type_digits-default text_color_inactive">{info.proteins}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Жиры, г</div>
          <div className="text text_type_digits-default text_color_inactive">{info.fat}</div>
        </div>
        <div className="item">
          <div className="text text_type_main-small text_color_inactive">Углеводы, г</div>
          <div className="text text_type_digits-default text_color_inactive">{info.carbohydrates}</div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;