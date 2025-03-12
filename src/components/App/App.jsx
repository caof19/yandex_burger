import {Route, Routes, BrowserRouter, useLocation} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.js";
import ProtectedRouteElement from "../../HOC/ProtectedRouteElement.jsx";
import Register from "../../pages/register/index.jsx";
import Login from "../../pages/login/index.jsx";
import ForgotPassword from "../../pages/forgot-password/index.jsx";
import ResetPassword from "../../pages/reset-password/index.jsx";
import Profile from "../../pages/profile/index.jsx";
import IngredientDetailClear from "../IngredientDetails/IngredientDetailClear.jsx";
import List from "../../pages/list/list.jsx";
import {useEffect} from "react";

function App() {
  const location = useLocation();
  const showIngredientInModal = location.state && location.state.showInModal;

  return (
      <Routes>
        <Route path={PAGE_URI.main} element={<List/>}/>
        <Route path={PAGE_URI.register} element={<ProtectedRouteElement onlyUnAuth element={<Register />} />} />
        <Route path={PAGE_URI.login} element={<ProtectedRouteElement onlyUnAuth element={<Login />} />} />
        <Route path={PAGE_URI.forgotPassword} element={<ProtectedRouteElement onlyUnAuth element={<ForgotPassword />} />} />
        <Route path={PAGE_URI.resetPassword} element={<ProtectedRouteElement onlyUnAuth element={<ResetPassword />} />} />
        <Route path={PAGE_URI.profile} element={ <ProtectedRouteElement onlyAuth element={<Profile />} />} />
        {showIngredientInModal && <Route path={PAGE_URI.ingredientDetail} element={<List/>}/>}
        {!showIngredientInModal && <Route path={PAGE_URI.ingredientDetail} element={<IngredientDetailClear />} />}
      </Routes>
  )
}

export default App
