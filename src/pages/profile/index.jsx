import {NavLink, useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const.js";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState} from "react";
import style from './index.module.less'
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {fetchExit, fetchUnAuth, fetchWithTokenRefresh} from "../../services/UserSlice.js";
import HeaderWrapper from "../../components/Header/HeaderWrapper.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defData, setDefData] = useState({});

  const [userData, setUserData] = useState({
    email: {
      disabled: true,
      value: '',
    },
    name: {
      disabled: true,
      value: '',
    },
    password: {
      disabled: true,
      value: '',
    },
  })

  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      dispatch(fetchWithTokenRefresh(
        {
          endpoint: '/auth/user'
        }
      ))
    }
  }, [])

  const {info} = useSelector(state => state.UserDetails);
  useEffect(() => {

    const defaultData = {
      email: {
        disabled: true,
        value: info.email,
      },
      name: {
        disabled: true,
        value: info.name,
      },
      password: {
        disabled: true,
        value: '',
      },
    }

    setDefData(defaultData)
    setUserData(defaultData)
  }, [info]);
  const [haveChange, setHaveChange] = useState(false);


  const changeInput = (value, field) => {
    setUserData(state => {
      return {
        ...state,
        [field]: {
          ...state[field],
          value
        }
      }
    })
    setHaveChange(true)
  }

  const formHandler = (e) => {
    e.preventDefault();

    const fieldsToUpdate = {};

    Object.keys(userData).forEach(key => {
      if(userData[key].value && !userData[key].disabled) {
        fieldsToUpdate[key] = userData[key].value;
      }
    })

    dispatch(fetchWithTokenRefresh({
      userData: fieldsToUpdate,
      endpoint: '/auth/user',
      method: 'PATCH',
    }))
  }

  const changeAccess = (field, ref) => {
    setUserData(state => {
      return {
        ...state,
        [field]: {
          ...state[field],
          disabled: false,
        }
      }
    })

    setTimeout(() => {
        ref.current.focus();
    })
  }

  const exitClick = async () => {

    const result = await dispatch(fetchExit());

    if(fetchExit.fulfilled.match(result)) {
      navigate(PAGE_URI.login)
    }
  }

  const resetData = () => {
    setUserData(defData);
    setHaveChange(false);
  }
  const inputEmailRef = useRef(null);
  const inputLoginRef = useRef(null);
  const inputPassRef = useRef(null);

  return (
    <>
      <HeaderWrapper/>
      <main className="main">
        <div className="container">
          <div className={style.row}>
            <div className="profile__nav">
              <NavLink to={PAGE_URI.profile} className={({isActive}) => isActive ? style.menu_item_active : style.menu_item}>
                <p className="text text_type_main-medium pb-2">
                  Профиль
                </p>
              </NavLink>
              <NavLink to={PAGE_URI.orders} className={({isActive}) => isActive ? style.menu_item_active : style.menu_item}>
                <p className="text text_type_main-medium pt-2 pb-2">
                  История заказов
                </p>
              </NavLink>
              <p className={"text text_type_main-medium mb-20 pt-2 pb-2 " +style.menu_item}
                onClick={exitClick}
              >
                Выход
              </p>
              <p className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </div>
            <form className="profile__wrap" onSubmit={formHandler}>
              <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => changeInput(e.target.value, 'email')}
                value={userData.email.value}
                name={'email'}
                error={false}
                ref={inputEmailRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                required={true}
                icon={'EditIcon'}
                disabled={userData.email.disabled}
                onIconClick={e => changeAccess('email', inputEmailRef)}
              />
              <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={e => changeInput(e.target.value, 'name')}
                value={userData.name.value}
                name={'name'}
                error={false}
                ref={inputLoginRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                required={true}
                icon={'EditIcon'}
                disabled={userData.name.disabled}
                onIconClick={e => changeAccess('name', inputLoginRef)}
              />
              <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={e => changeInput(e.target.value, 'password')}
                value={userData.password.value}
                name={'password'}
                error={false}
                ref={inputPassRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                required={true}
                icon={'EditIcon'}
                disabled={userData.password.disabled}
                onIconClick={e => changeAccess('password', inputPassRef)}
              />
              { haveChange && <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Сохранить
              </Button>}
              { haveChange && <Button htmlType="reset" type="secondary" size="medium" extraClass="mb-20" onClick={resetData}>
                Отменить
              </Button>}
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Profile;