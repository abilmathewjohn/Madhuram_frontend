import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Card, Table, Tag, message } from "antd";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ id ]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`);
      const data = await response.json();
      setOrder(data);
      setLoading(false);
    } catch (error) {
      message.error("Error fetching order details" + error.message);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/orders">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>View Order</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card title={`Order ID: ${order._id}`} className="mt-4">
        <p><strong>User:</strong> {order.user.name} ({order.user.email})</p>
        <p><strong>Status:</strong> <Tag color="blue">{order.status}</Tag></p>
        <p><strong>Total Price:</strong> ${order.totalPrice}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}</p>
      </Card>
      
      <Table className="mt-4" dataSource={order.products} rowKey="_id" pagination={false}>
        <Table.Column title="Product Name" dataIndex={["product", "name"]} key="name" />
        <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Table.Column title="Price" dataIndex={["product", "price"]} key="price" render={(price) => `$${price}`} />
      </Table>
    </div>
  );
};

export default ViewOrder;
