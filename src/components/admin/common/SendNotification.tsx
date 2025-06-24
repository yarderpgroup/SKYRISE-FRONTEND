import { Cancel, Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Form, Formik } from "formik";

// import Swal from "sweetalert2";
import * as Yup from "yup";
import { TextInput } from "../dashboard";
import { post, put } from "api";
import { toast } from "react-toastify";
import { RippleLoadingButton } from "components/core";
import { useState } from "react";
type Props = {
  selectedUsers?: any;
  onClose: () => void;
  activeData?: any;
};
const SendNotification = ({ selectedUsers, onClose, activeData }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const MessageSchema = [
    {
      key: "2",
      label: "Reply",
      name: "message",
      multiline: true,
      rows: 4,
      validationSchema: Yup.string()
        .required("Message is Required")
        .max(350, "Message must be less than 350 characters")
        .min(5, "Message must be greater than 5 characters"),
      initialValue: "",
    },
  ];
  const initialValues = MessageSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = MessageSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );
  const handleSendReply = async (values: any, submitProps: any) => {
    try {
      setIsStatusLoading(true);
      const response = await put({
        path: `support/send-reply/${activeData}`,
        isAlert: true,
        body: JSON.stringify({
          reply: values?.message,
        }),
      });
      setIsStatusLoading(false);
      onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      onClose();
    }
  };
  return (
    <Dialog
      open={selectedUsers}
      maxWidth="sm"
      fullWidth
      onClose={() => onClose && onClose()}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSendReply}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogContent dividers>
              {MessageSchema.map((inputItem: any) => (
                <TextInput
                  key={inputItem.key}
                  name={inputItem?.name}
                  label={inputItem?.label}
                  multiline={inputItem?.multiline}
                  rows={inputItem?.rows}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                <RippleLoadingButton
                  type="submit"
                  title="Save & Continue"
                  className="w-44"
                  loading={isStatusLoading}
                />
              </div>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SendNotification;
