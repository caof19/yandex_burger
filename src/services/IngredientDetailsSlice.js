import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  modalInfo: {
    isActiveIngredients: false,
    img: '',
    name: '',
    info: ''
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
    closeModal: (state, action) => {
      state.modalInfo = initialState.modalInfo
    },
    loadData: (state, action) => {
      const {image_large: img, name, calories, proteins, fat, carbohydrates, _id: id} = action.payload;
      state.modalInfo = {
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