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
import Feed from "../Feed/Feed.tsx";
import FeedDetail from "../FeedDetail/FeedDetail";
import FeedWithModal from "../FeedWithModal/FeedWithModal";
import Modal from "../Modal/Modal";
import Orders from "../Orders/Orders";
import OrdersWithModal from "../OrdersWithModal/OrdersWithModal.tsx";
import HeaderWrapper from "../Header/HeaderWrapper.tsx";

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

        <Route path={PAGE_URI.feed} element={<Feed />} />
        {showIngredientInModal && <Route path={PAGE_URI.feedProduct} element={<FeedWithModal />} /> }
        {!showIngredientInModal && <Route path={PAGE_URI.feedProduct} element={
            <>
                <HeaderWrapper/>
                <Modal hideClose>
                    <FeedDetail />
                </Modal>
            </>
        } /> }

        <Route path={PAGE_URI.orders} element={ <ProtectedRouteElement onlyAuth element={<Orders />} />} />
        {showIngredientInModal && <Route path={PAGE_URI.ordersProduct} element={ <ProtectedRouteElement onlyAuth element={<OrdersWithModal />} />} />}
        {!showIngredientInModal && <Route path={PAGE_URI.ordersProduct} element={ <ProtectedRouteElement onlyAuth element={
            <>
                <HeaderWrapper/>
                <Modal hideClose>
                    <FeedDetail />
                </Modal>
            </>
        } />} />}
      </Routes>
  )
}

export default App
