import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog, TextFieldProps } from "@mui/material";
import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const MessageInfo = ({ open, onClose, mutate }: Props) => {
  return (
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="p-5">
          <div className="pt-3">
            <h1 className="text-themeDarkGray font-bold text-xl">Subject</h1>
            <p className=" text-base">{open?.subject}</p>
          </div>
          <div className="pt-3">
            <h1 className="text-themeDarkGray font-bold text-xl">Message</h1>
            <p className=" text-base">{open?.description}</p>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MessageInfo;
