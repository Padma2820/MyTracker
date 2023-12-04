// BudgetsTable.jsx
import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import "../components/BudgetsTable.css";

const BudgetsTable = ({ budgets, deleteBudget }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => <span>₹ {text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this budget?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" className="budgetTable-btn">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = (budgetId) => {
    deleteBudget(budgetId);
    message.success("Budget deleted successfully");
  };

  return <Table dataSource={budgets} columns={columns} />;
};

export default BudgetsTable;
