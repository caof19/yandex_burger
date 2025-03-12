import {NavLink, useNavigate} from "react-router-dom";
import {PAGE_URI} from "../../utils/const";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState, FormEvent, RefObject, LegacyRef} from "react";
import style from './index.module.less'
import {useSelector} from "react-redux";
import {fetchExit, fetchWithTokenRefresh} from "../../services/UserSlice";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import {RootState, useAppDispatch} from "../../services/store";
import {UserData, UserDataField} from "../../utils/types";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [defData, setDefData] = useState<UserData>({
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
  });

  const [userData, setUserData] = useState<UserData>(defData)

  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      dispatch(fetchWithTokenRefresh(
        {
          endpoint: '/auth/user'
        }
      ))
    }
  }, [])

  const {info} = useSelector((state:RootState) => state.UserDetails);
  useEffect(() => {
    const defaultData : UserData = {
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
  const [haveChange, setHaveChange] = useState<boolean>(false);


  const changeInput = (value:string, field:UserDataField) => {
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

  const formHandler = (e:FormEvent) => {
    e.preventDefault();

    const fieldsToUpdate: Partial<Record<UserDataField, string>> = {};

    Object.keys(userData).forEach(key => {
      const userDataKey = key as keyof typeof userData;
      if(userData[userDataKey].value && !userData[userDataKey].disabled) {
        fieldsToUpdate[userDataKey] = userData[userDataKey].value;
      }
    })

    dispatch(fetchWithTokenRefresh({
      userData: fieldsToUpdate,
      endpoint: '/auth/user',
      method: 'PATCH',
    }))
  }

  const changeAccess = (field:UserDataField, ref:LegacyRef<HTMLInputElement>) => {
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
      if(ref && (ref as RefObject<HTMLInputElement>).current) {
        (ref as RefObject<HTMLInputElement>).current?.focus();
      }
    })
  }

  const exitClick = async () => {

    const result = await dispatch(fetchExit());

    if(fetchExit.fulfilled.match(result)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate(PAGE_URI.login)
    }
  }

  const resetData = () => {
    setUserData(defData);
    setHaveChange(false);
  }
  const inputEmailRef = useRef<HTMLInputElement>(null) as LegacyRef<HTMLInputElement>;
  const inputLoginRef = useRef<HTMLInputElement>(null) as LegacyRef<HTMLInputElement>;
  const inputPassRef = useRef<HTMLInputElement>(null) as LegacyRef<HTMLInputElement>;

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
                onIconClick={() => changeAccess('email', inputEmailRef)}
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
                onIconClick={() => changeAccess('name', inputLoginRef)}
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
                onIconClick={() => changeAccess('password', inputPassRef)}
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