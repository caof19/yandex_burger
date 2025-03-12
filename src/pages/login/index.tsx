
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {fetchUnAuth} from "../../services/UserSlice";
import InputPassword from "../../components/InputPasswordToggle/InputPassword";
import {useRef, useState, FormEvent} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import {setLastURL} from "../../services/UserSlice";
import {RootState, useAppDispatch} from "../../services/store";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputEmailRef = useRef(null)
  const inputPassRef = useRef(null)

  const {lastURL} = useSelector((state: RootState) => state.UserDetails.info);

  const submitHandler = async (e:FormEvent) => {
    e.preventDefault();

    const result = await dispatch(fetchUnAuth({
      userData: {
        email,
        password
      },
      endpoint: '/auth/login',
    }));

    if(fetchUnAuth.fulfilled.match(result)) {
      if(lastURL) {
        navigate(lastURL);
        dispatch(setLastURL(''));
      } else {
        navigate(PAGE_URI.main)
      }
    }
  }

  return(
    <>
      <HeaderWrapper />
      <div className="wrap">
        <form onSubmit={submitHandler}>
          <p className="text text_type_main-medium mb-6">
            Вход
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
          <InputPassword
            value={password}
            ref={inputPassRef}
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Войти
          </Button>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы — новый пользователь?
            <Link to={PAGE_URI.register} className="ml-2 link">Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Забыли пароль?
            <Link to={PAGE_URI.forgotPassword} className="ml-2 link">Восстановить пароль</Link>
          </p>
        </form>
      </div>
    </>
  )
}