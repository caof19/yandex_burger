import {ModalInfo} from "../utils/types.ts";
import IngredientDetailsSlice, {closeModal, loadData, openModal} from './IngredientDetailsSlice';
import {mockModalIngredient} from "../utils/mockData.ts";

describe('Тестирования слайса модального окна ингредиента', () => {
    const initialState: ModalInfo = {
        modalInfo: {
            isActiveIngredients: false,
            img: '',
            name: '',
            info: {
                calories: '',
                proteins: '',
                fat: '',
                carbohydrates: ''
            }
        }
    };

    it('Должен вернуть начальное состояние', () => {
        expect(IngredientDetailsSlice(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('Должен заполнить данные ингредиента и открыть модальное окно', () => {
         const action = {
            type: openModal.type,
            payload: mockModalIngredient
        }

        const result = IngredientDetailsSlice(initialState, action);

        expect(result.modalInfo).toEqual({
            isActiveIngredients: true,
            img: mockModalIngredient.image_large,
            name: mockModalIngredient.name,
            info: {
                calories: mockModalIngredient.calories,
                proteins: mockModalIngredient.proteins,
                fat: mockModalIngredient.fat,
                carbohydrates: mockModalIngredient.carbohydrates
            }
        })
    })

    it('Должен вернуть состояние к изначальному', () => {
        const action = {
            type: closeModal.type,
            payload: mockModalIngredient
        }

        const preloadData: ModalInfo = {
            modalInfo: {
                isActiveIngredients: true,
                img: mockModalIngredient.image_large,
                name: mockModalIngredient.name,
                info: {
                    calories: mockModalIngredient.calories,
                    proteins: mockModalIngredient.proteins,
                    fat: mockModalIngredient.fat,
                    carbohydrates: mockModalIngredient.carbohydrates
                }
            }
        }

        const result = IngredientDetailsSlice(preloadData, action);

        expect(result.modalInfo).toEqual(initialState.modalInfo)
    })

    it('Должен загрузить данные, но не открывать модальное окно', () => {
         const action = {
            type: loadData.type,
            payload: mockModalIngredient
        }

        const result = IngredientDetailsSlice(initialState, action);

        expect(result.modalInfo).toEqual({
            isActiveIngredients: false,
            img: mockModalIngredient.image_large,
            name: mockModalIngredient.name,
            info: {
                calories: mockModalIngredient.calories,
                proteins: mockModalIngredient.proteins,
                fat: mockModalIngredient.fat,
                carbohydrates: mockModalIngredient.carbohydrates
            }
        })
    })
})