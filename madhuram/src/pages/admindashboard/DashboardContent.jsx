import { useEffect, useState } from "react";
import { Breadcrumb, Card, Row, Col, Statistic, Table, Tag, Spin } from "antd";
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [statsResponse, ordersResponse] = await Promise.all([
        fetch("http://localhost:3000/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!statsResponse.ok || !ordersResponse.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const statsData = await statsResponse.json();
      const ordersData = await ordersResponse.json();

      setStats(statsData);
      setOrders(ordersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Table columns for recent orders
  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "Customer", dataIndex: "user", key: "user", render: (user) => user.firstName + " " + user.lastName },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Completed" ? "green" : status === "Pending" ? "gold" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Total (₹)", dataIndex: "totalPrice", key: "totalPrice" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      {/* Dashboard Title */}
      <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "24px" }}>Admin Dashboard</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Dashboard Cards */}
      {!loading && !error && (
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Orders"
                value={stats.totalOrders}
                prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Products"
                value={stats.totalProducts}
                prefix={<AppstoreOutlined style={{ color: "#52c41a" }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Customers"
                value={stats.totalCustomers}
                prefix={<UserOutlined style={{ color: "#722ed1" }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                prefix={<CreditCardOutlined style={{ color: "#ff4d4f" }} />}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Recent Orders Table */}
      {!loading && !error && (
        <Card title="Recent Orders" style={{ marginTop: "24px" }}>
          <Table columns={columns} dataSource={orders} pagination={false} />
        </Card>
      )}
    </div>
  );
};

export default Dashboard;