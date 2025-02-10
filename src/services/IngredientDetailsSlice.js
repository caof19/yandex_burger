import { createSlice } from '@reduxjs/toolkit'


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
    }
  }

})

export const {openModal, closeModal} = IngredientDetailsSlice.actions;

export default IngredientDetailsSlice.reducer;