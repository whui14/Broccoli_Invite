import React, { useState } from 'react';
import { Button } from 'antd';
import './Home.css'
import SubmitModal from "./component/SubmitModal";
import { SubmitResult } from "./component/SubmitResult";

const HomePage: React.FC = () => {
  const [showInviteFlag, setShowInviteFlag] = useState<boolean>(false);
  const [showResultFlag, setShowResultFlag] = useState<boolean>(false);

  const onClose = () => {
    setShowInviteFlag(false);
    setShowResultFlag(false);
  };

  return (
    <div className="homePage">
      <div className="header">
        BROCCOLI & CO.
        </div>
      <div className="content">
        <div className="contentTitle">A better way 
        </div>
        <div className="contentTitle">
        to enjoy every day.</div>
        <div className="contentSubTitle">
          Be the first to know when we launch.
        </div>
        <Button className="contentButton" onClick={() => setShowInviteFlag(true)}>
          Request an invite
        </Button>
        <SubmitModal isModalVisible={showInviteFlag} onCancel={onClose} onSuccess={() => setShowResultFlag(true)}></SubmitModal>
            <SubmitResult isModalVisible={showResultFlag} onOk={onClose} ></SubmitResult>
      </div>
      <div className="footer">
        <div>
          Made with 💗 in Melbourne.
        </div>
        <div>
        © 2016 Broccoli & Co. All rights reserved.
        </div>
        </div>
    </div>
  );
}

export default HomePage;
