import IngredientsNav from '../IngredientsNav/IngredientsNav';
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";
import styles from "./BurgerIngredients.module.less";
import {useEffect, useRef, useState} from "react";
import {fetchIngredients} from "../../services/IngredientsSlice";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {TBurgerIngredients} from "../../utils/types";

const BurgerIngredients = () => {

  const dispatch = useAppDispatch();

  /* Перевод категорий */
  const categoryTranslate : Record<string, string>= {
    'bun': 'Булки',
    'main': 'Начинки',
    'sauce': 'Соусы',
    'top': 'Верх',
    'bottom': 'Низ',
  }

  /* состояние для ингредиентов */
  /* состояние, потому что нужно отслеживать добавленные ингредиенты */

  const {ingredients} = useAppSelector(state => state.Ingredients)
  const [formatedIngredients, setFormatedIngredients] = useState<Record<string, TBurgerIngredients>>({});
  const scrollableContainer = useRef<HTMLDivElement>(null);

  /* запрос в апи для получения ингредиентов и составления меню из категорий */
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [])

  useEffect(() => {
    let _ingredients: Record<string, TBurgerIngredients> = {};
    if(ingredients.length) {
      ingredients.forEach(item => {
        if (!_ingredients[item.type]) {
          _ingredients[item.type] = {
            items: [],
            name: categoryTranslate[item.type],
            isActive: true
          };

          if(Object.keys(_ingredients).some(slug => _ingredients[slug].isActive)) {
            _ingredients[item.type].isActive = false;
          }
        }

        _ingredients[item.type].items.push(item)

      })

      setFormatedIngredients(_ingredients);
    }
  }, [ingredients]);

  /* функций для передачи ивента скролла */
  const tabClick = (slug:string) => {
    scrollToCat(slug)
  }

  /* сначала сбрасывает все категории, потом делает нужную - активной */
  const setActiveCategory = (slug:string) => {
    let _nav = {...formatedIngredients};


    if(_nav[slug].isActive) {
      return;
    }

    if(!_nav) {
      return;
    }

    Object.keys(_nav).forEach(categorySlug => {
      _nav[categorySlug].isActive = false;
    })

    _nav[slug].isActive = true;

    setFormatedIngredients(_nav);
  }

  /* функций для работы с DOM, определяет где находится блок с нужной категорией и скроллит да нее */
  const scrollToCat = (slug:string) => {
    if(!scrollableContainer || !scrollableContainer.current) {
      return ;
    }

    const current = scrollableContainer.current;

    const targetElement:HTMLDivElement | null = current.querySelector(`[data-category="${slug}"]`);

    if (targetElement) {
      current.scrollTo({
        top: targetElement.offsetTop - current.offsetTop,
        behavior: "smooth",
      });
    }
  }

  /* функция для определения "на каком элементы верхняя граница скролла" */
  const detectScrollCat = () => {
    if(!scrollableContainer || !scrollableContainer.current) {
      return ;
    }

    const current = scrollableContainer.current;

    const categories = current.querySelectorAll("[data-category]");
    const containerScrollTop = current.scrollTop;
    const containerTop = current.offsetTop;
    let activeCategory = categories[0].getAttribute('data-category')

    for (const category of categories) {
      const rectTop = (category as HTMLElement).offsetTop;

      // Проверяем, пересекается ли верхняя часть контейнера с текущей категорией
      if(containerScrollTop >= (rectTop - containerTop)) {
        activeCategory = category.getAttribute('data-category')
      }
    }

    if(!activeCategory) {
      return;
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