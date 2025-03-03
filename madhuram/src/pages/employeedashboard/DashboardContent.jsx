
import { Breadcrumb, Card, Row, Col, Statistic, Table, Tag } from "antd";
import { ShoppingCartOutlined, AppstoreOutlined, UserOutlined, CreditCardOutlined } from "@ant-design/icons";

const Dashboard = () => {
  // Sample data for orders
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Completed" ? "green" : status === "Pending" ? "gold" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Total (₹)", dataIndex: "total", key: "total" },
  ];

  const data = [
    { key: "1", orderId: "#12345", customer: "John Doe", status: "Completed", total: "₹120.00" },
    { key: "2", orderId: "#12346", customer: "Jane Smith", status: "Pending", total: "₹95.00" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      {/* Dashboard Title */}
      <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "24px" }}>Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Orders"
              value={1245}
              prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Products"
              value={380}
              prefix={<AppstoreOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Customers"
              value={3120}
              prefix={<UserOutlined style={{ color: "#722ed1" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Revenue"
              value="₹25,400"
              prefix={<CreditCardOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Orders Table */}
      <Card title="Recent Orders" style={{ marginTop: "24px" }}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </div>
  );
};

export default Dashboard;
