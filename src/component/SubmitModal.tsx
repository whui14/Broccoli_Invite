import React, { FC, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { submit } from "./SubmitAxios";
import "antd/dist/antd.css";
import "./SubmitResult.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

interface SubmitModalProps {
  isModalVisible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export const SubmitModal: FC<SubmitModalProps> = (props) => {
  const { isModalVisible, onCancel, onSuccess } = props;
  const [btnLabel, setbtnLabel] = useState("Send");
  const [loading, setloading] = useState(false);
  const [errorTips, seterrorTips] = useState("");

  const handleOk = () => {
    onCancel();
  };

  const onFinish = async (values: { fullname: string; email: string }) => {
    setbtnLabel("Sending, please wait...");
    setloading(true);
    seterrorTips("");
    try {
      var result = await submit(values.fullname, values.email);
      if (result?.status === 200) {
        onSuccess();
      } else {
        seterrorTips(result.error);
      }
    } catch (e) {
      // seterrorTips(e);
      console.log("Failed:", e);
    }
    setbtnLabel("Send");
    setloading(false);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Requst an invite"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: "Full name needs to be at least 3 characters long!",
              min: 3,
            },
          ]}
        >
          <Input placeholder="Full name" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input a valid email",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="confirm_email"
          rules={[
            {
              required: true,
              message: "Please input a valid confirm email!",
              type: "email",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("email") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two email that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input placeholder="Confirm email" disabled={loading} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {btnLabel}
          </Button>
        </Form.Item>

        <p className="center">{errorTips}</p>
      </Form>
    </Modal>
  );
};
export default SubmitModal;
