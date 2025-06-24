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
  mutate?: any;
};

const ResponseInfo = ({ open, onClose, mutate }: Props) => {
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
          <h1 className="text-themeDarkGray font-bold text-xl">Comment</h1>
          <p className="pt-3 text-base">{open?.comment}</p>
        </div>
      </Dialog>
    </>
  );
};

export default ResponseInfo;
