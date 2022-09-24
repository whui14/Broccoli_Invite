import React, { FC } from "react";
import "./SubmitResult.css";
import { Result, Button, Modal } from "antd";
import "antd/dist/antd.css";
interface SubmitResultProps {
  isModalVisible: boolean;
  onOk: () => void;
}
export const SubmitResult: FC<SubmitResultProps> = (props) => {
  const { isModalVisible, onOk } = props;
  return (
    <Modal
      onOk={onOk}
      footer={null}
      open={isModalVisible}
      closable={false}
      destroyOnClose={true}
    >
      <Result
        status="success"
        title="All done!"
        subTitle="You will be one of the first to experience Broccoli & Co. when we launch."
        extra={[
          <Button type="primary" className="resultButton" onClick={onOk}>
            OK
          </Button>,
        ]}
      />
    </Modal>
  );
};
