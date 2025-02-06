import IngredientsNav from '../IngredientsNav/IngredientsNav.jsx';
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory.jsx";
import styles from "./BurgerIngredients.module.less";
import {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {fetchIngredients} from "../../services/IngredientsSlicer.js";

const BurgerIngredients = () => {

  const dispatch = useDispatch();

  /* Перевод категорий */
  const categoryTranslate = {
    'bun': 'Булки',
    'main': 'Начинки',
    'sauce': 'Соусы',
  }

  /* состояние для ингредиентов */
  /* состояние, потому что нужно отслеживать добавленные ингредиенты */

  const {ingredients} = useSelector(state => state.Ingredients)
  const [formatedIngredients, setFormatedIngredients] = useState({});
  const scrollableContainer = useRef(null);

  /* запрос в апи для получения ингредиентов и составления меню из категорий */
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [])

  useEffect(() => {
    let _ingredients = {};
    if(ingredients.length) {
      ingredients.forEach(item => {
        if (!_ingredients[item.type]) {
          _ingredients[item.type] = {};
          _ingredients[item.type].items = [];
          _ingredients[item.type].name = categoryTranslate[item.type];

          if(Object.keys(_ingredients).some(slug => _ingredients[slug].isActive === true)) {
            _ingredients[item.type].isActive = false;
          } else {
            _ingredients[item.type].isActive = true;
          }
        }

        _ingredients[item.type].items.push(item)

      })

      setFormatedIngredients(_ingredients);
    }
  }, [ingredients]);

  /* функций для передачи ивента скролла */
  const tabClick = slug => {
    scrollToCat(slug)
  }

  /* сначала сбрасывает все категории, потом делает нужную - активной */
  const setActiveCategory = (slug) => {
    let _nav = {...formatedIngredients};

    if(_nav[slug].isActive) {
      return;
    }

    Object.keys(_nav).forEach(categorySlug => {
      _nav[categorySlug].isActive = false;
    })

    _nav[slug].isActive = true;

    setFormatedIngredients(_nav);
  }

  /* функций для работы с DOM, определяет где находится блок с нужной категорией и скроллит да нее */
  const scrollToCat = slug => {
    const targetElement = scrollableContainer.current.querySelector(`[data-category="${slug}"]`);

    if (targetElement) {
      scrollableContainer.current.scrollTo({
        top: targetElement.offsetTop - scrollableContainer.current.offsetTop,
        behavior: "smooth",
      });
    }
  }

  /* функция для определения "на каком элементы верхняя граница скролла" */
  const detectScrollCat = () => {
    const categories = scrollableContainer.current.querySelectorAll("[data-category]");
    const containerScrollTop = scrollableContainer.current.scrollTop;
    const containerTop = scrollableContainer.current.offsetTop;
    let activeCategory = categories[0].getAttribute('data-category')

    for (const category of categories) {
      const rectTop = category.offsetTop;

      // Проверяем, пересекается ли верхняя часть контейнера с текущей категорией
      if(containerScrollTop >= (rectTop - containerTop)) {
        activeCategory = category.getAttribute('data-category')
      }
    }

    setActiveCategory(activeCategory)
  }


  return (
    <div className="ingredients">
      <p className="text text_type_main-large">
        Соберите бургер
      </p>
      <div className="nav">
        <IngredientsNav menu={formatedIngredients} onClick={tabClick}/>
      </div>
      <div className={styles.list} ref={scrollableContainer} onScroll={detectScrollCat}>
        {
          Object.keys(formatedIngredients).map((slug, index) => (
            <IngredientsCategory
              slug={slug}
              categoryName={categoryTranslate[slug]}
              products={formatedIngredients[slug].items}
              key={'cat_'+index}
            />
          ))
        }
      </div>
    </div>
  )
}

export default BurgerIngredients;