import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Layout, Typography, Button, Space, Spin } from "antd";
import { Users } from "./Users.jsx";
import { Files } from "./Files.jsx";
import { isAdmin } from "../api/rolesDefinations";
import { Meteor } from "meteor/meteor";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const adminStatus = await isAdmin(Meteor.userId());
        setIsUserAdmin(adminStatus);
      } catch (error) {
        console.error('Error checking admin role:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, []);

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (error) {
        console.error('Logout error:', error);
      } else {
        navigate('/login');
      }
    });
  };

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2} style={{ margin: "16px 0" }}>
          Welcome to FileNest!
        </Title>
        <Button 
          type="primary" 
          danger 
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "20px" }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {isUserAdmin && <Users />}
            <Files />
          </>
        )}
      </Content>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
