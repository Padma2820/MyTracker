import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import { addDoc, collection } from 'firebase/firestore';

const AddBudget = ({ isBudgetModalVisible, handleBudgetCancel, addBudget }) => {
  const [form] = Form.useForm();
  const [amount, setAmount] = useState('');

  const handleFinish = (values) => {
    const newBudget = {
      name: values.name,
      amount: parseFloat(values.amount),
      date: values.date.format('DD-MM-YYYY'), // Add the date property here
    };

    addBudget(newBudget);
    form.resetFields();
  };

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Create Budget"
      visible={isBudgetModalVisible}
      onCancel={handleBudgetCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Budget Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter the budget name',
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Budget Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: 'Please enter the budget amount',
            },
          ]}
        >
          <Input
            type="number"
            className="custom-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Budget Date"
          name="date"
          rules={[
            {
              required: true,
              message: 'Please select the budget date',
            },
          ]}
        >
          <DatePicker className="custom-input" format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="btn reset-balance-btn">
            Create Budget
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBudget;

