import API from '@/service/index';
import { useState, useRef, useEffect } from 'react';
import { Button, message, Space, Divider, Image } from 'antd';
import { history } from 'umi';
import {
  AlipayOutlined,
  LockOutlined,
  UserOutlined,
  WeiboOutlined,
  TaobaoOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import type { CSSProperties } from 'react';
import './index.less';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Login = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const formRef = useRef<any>(null);

  const getRotateGeg = (range: number[], value: number, length: number) => {
    return (value / length) * (range[1] - range[0]) + range[0];
  };

  useEffect(() => {
    const yRange = [-10, 10];
    const card: any = document.querySelector(
      '.ant-pro-form-login-page-container',
    );
    card.onmousemove = (e: { offsetX: number; offsetY: number }) => {
      const { offsetX, offsetY } = e;
      const { offsetWidth, offsetHeight } = card;
      const ry = -getRotateGeg(yRange, offsetX, offsetWidth);
      const rx = getRotateGeg(yRange, offsetY, offsetHeight);
      card?.style.setProperty('--rx', `${rx}deg`);
      card?.style.setProperty('--ry', `${ry}deg`);
    };

    card.onmouseleave = (e: Record<string, any>) => {
      card?.style.setProperty('--rx', '0deg');
      card?.style.setProperty('--ry', '0deg');
    };
  }, []);

  const refreshCaptcha = () => {
    const imgCaptcha: any = document.getElementById('imgCaptcha');
    imgCaptcha.src = `/api/captcha?rad=${Math.random()}`;
  };

  const handleRegister = () => {
    formRef.current.validateFields().then(() => {
      setIsRegister(true);
      API.USER.register(formRef.current.getFieldsValue()).then((res) => {
        if (!res) return;
        message.success('注册成功');
        formRef.current?.resetFields();
        setIsRegister(false);
      });
    });
  };

  const handleLogin = () => {
    formRef.current.validateFields().then(() => {
      setIsRegister(false);
      API.USER.login(formRef.current.getFieldsValue()).then((res) => {
        console.log(res, 'resresresres');
        if (!res) return;

        const { msgCode } = res;
        // 验证码有问题 更新验证码
        if (msgCode === 1) {
          refreshCaptcha();
          return;
        }
        if (!res) return;
        history.push('/home');
      });
    });
  };

  const extraLoginType = () => {
    message.error('暂未开放');
  };

  return (
    <div className="login-container">
      
      {/* <LoginFormPage
        // ref
        formRef={formRef}
        submitter={{
          render: (props, dom) => {
            return [
              <Button
                className="login-btn"
                onClick={() => {
                  if (!isRegister) {
                    handleLogin();
                    return;
                  }
                  handleRegister();
                }}
                key="login"
                type="primary"
              >
                {isRegister ? '立即注册' : '登录'}
              </Button>,
              // <Button
              //   className='login-btn'
              //   onClick={handleRegister}
              //   key="register"
              // >
              //   注册
              // </Button>,
            ];
          },
        }}
        title={
          (
            <div className="avater-wrap">
              <Image
                className="avater"
                src="https://img.alicdn.com/imgextra/i3/O1CN01NwaE161kn1AVM4KDy_!!6000000004727-2-tps-828-828.png"
              ></Image>
            </div>
          ) as any
        }
        // subTitle={ isRegister ? '请注册' : '请登录' }
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        actions={
          <div className="extra-login-type">
            <Divider plain>
              <span
                style={{
                  fontWeight: 'normal',
                  fontSize: 14,
                  color: '#999',
                }}
              >
                {!isRegister ? (
                  <>
                    如果你还没有账号？
                    <a onClick={() => setIsRegister(true)}>去注册</a>
                  </>
                ) : (
                  <>
                    如果你已经有账号？
                    <a onClick={() => setIsRegister(false)}>去登录</a>
                  </>
                )}
              </span>
            </Divider>

            {!isRegister && (
              <>
                <Divider plain>
                  <span
                    style={{
                      fontWeight: 'normal',
                      fontSize: 14,
                      color: '#999',
                    }}
                  >
                    其他登录方式
                  </span>
                </Divider>
                <Space align="center" size={24}>
                  <div onClick={extraLoginType} className="extra-login-icon">
                    <AlipayOutlined
                      style={{ ...iconStyles, color: '#1677FF' }}
                    />
                  </div>
                  <div onClick={extraLoginType} className="extra-login-icon">
                    <TaobaoOutlined
                      style={{ ...iconStyles, color: '#FF6A10' }}
                    />
                  </div>
                  <div onClick={extraLoginType} className="extra-login-icon">
                    <WeiboOutlined
                      style={{ ...iconStyles, color: '#1890ff' }}
                    />
                  </div>
                </Space>
              </>
            )}
          </div>
        }
      >
        <>
          <ProFormText
            name="loginId"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="loginPwd"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          {!isRegister && (
            <div className="captcha-wrap">
              <ProFormText
                name="captcha"
                fieldProps={{
                  size: 'large',
                  prefix: <FundViewOutlined className={'prefixIcon'} />,
                }}
                placeholder={'请输入验证码'}
                rules={[
                  {
                    required: isRegister ? false : true,
                    message: '请输入验证码',
                  },
                ]}
              />
              <div>
                <img
                  onClick={() => {
                    refreshCaptcha();
                  }}
                  id="imgCaptcha"
                  width="100%"
                  src="/api/captcha"
                  alt=""
                />
              </div>
            </div>
          )}
        </>
      </LoginFormPage> */}
    </div>
  );
};

export default Login;
