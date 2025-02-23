import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PAGE_URI} from "../utils/const.js";
import {useDispatch} from "react-redux";
import {setLastURL} from "../services/UserSlice.js";

const ProtectedRouteElement = ({onlyAuth, onlyUnAuth, element}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userStatus = !!localStorage.getItem("accessToken");

    if(onlyAuth && !userStatus) {
      dispatch(setLastURL(location.pathname))
      navigate(PAGE_URI.login)
    }

    if(onlyUnAuth && userStatus) {
      navigate(PAGE_URI.main)
    }
  })

  return element;
}

export default ProtectedRouteElement;