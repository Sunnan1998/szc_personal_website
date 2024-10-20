import API from '@/service/index';
import { useStyle } from '@ant-design/pro-components';
import { message } from 'antd';
import { history } from 'umi'
import React, { useEffect, useState } from 'react';
import './index.scss';

const Home = () => {
  const [loginId, setLoginId] = useState<string>('');

  useEffect(() => {
    API.USER.getUserInfo().then((res) => {
      if (!res) return;
      setLoginId(res.loginId);
    });
  }, []);

  const outLogin = () => {
    history.push('/login')
  }

  return (
    <div className="home-container">
      <div onClick={outLogin} className="login-btn">
        退出登录
      </div>
      <div className="layer1"></div>
      <div className="layer2"></div>
      <div className="layer3"></div>
      <div className="title">Welcome {loginId}</div>
    </div>
  );
};

export default Home;
