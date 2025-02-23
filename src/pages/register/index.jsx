import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import {Link} from "react-router-dom";
import {fetchUnAuth} from "../../services/UserSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import InputPassword from "../../components/InputPasswordToggle/InputPassword.jsx";
import {PAGE_URI} from "../../utils/const.js";
import HeaderWrapper from "../../components/Header/HeaderWrapper.jsx";

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputNameRef = useRef(null)
  const inputEmailRef = useRef(null)
  const inputPassRef = useRef(null)


  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await dispatch(fetchUnAuth(
      {
        userData: {
          name,
          email,
          password
        },
        endpoint: '/auth/register',
      }
    ));

    if (fetchUnAuth.fulfilled.match(result)) {
      navigate(PAGE_URI.main)
    }
  }

  return (
    <>
      <HeaderWrapper/>
      <div className="wrap">
        <form onSubmit={submitHandler}>
          <p className="text text_type_main-medium mb-6">
            Регистрация
          </p>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            ref={inputNameRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            required={true}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'mail'}
            error={false}
            ref={inputEmailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            required={true}
          />
          <InputPassword
            value={password}
            ref={inputPassRef}
            onChange={e => setPassword(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Зарегистрироваться
          </Button>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <Link to={PAGE_URI.register} className="ml-2 link">Войти </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register;