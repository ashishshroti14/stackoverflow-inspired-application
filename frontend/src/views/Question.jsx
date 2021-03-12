import React, { useState , useEffect} from "react";
import { Typography, Row, Col, Card, Divider, Tag, Anchor, Drawer, Spin } from "antd";
import logo from "../logo.png";
import logoSmall from "../logoSmall.png";
import axios from "axios";
import openNotification from "../utils/openAntdNotification";




import { Layout, Menu, Button } from 'antd';
import { UserOutlined, LaptopOutlined,MenuOutlined, CloseOutlined,LogoutOutlined, CaretUpOutlined , CaretDownOutlined  } from '@ant-design/icons';

import "./Question.css"


import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Title, Paragraph } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;




function Question() {

    const screen  = useBreakpoint()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [question, setQuestion] = useState({})
    const [loading, setLoading] = useState(false)

   


const handleLogout = async () => {
    try {
        const res = await axios.get("http://localhost:5000/users/logout", { withCredentials: true,});
        if (res.data.success) {
            window.location.href = "http://localhost:3000/login";
        }
    } catch (error) {
        console.log(error);
        openNotification("error", "Could not log out.", error.message);
    }
};
useEffect(async() => {
    setLoading(true)



    try {
        const res = await axios({
            method: "get",
            url: "http://localhost:5000/question?title=why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array?",
            withCredentials: true,
        });
        console.log(res.data,"data")
     setQuestion(res.data.data)
     
    } catch (error) {
       
        console.log("error", error);
        const errMsg = error.response ? error.response.data.msg : error.message;
        openNotification("error", errMsg);
    }
    setLoading(false)
    
  
}, [])
const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onClose = () => {
    setDrawerVisible(false);
  };
    return (
        <Layout>
            <Header className="header" >
                
				<Row justify="end" align="middle">
                    <Col xs={{ span: 3 , offset: 0}} md = {{span :0}} lg = {{span:0}} style = {{marginLeft: 0}} >
                    <Button
							type="dashed"
							icon={
								drawerVisible ? (
									<CloseOutlined style={{ fontSize: "1rem" }} />
								) : (
									<MenuOutlined style={{ fontSize: "1rem" }} />
								)
							}
							onClick={() => setDrawerVisible((prevState) => !prevState)}
						/>
                    </Col>
					<Col xs={{ span: 4 }} md={{ span: 6 }} lg = {{span:4}} >
						
                        {
                            (screen.xs ) ? <img
							src={logoSmall}
							alt="Logo"
							style={{}}
							width="100%"
						/>:<img
							src={logo}
							alt="Logo"
							style={{}}
							width="100%"
						/>
                        }
					</Col>
					<Col xs={{ span: 16 }} md={{ span: 16 }}  lg={{ span: 18 }} style={{ textAlign: "center" }}>
                    <Menu theme="light" mode="horizontal" >
                    <Menu.Item key="1">About</Menu.Item>
                    <Menu.Item key="2">Products</Menu.Item>
                    <Menu.Item key="3">For Teams</Menu.Item>
                </Menu>
					</Col>
					<Col
						md={{ span: 2 }}
						xs={{ span: 1 }}
						style={{
							textAlign: "right",
							alignItems: "center",
							justifyContent: "space-between",
							display: "flex",
						}}
					>
						

                        {
                            screen.xs ? <Button type="primary"  onClick={handleLogout}>
                        
                         
                        <LogoutOutlined/>
                            
                            
                            </Button>:<Button type="primary"  onClick={handleLogout}>
                        
                         
                        Log Out
						
                        
						</Button>
                        }
                        
						
					</Col>
				</Row>
               
            </Header>
            <Drawer
        
        placement="left"
        closable={true}
        onClose={onClose}
        visible={drawerVisible}
      >
       <Menu
                            mode="inline"
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['PUBLIC', 'FIND A JOB']}
                            style={{ height: '100%' }}
                            
                        >
                            <Menu.Item key="1">HOME</Menu.Item>
                            <SubMenu key="PUBLIC" icon={<UserOutlined />} title="PUBLIC"   >
                                <Menu.Item key="2" active>Stack Overflow</Menu.Item>
                                <Menu.Item key="3">Tags</Menu.Item>
                                <Menu.Item key="4">Users</Menu.Item>
                                
                            </SubMenu>
                            <SubMenu key="FIND A JOB" icon={<LaptopOutlined />} title="FIND A JOB">
                                <Menu.Item key="5">Jobs</Menu.Item>
                                <Menu.Item key="6">Companies</Menu.Item>
                               
                            </SubMenu>
                         
                        </Menu>
      </Drawer>
            <Content style={{ padding: '0 0px' }}>

            
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                   <Anchor>
                    <Sider className="site-layout-background" width={200}   hidden = {screen.xs }>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['PUBLIC', 'FIND A JOB']}
                            style={{ height: '100%' }}
                            
                        >
                            <Menu.Item key="1">HOME</Menu.Item>
                            <SubMenu key="PUBLIC" icon={<UserOutlined />} title="PUBLIC"   >
                                <Menu.Item key="2" active>Stack Overflow</Menu.Item>
                                <Menu.Item key="3">Tags</Menu.Item>
                                <Menu.Item key="4">Users</Menu.Item>
                                
                            </SubMenu>
                            <SubMenu key="FIND A JOB" icon={<LaptopOutlined />} title="FIND A JOB">
                                <Menu.Item key="5">Jobs</Menu.Item>
                                <Menu.Item key="6">Companies</Menu.Item>
                               
                            </SubMenu>
                          
                        </Menu>
                    </Sider>
                    </Anchor>
                    <Spin spinning = {loading}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Row>
                            <Col>
                            <Row>
                        <Col span = {4} style={{color: "gray"}}>
                        <Row justify="center">
                        <CaretUpOutlined style = {{fontSize : screen.xs ? 40 : 80}}/>
                        </Row>
                        <Row justify = "center">
                        <Title level={screen.xs ? 4: 2}> {question.upvotes}</Title>
                        </Row>
                        <Row justify="center">
                        <CaretDownOutlined style = {{fontSize : screen.xs ? 40 : 80}} />
                        </Row>
                        </Col>
                        
<Col xs = {20} md = {20} lg = {16}>
                        <Row>
                            <Title level={2}>{question.title}</Title>
                        </Row>
                        <Row>
                            Asked : {question.asked} , Active: {question.active}, Views: {question.views}
                        </Row>
                        <Divider></Divider>
                        <Row >

                            {
                                question.content ? question.content.map(chunk => {
                                    switch (chunk.type){
                                        case "text" :
                                            return <Paragraph style={{width: "100%"}}>{chunk.content}</Paragraph>
                                        case "code" :
                                            return <Paragraph style={{width: "100%"}}><pre>{chunk.content}</pre></Paragraph>
                                        case "list" :
                                          const material =   <Paragraph style={{width: "100%"}}>
                                                <ul>
                                                    {
                                                        chunk.content ? chunk.content.map (content => {
                                                          return  <li>{content}</li>
                                                        }) : null
                                                    }
                                                </ul>
                                            </Paragraph>
                                            console.log(material, "material")
                                            return material
                                        default :
                                                return null
                                    }
                                   
                                }): null
                            }
                            
                        
                        </Row>
                        </Col>
                        </Row>

                        <Row>
                            <Title level={3}>{question.answers ? question.answers.length: 0} Answer(s)</Title>
                        </Row>

                        {
                            question.answers ? question.answers.map(answer => {

                                return  <Row>
                                <Col span = {4} style={{color: "gray"}}>
                                <Row justify="center">
                                <CaretUpOutlined style = {{fontSize : screen.xs ? 40 : 80}}/>
                                </Row>
                                <Row justify = "center">
                                <Title level={screen.xs ? 4: 2}> {answer.upvotes}</Title>
                                </Row>
                                <Row justify="center">
                                <CaretDownOutlined style = {{fontSize : screen.xs ? 40 : 80}} />
                                </Row>
                                </Col>
        
                                <Col span = {16}>
                                <Row>
                                    
                               {
                                    answer.content ? answer.content.map(chunk => {
                                        switch (chunk.type){
                                            case "text" :
                                                return <Paragraph style={{width: "100%"}}>{chunk.content}</Paragraph>
                                            case "code" :
                                                return <Paragraph style={{width: "100%"}}><pre>{chunk.content}</pre></Paragraph>
                                            case "list" :
                                              const material =   <Paragraph style={{width: "100%"}}>
                                                    <ul>
                                                        {
                                                            chunk.content ? chunk.content.map (content => {
                                                              return  <li>{content}</li>
                                                            }) : null
                                                        }
                                                    </ul>
                                                </Paragraph>
                                                console.log(material, "material")
                                                return material
                                            default :
                                                    return null
                                        }
                                       
                                    }): null
                                
                               }
        
                                </Row>
                                </Col>
                                </Row>
                                   
                            }) : null
                        }

                       
                        </Col>
                   
                        </Row>

                    </Content>
                    </Spin>
                </Layout>
            </Content>
            
        </Layout>


    )
}

export default Question
