import React, { useRef } from "react";
import { Button, Form, Toast, Image } from "@douyinfe/semi-ui";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MD5 } from "crypto-js";
import { api } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log(username.current, password.current)
    const encryptedPassword = MD5(password.current).toString();
    console.log(username.current, encryptedPassword);
    if(username.current === "admin" && encryptedPassword === MD5("123456").toString()){
      Toast.success({ content: "登录成功！", theme: "light" });
      navigate("/first_identification");
    }
    else {
      Toast.error({ content: "用户名或密码错误！", theme: "light" });
    }
  }
  // const handleLogin = () => {
  //   const encryptedPassword = MD5(password.current).toString();
  //   console.log(username.current, encryptedPassword);
  //   axios
  //     .post(`/${api}/login`, {
  //       username: username.current,
  //       password: encryptedPassword,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         const { data } = res;
  //         localStorage.setItem("token", data.access_token);
  //         Toast.success({ content: "登录成功！", theme: "light" });
  //         navigate("/first_identification");
  //       } else if (res.status === 401) {
  //         Toast.error({ content: "用户名或密码错误！", theme: "light" });
  //       }
  //     })
  //     .catch((err) => {
  //       Toast.error({ content: "登录失败！", theme: "light" });
  //       console.error("登录失败", err);
  //       navigate("/first_identification");
  //     });
  // };

  const username = useRef();
  const password = useRef();

  return (
    <div className={styles.screen}>
      <div className={styles.login_box}>
        <Image src="LOGO.png" alt="识身" preview={false} height={150} />
        <Form>
          <div>
            <div className={styles.welcome_back}>欢迎回来</div>
            <div className={styles.welcome_description}>
              登录<span className={styles.welcome_project_name}>识身</span>账户
            </div>
          </div>
          <Form.Input
            field="username"
            type="text"
            label="用户名"
            placeholder={"输入用户名"}
            onChange={(val) => {
              username.current = val;
            }}
          />
          <Form.Input
            field="password"
            type="password"
            label="密码"
            placeholder={"输入密码"}
            onChange={(val) => {
              password.current = val;
            }}
          />
          <Form.Checkbox style={{ marginTop: 10, marginBottom: 20 }}>
            记住我
          </Form.Checkbox>
          <Button theme="solid" htmlType="submit" block onClick={handleLogin}>
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}
