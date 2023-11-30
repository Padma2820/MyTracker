// // BudgetCard.js
// import React, { useState } from 'react';
// import { Button, Modal, Form, Input } from 'antd';
// import { firestore } from '../../firebase';
// import { addDoc, collection } from 'firebase/firestore';

// const BudgetCard = ({ onFinish }) => {
//   const [form] = Form.useForm();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [budgets, setBudgets] = useState([]);

//   const handleFinish = async (values) => {
//     try {
//       await firestore.collection('budgets').add(values);
//       onFinish();
//       form.resetFields();
//       setModalVisible(false); // Close the modal after finishing
//     } catch (error) {
//       console.error('Error adding budget:', error);
//     }
//   };



//   return (
//     <div>
//       <button onClick={() => setModalVisible(true)}>Add Budget</button>

//       <Modal
//         style={{ fontWeight: 600 }}
//         title="Create Budget"
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleFinish}>
//           <Form.Item
//             style={{ fontWeight: 600 }}
//             label="Budget Name"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter the budget name',
//               },
//             ]}
//           >
//             <Input type="text" className="custom-input" />
//           </Form.Item>

//           <Form.Item
//             style={{ fontWeight: 600 }}
//             label="Budget Amount"
//             name="amount"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter the budget amount',
//               },
//             ]}
//           >
//             <Input type="number" className="custom-input" />
//           </Form.Item>

//           <Form.Item>
//             <Button htmlType="submit" className="btn reset-balance-btn">
//               Create Budget
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BudgetCard;













































// BudgetCard.js
// import React, { useState } from 'react';
// import { Button, Modal, Form, Input } from 'antd';
// import { firestore } from '../../firebase';
// import { addDoc, collection } from 'firebase/firestore';

// const BudgetCard = ({ onFinish, updateBudgets }) => {
//   const [form] = Form.useForm();
//   const [modalVisible, setModalVisible] = useState(false);

//   // const handleFinish = async (values) => {
//   //   try {
//   //     const docRef = await firestore.collection('budgets').add(values);
//   //     const newBudget = { ...values, id: docRef.id };
//   //     onFinish();
//   //     updateBudgets((prevBudgets) => [...prevBudgets, newBudget]);
//   //     form.resetFields();
//   //     setModalVisible(false); // Close the modal after finishing
//   //   } catch (error) {
//   //     console.error('Error adding budget:', error);
//   //   }
//   // };



//   const handleFinish = async (values) => {
//     try {
//       const docRef = await firestore.collection('budgets').add(values);
//       const newBudget = { ...values, id: docRef.id };
//       console.log('New Budget:', newBudget); // Log the new budget
//       onFinish();
//       updateBudgets(); // Fetch and update budgets
//       form.resetFields();
//       setModalVisible(false); // Close the modal after finishing
//     } catch (error) {
//       console.error('Error adding budget:', error);
//     }
//   };
  
  

//   return (
//     <div>
//       <Button onClick={() => setModalVisible(true)}>Add Budget</Button>

//       <Modal
//         style={{ fontWeight: 600 }}
//         title="Create Budget"
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleFinish}>
//           <Form.Item
//             style={{ fontWeight: 600 }}
//             label="Budget Name"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter the budget name',
//               },
//             ]}
//           >
//             <Input type="text" className="custom-input" />
//           </Form.Item>

//           <Form.Item
//             style={{ fontWeight: 600 }}
//             label="Budget Amount"
//             name="amount"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter the budget amount',
//               },
//             ]}
//           >
//             <Input type="number" className="custom-input" />
//           </Form.Item>

//           <Form.Item>
//             <Button htmlType="submit" className="btn reset-balance-btn">
//               Create Budget
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BudgetCard;






















// BudgetCard.js
import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { firestore } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const BudgetCard = ({ userId, onFinish }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const handleFinish = async (values) => {
    try {
      const userRef = doc(firestore, 'users', userId);
      const budgetRef = collection(userRef, 'budgets');
      const newBudgetDoc = await addDoc(budgetRef, values);

      // If you need to do something after adding the budget, you can use newBudgetDoc
      console.log('Budget added with ID: ', newBudgetDoc.id);

      onFinish();
      form.resetFields();
      setModalVisible(false); // Close the modal after finishing
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>Add Budget</Button>

      <Modal
        style={{ fontWeight: 600 }}
        title="Create Budget"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
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
            <Input type="number" className="custom-input" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="btn reset-balance-btn">
              Create Budget
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BudgetCard;

