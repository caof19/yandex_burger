import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState, forwardRef} from "react";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

type InputPasswordToggleProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "size" | "type" | "value"
> & {
  value?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const InputPasswordToggle = forwardRef<
    HTMLInputElement,
    InputPasswordToggleProps
>((props, ref) => {
    const [showPass, setShowPass] = useState(false);
    const IconName: keyof TICons = showPass ? "HideIcon" : "ShowIcon";
    const type : 'text' | 'password' =  showPass ? 'text' : 'password'
    const togglePassword = () => {
        setShowPass(!showPass);
    };

     const { value: originalValue, onChange } = props;
        const value = originalValue || ""

    return (
        <Input
            type={type}
            placeholder="Пароль"
            name="password"
            error={false}
            icon={IconName}
            errorText="Ошибка"
            onIconClick={togglePassword}
            size="default"
            extraClass="mb-6"
            required
            ref={ref}
            value={value}
            {...props}
            onChange={onChange}
        />
    );
});

export default InputPasswordToggle;
