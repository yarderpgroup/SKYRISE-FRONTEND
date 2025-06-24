import {
  InputBaseComponentProps,
  InputProps,
  MenuItem,
  TextField,
} from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";

interface Props {
  type: "text" | "select" | "date" | "file" | "number" | "email" | any;
  value?: any;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  options?: any;
  title?: string;
  id?: string;
  image?: string;
  variant?: "filled" | "outlined" | "standard";
  InputProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  styleContact?: any;
  styleArea?: any;
  styleField?: any;
  onFileChange?: any;
  multiline?: boolean;
  rows?: number;
  loading?: boolean;
  autoCompleteValue?: any;
  handleNoText?: boolean;
  onTextChange?: any;
  handleSelectText?: any;
  onNoOptionClick?: any;
  defaultValue?: any;
  multiple?: boolean;
  size?: any;
}

const TextInput = ({
  type,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  fullWidth,
  placeholder,
  name,
  disabled,
  InputProps,
  title,
  id,
  size,
  variant,
  inputProps,
  options,
  styleContact,
  image,
  styleArea,
  styleField,
  onFileChange,
  rows,
  multiline,
  defaultValue,
}: Props) => {
  switch (type) {
    case "text":
      return (
        <div className={styleArea}>
          {/* <p className="text-theme text-wider font-medium pb-2">{title}</p> */}
          <TextField
            fullWidth={fullWidth}
            placeholder={placeholder}
            size={size}
            name={name}
            id={id}
            variant={variant}
            className={styleContact}
            // InputProps={InputProps}
            InputProps={
              {
                classes: {
                  root: " ",
                  notchedOutline: "notchedOutline",
                  input: "custom-input-class",
                },
              } as any
            }
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            defaultValue={defaultValue}
          />
        </div>
      );
    case "number":
      return (
        <div className={styleArea}>
          {/* <p className="text-theme text-wider font-medium pb-2">{title}</p> */}
          <TextField
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            id={id}
            size={size}
            type="number"
            variant={variant}
            className={styleContact}
            InputProps={
              {
                classes: {
                  root: " ",
                  notchedOutline: "notchedOutline",
                  input: "custom-input-class",
                },
              } as any
            }
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            defaultValue={defaultValue}
          />
        </div>
      );
    case "date":
      return (
        <div>
          {/* <p className="text-theme text-wider font-medium pb-2">{title}</p> */}
          <TextField
            fullWidth={fullWidth}
            type="date"
            name={name}
            id={id}
            size={size}
            variant={variant}
            className="rounded-lg"
            inputProps={inputProps}
            InputProps={
              {
                classes: {
                  root: " ",
                  notchedOutline: "notchedOutline",
                  input: "custom-input-class",
                },
              } as any
            }
            value={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            defaultValue={defaultValue}
          />
        </div>
      );

    case "select":
      return (
        <div className={styleArea}>
          {/* <p className="text-theme text-wider font-medium pb-2">{title}</p> */}
          <TextField
            fullWidth={fullWidth}
            id={id}
            size={size}
            select={true}
            name={name}
            value={value}
            onChange={onChange}
            className={styleContact}
            InputProps={
              {
                classes: {
                  root: " ",
                  notchedOutline: "notchedOutline",
                  input: "custom-input-class",
                },
              } as any
            }
            error={error}
            helperText={helperText}
            multiline={multiline}
            rows={rows}
            defaultValue={defaultValue}
          >
            {options?.map((option: any) => (
              <MenuItem key={option?.category} value={option?.category}>
                {option.category}
              </MenuItem>
            ))}
          </TextField>
        </div>
      );

    default:
      return (
        <div className={styleArea}>
          {/* <p className="text-theme text-wider font-medium pb-2">{title}</p> */}
          <TextField
            fullWidth={fullWidth}
            placeholder={placeholder}
            size={size}
            name={name}
            type={type}
            id={id}
            variant={variant}
            multiline={multiline}
            rows={rows}
            className={styleContact}
            InputProps={
              {
                classes: {
                  root: " ",
                  notchedOutline: "notchedOutline",
                  input: "custom-input-class",
                },
              } as any
            }
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          />
        </div>
      );
  }
};

export default TextInput;
