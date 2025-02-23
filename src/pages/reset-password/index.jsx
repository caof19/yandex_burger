import Header from "../../components/Header/Header.jsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {fetchUnAuth} from "../../services/UserSlice.js";
import {PAGE_URI} from "../../utils/const.js";
import InputPassword from "../../components/InputPasswordToggle/InputPassword.jsx";
import HeaderWrapper from "../../components/Header/HeaderWrapper.jsx";

const ResetPassword = function() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("14881337Qq");
  const [token, setToken] = useState("");

  const inputEmailRef = useRef(null)
  const inputPassRef = useRef(null)

  useEffect(() => {
    if(location.state) {
      if(!location.state.canViewResetPassword) {
        navigate(PAGE_URI.forgotPassword)
      }
    } else {
      navigate(PAGE_URI.forgotPassword)
    }
  }, []);

  const submitHandler = async e => {
    e.preventDefault();

    const result = await dispatch(fetchUnAuth({
      userData: {
        password,
        token
      },
      endpoint: '/password-reset/reset',
    }));

    if(fetchUnAuth.fulfilled.match(result)) {
      navigate(PAGE_URI.login, {state: {canViewResetPassword: true}})
    }
  }

  return(
    <>
      <HeaderWrapper />
      <div className="wrap">
        <form onSubmit={submitHandler}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <InputPassword
            value={password}
            ref={inputPassRef}
            onChange={e => setPassword(e.target.value)}
            placeholder="Введите новый пароль"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setToken(e.target.value)}
            value={token}
            name={'token'}
            error={false}
            ref={inputEmailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            required={true}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Сохранить
          </Button>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вспомнили пароль?
            <Link to={PAGE_URI.login} className="ml-2 link">Войти</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default ResetPassword;