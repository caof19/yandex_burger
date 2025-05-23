import {createSlice} from '@reduxjs/toolkit'
import {ModalInfo} from "../utils/types";


export const initialState: ModalInfo = {
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
export const IngredientDetailsSlice = createSlice({
    name: 'IngredientDetails',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const {image_large: img, name, calories, proteins, fat, carbohydrates} = action.payload;
            state.modalInfo = {
                isActiveIngredients: true,
                img,
                name,
                info: {
                    calories,
                    proteins,
                    fat,
                    carbohydrates
                }
            }
        },
        closeModal: (state) => {
            state.modalInfo = initialState.modalInfo
        },
        loadData: (state, action) => {
            const {image_large: img, name, calories, proteins, fat, carbohydrates} = action.payload;
            state.modalInfo = {
                isActiveIngredients: false,
                img,
                name,
                info: {
                    calories,
                    proteins,
                    fat,
                    carbohydrates
                }
            }
        }
    }

})

export const {openModal, closeModal, loadData} = IngredientDetailsSlice.actions;

export default IngredientDetailsSlice.reducer;