// import React from "react";
// import { Button, Modal, Form, Input, DatePicker } from "antd";

// const AddExpense = ({
//   isExpenseModalVisible,
//   handleExpenseCancel,
//   onFinish,
// }) => {
//   const [form] = Form.useForm();
//   return (
//     <Modal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
//       style={{ fontWeight: 600 }}
//       title="Add Expense"
//       open={isExpenseModalVisible}
//       onCancel={handleExpenseCancel}
//       footer={null}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={(values) => {
//           onFinish(values, "expense");
//           form.resetFields();
//         }}
//       >
//         <Form.Item
//           style={{ fontWeight: 600 }}
//           label="Name"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: "Please enter the name of the transaction",
//             },
//           ]}
//         >
//           <Input type="text" className="custome-input" />
//         </Form.Item>

//         <Form.Item
//           style={{ fontWeight: 600 }}
//           label="Amount"
//           name="amount"
//           rules={[
//             { required: true, message: "Please enter the expense amount" },
//           ]}
//         >
//           <Input type="number" className="custome-input" />
//         </Form.Item>

//         <Form.Item
//           style={{ fontWeight: 600 }}
//           label="Date"
//           name="date"
//           rules={[
//             { required: true, message: "Please select the expense date" },
//           ]}
//         >
//           <DatePicker className="custome-input" format="DD-MM-YYYY" />
//         </Form.Item>
//         <Form.Item>
//           <Button htmlType="submit" className="btn reset-balance-btn">
//             Add Expense
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddExpense;























// import React from "react";
// import { Button, Modal, Form, Input, DatePicker } from "antd";

// const AddExpense = ({
//   isExpenseModalVisible,
//   handleExpenseCancel,
//   onFinish,
//   selectedBudget, // Pass the selected budget as a prop
// }) => {
//   const [form] = Form.useForm();

//   return (
//     <Modal
//       style={{ fontWeight: 600 }}
//       title="Add Expense"
//       open={isExpenseModalVisible}
//       onCancel={handleExpenseCancel}
//       footer={null}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={(values) => {
//           onFinish(values, "expense", selectedBudget); // Pass the selected budget to onFinish
//           form.resetFields();
//         }}
//       >
//         <Form.Item
//           style={{ fontWeight: 600 }}
//           label="Name"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: "Please enter the name of the transaction",
//             },
//           ]}
//         >
//           <Input type="text" className="custom-input" />
//         </Form.Item>

//         <Form.Item
//           style={{ fontWeight: 600 }}
//           label="Amount"
//           name="amount"
//           rules={[
//             { required: true, message: "Please enter the expense amount" },
//           ]}
//         >
//           <Input type="number" className="custom-input" />
//         </Form.Item>

//         <Form.Item
//           style={{ fontWeight: 600 }}
//           label="Date"
//           name="date"
//           rules={[
//             { required: true, message: "Please select the expense date" },
//           ]}
//         >
//           <DatePicker className="custom-input" format="DD-MM-YYYY" />
//         </Form.Item>
//         <Form.Item>
//           <Button htmlType="submit" className="btn reset-balance-btn">
//             Add Expense
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddExpense;



import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

const AddExpense = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
  selectedBudget,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense", selectedBudget);
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the name of the transaction",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter the expense amount" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date" },
          ]}
        >
          <DatePicker className="custom-input" format="DD-MM-YYYY" />
        </Form.Item>

     

        <Form.Item>
          <Button htmlType="submit" className="btn reset-balance-btn">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;


