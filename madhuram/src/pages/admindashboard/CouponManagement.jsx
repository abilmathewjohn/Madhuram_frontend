import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");

  // Fetch all coupons
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/coupon/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCoupons(data);
    } catch (error) {
      message.error("Failed to load coupons." + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle form submit (Create & Edit)
  const handleFormSubmit = async (values) => {
    try {
      const url = editingCoupon
        ? `http://localhost:3000/coupon/update/${editingCoupon._id}`
        : "http://localhost:3000/coupon/create";

      const method = editingCoupon ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(editingCoupon ? "Coupon updated!" : "Coupon created!");
        setModalVisible(false);
        setEditingCoupon(null);
        fetchCoupons();
      } else {
        message.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      message.error("Server error, try again." + error);
    }
  };

  // Open edit modal
  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    form.setFieldsValue({
      ...coupon,
      validFrom: coupon.validFrom ? coupon.validFrom.split("T")[0] : "",
      validUntil: coupon.validUntil ? coupon.validUntil.split("T")[0] : "",
    });
    setModalVisible(true);
  };

  // Delete coupon
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/coupon/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        message.success("Coupon deleted!");
        fetchCoupons();
      } else {
        message.error("Failed to delete coupon.");
      }
    } catch (error) {
      message.error("Server error, try again." + error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Coupons</h2>
        <Button type="primary" onClick={() => { setModalVisible(true); setEditingCoupon(null); form.resetFields(); }}>
          Create Coupon
        </Button>
      </div>

      {/* Coupon Table */}
      <Table dataSource={coupons} rowKey="_id" loading={loading} bordered>
        <Table.Column title="Code" dataIndex="code" key="code" />
        <Table.Column title="Discount Type" dataIndex="discountType" key="discountType" />
        <Table.Column title="Discount Value" dataIndex="discountValue" key="discountValue" />
        <Table.Column title="Min Order" dataIndex="minOrderAmount" key="minOrderAmount" />
        <Table.Column title="Valid From" dataIndex="validFrom" key="validFrom" />
        <Table.Column title="Valid Until" dataIndex="validUntil" key="validUntil" />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <>
              <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
              <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
            </>
          )}
        />
      </Table>

      {/* Create/Edit Coupon Modal */}
      <Modal
        title={editingCoupon ? "Edit Coupon" : "Create Coupon"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item name="code" label="Coupon Code" rules={[{ required: true, message: "Enter coupon code!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="discountType" label="Discount Type" rules={[{ required: true }]}>
            <Select>
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed Amount</Option>
            </Select>
          </Form.Item>
          <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="minOrderAmount" label="Min Order Amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="validFrom" label="Valid From" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="validUntil" label="Valid Until" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagement;
