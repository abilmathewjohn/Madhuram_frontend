import { useEffect, useState } from "react";
import { Table, Button, Input, Select, message, Breadcrumb } from "antd";
import { SendOutlined, HomeOutlined, BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Option } = Select;

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:3000/notification/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setNotifications(data);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Error fetching notifications: " + error.message);
    }
  };

  const sendNotification = async () => {
    if (!messageText.trim()) {
      return message.warning("Message cannot be empty");
    }

    let body = { message: messageText, recipientType };
    if (recipientType === "employee" && employeeId.trim()) {
      body.employeeId = employeeId;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/notification/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Notification sent successfully");
        setMessageText("");
        setEmployeeId("");
        fetchNotifications();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Error sending notification: " + error.message);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
      render: (sender) => sender?.name || "Admin",
    },
    {
      title: "Recipient",
      dataIndex: "receiver",
      key: "receiver",
      render: (receiver) => receiver?.name || "All",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <BellOutlined /> Notifications
        </Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-3">Send Notification</h3>
        <Input.TextArea value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Enter your notification..." rows={3} />
        <div className="flex items-center gap-4 mt-3">
          <Select value={recipientType} onChange={setRecipientType} className="w-40">
            <Option value="all">To All</Option>
            <Option value="employee">To Specific Employee</Option>
          </Select>
          {recipientType === "employee" && <Input placeholder="Enter Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="w-52" />}
          <Button type="primary" icon={<SendOutlined />} loading={loading} onClick={sendNotification}>
            Send
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={notifications} rowKey="_id" />
    </div>
  );
};

export default Notification;
