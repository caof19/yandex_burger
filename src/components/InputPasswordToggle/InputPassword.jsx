import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, forwardRef} from "react";

const InputPasswordToggle = forwardRef((props, ref) => {

  const [showPass, setShowPass] = useState(false)
  const togglePassword = () => {
    setShowPass(!showPass);
  }

  return (
    <Input
      type={showPass ? 'text' : 'password'}
      placeholder={'Пароль'}
      name={'password'}
      error={false}
      icon={showPass ? 'HideIcon' : 'ShowIcon'}
      errorText={'Ошибка'}
      onIconClick={togglePassword}
      size={'default'}
      extraClass="mb-6"
      required={true}
      ref={ref}
      {...props}
    />
  )
})

export default InputPasswordToggle;