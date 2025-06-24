import { MenuItem } from "@mui/material";
import { Field } from "formik";
import { useState } from "react";
import TextInput from "./TextInput";
type Props = {
  name?: string;
  label?: string;
  type?: string;
  size?: string;
  placeholder?: string;
  className?: string;
  startIcon?: React.ReactElement;
  rows?: number;
  multiline?: boolean;
  icon?: string;
  styleContact?: string;
  disabled?: boolean;
  activeField?: any;
  fieldClass?: any;
  options?: any;
};

const CustomInput = ({
  disabled,
  name,
  label,
  type,
  startIcon,
  rows,
  size,
  multiline,
  styleContact,
  icon,
  className,
  placeholder,
  activeField,
  fieldClass,
  options,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const checkInputType = () => {
    if (type === "password" && isVisible) return "text";
    if (type === "password" && !isVisible) return "password";
    return type;
  };
  return (
    <>
      <Field name={name}>
        {(props: any) => (
          <div className={`rounded-corner flex flex-col ${className}`}>
            <p className="text-themeDarkGray font-bold pt-3">{label}</p>
            <div>
              <TextInput
                fullWidth
                label={activeField}
                disabled={disabled}
                rows={rows}
                size={size}
                placeholder={placeholder}
                className={styleContact}
                multiline={multiline}
                type={checkInputType()}
                error={Boolean(props.meta.touched && props.meta.error)}
                helperText={props.meta.touched && props.meta.error}
                {...options?.map((option: any) => (
                  <MenuItem key={option?.id} value={option?.category}>
                    {option.category}
                  </MenuItem>
                ))}
                {...props.field}
                InputProps={
                  {
                    classes: {
                      root: " ",
                      notchedOutline: "notchedOutline",
                      input: "get-a-quote",
                    },
                  } as any
                } // InputProps={{
                //   startAdornment: startIcon ? (
                //     <InputAdornment position="start">
                //       {startIcon}
                //     </InputAdornment>
                //   ) : null,
                //   endAdornment:
                //     type === "password" ? (
                //       <InputAdornment
                //         onClick={() => setIsVisible(!isVisible)}
                //         position="start"
                //       >
                //         <IconButton>
                //           {isVisible ? <Visibility /> : <VisibilityOff />}
                //         </IconButton>
                //       </InputAdornment>
                //     ) : null,
                // className: fieldClass,
                // }}
              />
            </div>
          </div>
        )}
      </Field>
    </>
  );
};

export default CustomInput;
