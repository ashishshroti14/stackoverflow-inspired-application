import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from './logo.svg';
import {
  Layout,
  Avatar,
  Descriptions,
  Typography,
  Menu,
  Popconfirm,
  Drawer,
  message,
  Row,
  Col,
} from "antd";

import './App.less';
// import "antd/dist/antd.css";

import Login from "./views/Login"
import Question from "./views/Question"
import { PrivateRoute, PublicRoute } from "./views/SpecialRoutes";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Layout className="App">
            <Router>
             
                   
                    
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            {/* <Route exact path="/question-route" component={Question} /> */}
                            <PrivateRoute
                                path="/question-route"
                                component={Question}
                                redirectTo="/login"
                            />
                        </Switch>
               

                    
              
            </Router>
            
        </Layout>
    
   
  );
}

export default App;
