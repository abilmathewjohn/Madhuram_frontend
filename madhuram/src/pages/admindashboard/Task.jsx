import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Select, DatePicker, message, Breadcrumb } from "antd";

const { Option } = Select;

const AdminTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    deadline: null,
  });

  const token = localStorage.getItem("token");

  // Fetch tasks and employees only if token exists
  useEffect(() => {
    if (token) {
      fetchTasks();
      fetchEmployees();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Fetch tasks from backend
  const fetchTasks = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees from backend
  const fetchEmployees = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:3000/employee", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch employees");

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load employees.");
    }
  };

  // Handle task creation
  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.assignedTo || !newTask.deadline) {
      return message.error("All fields are required.");
    }

    try {
      const response = await fetch("http://localhost:3000/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newTask,
          deadline: newTask.deadline ? new Date(newTask.deadline).toISOString() : null, // ✅ Fix date format
        }),
      });

      if (!response.ok) throw new Error("Failed to create task.");

      message.success("Task created successfully!");
      setModalVisible(false);
      fetchTasks(); 
    } catch (error) {
      console.error(error);
      message.error("Failed to create task.");
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/task/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete task.");

      message.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete task.");
    }
  };

  // Table columns
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo) => assignedTo ? `${assignedTo.name} (ID: ${assignedTo.employeeId})` : "Unknown",
    },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    {
      title: "Actions",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDeleteTask(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Task Management</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="text-xl font-semibold mt-4 mb-4">Task Management</h2>
      <Button type="primary" onClick={() => setModalVisible(true)}>Create Task</Button>

      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey={(record) => record._id || record.id} 
        className="mt-4"
      />

      <Modal
        title="Create Task"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateTask}
      >
        <Input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="mb-2"
        />
        <Input.TextArea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="mb-2"
        />
        <Select
          placeholder="Assign To"
          value={newTask.assignedTo}
          onChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
          className="w-full mb-2"
        >
          {employees.map((emp) => (
            <Option key={emp._id} value={emp._id}>
              {emp.name} (ID: {emp.employeeId})
            </Option>
          ))}
        </Select>
        <Select
          value={newTask.priority}
          onChange={(value) => setNewTask({ ...newTask, priority: value })}
          className="w-full mb-2"
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
        <DatePicker
          className="w-full mb-2"
          onChange={(date, dateString) => setNewTask({ ...newTask, deadline: dateString })}
        />
      </Modal>
    </div>
  );
};

export default AdminTaskManagement;
