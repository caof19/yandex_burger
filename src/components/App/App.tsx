import {Route, Routes, useLocation, Location} from "react-router-dom";
import {PAGE_URI} from "../../utils/const";
import ProtectedRouteElement from "../../HOC/ProtectedRouteElement";
import Register from "../../pages/register";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import IngredientDetailClear from "../IngredientDetails/IngredientDetailClear";
import List from "../../pages/list/list";

function App() {
  const location:Location = useLocation();
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
