import React, { useState } from "react";

import logo from "../logo.png";
import logoSmall from "../logoSmall.png";




import { Menu, Breadcrumb, Spin } from 'antd';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Image, Form, Layout, Input, Button, Row, Col, Grid, Card, Typography } from "antd";
import openNotification from "../utils/openAntdNotification";

import "./Login.css";


const { useBreakpoint } = Grid;

const { Header, Content } = Layout;

const Login = () => {
    const screen = useBreakpoint();
    const history = useHistory();
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onFinish = async (values) => {
        setIsLoggingIn(true);
        try {
         
            const res = await axios({
                method: "post",
                url: "http://localhost:5000/users/login",
                data: values,
                withCredentials: true,
            });
            setIsLoggingIn(false);
            localStorage.setItem("user", JSON.stringify(res.data.data))
            history.push("/question-route");
        } catch (error) {
            setIsLoggingIn(false);
            console.log("error", error);
            const errMsg = error.response ? error.response.data.msg : error.message;
            openNotification("error", errMsg);
        }
    };
    return (
        <>
            <Header className="header" >

                <Row align="middle">

                    <Col xs={{ span: 4 }} md={{ span: 6 }} lg={{ span: 4 }} >

                        {
                            (screen.xs) ? <img
                                src={logoSmall}
                                alt="Logo"
                                style={{}}
                                width="100%"
                            /> : <img
                                src={logo}
                                alt="Logo"
                                style={{}}
                                width="100%"
                            />
                        }
                    </Col>
                    <Col xs={{ span: 16 }} md={{ span: 16 }} lg={{ span: 18 }} style={{ textAlign: "center" }}>
                        <Menu theme="light" mode="horizontal" >
                            <Menu.Item key="1">About</Menu.Item>
                            <Menu.Item key="2">Products</Menu.Item>
                            <Menu.Item key="3">For Teams</Menu.Item>
                        </Menu>
                    </Col>

                </Row>

            </Header>
            <Spin spinning={isLoggingIn}>
                <Content className="container" style = {{minHeight: 800}} >
                  

                    <Card bordered={true} hoverable={!screen.xs} title="Stackoverflow Login" className="loginCard">
                        <Form
                            size="large"
                            layout="vertical"
                            name="Login"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item
                                label="E-Mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your E-Mail!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Row justify="end" align="bottom">
                                <Col span={8} style={{ textAlign: "right" }}>
                                    <Form.Item style={{ marginBottom: "0px" }}>
                                        <Button type="primary" size="large" htmlType="submit" loading={isLoggingIn}>
                                            Log In
                                    </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Content>
            </Spin>
        </>
    );
};

export default Login;
