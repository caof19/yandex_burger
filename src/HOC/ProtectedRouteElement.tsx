import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PAGE_URI} from "../utils/const";
import {setLastURL} from "../services/UserSlice";
import {TProtectedArgument} from "../utils/types";
import {useAppDispatch} from "../services/store.ts";

const ProtectedRouteElement: FC<TProtectedArgument> = ({onlyAuth, onlyUnAuth, element}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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