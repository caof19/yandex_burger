import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {fetchUnAuth} from "../../services/UserSlice";
import {PAGE_URI} from "../../utils/const";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import {useAppDispatch} from "../../services/store";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const inputEmailRef = useRef(null)

  const submitHandler = async (e:React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(fetchUnAuth({
      userData: {
        email
      },
      endpoint: '/password-reset'
    }));

    if(fetchUnAuth.fulfilled.match(result)) {
      navigate(PAGE_URI.resetPassword, {state: {canViewResetPassword: true}});
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
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            ref={inputEmailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            required={true}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Восстановить
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

export default ForgotPassword;