// import React from 'react';
// import { Table, Popconfirm, Button, message } from 'antd';
// import "../components/BudgetsTable.css";

import { Button, Popconfirm, Table ,message} from "antd";

// const BudgetSummaryTable = ({ budgets, transactions, deleteBudget }) => {
//   // Calculate spent and remaining amounts for each budget
//   const data = budgets.map((budget) => {
//     const spent = transactions
//       .filter((transaction) => transaction.budgetId === budget.id && transaction.type === 'expense')
//       .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

//     const remaining = budget.amount - spent;

//     return {
//       ...budget,
//       spent,
//       remaining,
//     };
//   });

//   const columns = [
//     {
//       title: 'Category',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Limit',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: (amount) => `₹ ${amount}`,
//     },
//     {
//       title: 'Spent',
//       dataIndex: 'spent',
//       key: 'spent',
//       render: (spent) => `₹ ${spent}`,
//     },
//     {
//       title: 'Remaining',
//       dataIndex: 'remaining',
//       key: 'remaining',
//       render: (remaining) => `₹ ${remaining}`,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Popconfirm
//           title="Are you sure to delete this budget?"
//           onConfirm={() => handleDeleteBudget(record.id)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="danger" className='budgetTable-btn'>Delete</Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   const handleDeleteBudget = async (budgetId) => {
//     try {
//       await deleteBudget(budgetId);
//       message.success('Budget deleted successfully');
//     } catch (error) {
//       console.error('Error deleting budget:', error);
//       message.error('Failed to delete budget');
//     }
//   };

//   return <Table dataSource={data} columns={columns} />;
// };

// export default BudgetSummaryTable;

// // import React from 'react';
// // import { Table, Popconfirm, Button, message } from 'antd';

// // const BudgetSummaryTable = ({ budgets, transactions, deleteBudget }) => {
// //   // Calculate spent and remaining amounts for each budget
// //   const data = budgets.map((budget) => {
// //     const budgetTransactions = transactions.filter(
// //       (transaction) => transaction.budgetId === budget.id && transaction.type === 'expense'
// //     );

// //     const spent = budgetTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
// //     const remaining = budget.amount - spent;

// //     console.log(`Budget ${budget.id}: Spent - ${spent}, Remaining - ${remaining}`);

// //     return {
// //       ...budget,
// //       spent,
// //       remaining,
// //     };
// //   });

// //   useEffect(() => {
// //     console.log('Component re-rendered with updated data:', data);
// //   }, [budgets, transactions]);
// //   const columns = [
// //     {
// //       title: 'Category',
// //       dataIndex: 'name',
// //       key: 'name',
// //     },
// //     {
// //       title: 'Limit',
// //       dataIndex: 'amount',
// //       key: 'amount',
// //       render: (amount) => `₹ ${amount}`,
// //     },
// //     {
// //       title: 'Spent',
// //       dataIndex: 'spent',
// //       key: 'spent',
// //       render: (spent) => `₹ ${spent.toFixed(2)}`, // Display spent with two decimal places
// //     },
// //     {
// //       title: 'Remaining',
// //       dataIndex: 'remaining',
// //       key: 'remaining',
// //       render: (remaining) => `₹ ${remaining.toFixed(2)}`, // Display remaining with two decimal places
// //     },
// //     {
// //       title: 'Actions',
// //       key: 'actions',
// //       render: (text, record) => (
// //         <Popconfirm
// //           title="Are you sure to delete this budget?"
// //           onConfirm={() => handleDeleteBudget(record.id)}
// //           okText="Yes"
// //           cancelText="No"
// //         >
// //           <Button type="danger" className='budgetTable-btn'>Delete</Button>
// //         </Popconfirm>
// //       ),
// //     },
// //   ];

// //   const handleDeleteBudget = async (budgetId) => {
// //     try {
// //       await deleteBudget(budgetId);
// //       message.success('Budget deleted successfully');
// //     } catch (error) {
// //       console.error('Error deleting budget:', error);
// //       message.error('Failed to delete budget');
// //     }
// //   };

// //   return <Table dataSource={data} columns={columns} />;
// // };

// // export default BudgetSummaryTable;



// import React from 'react';
// import { Table, Popconfirm, Button, message } from 'antd';

// const BudgetSummaryTable = ({ budgets, transactions, deleteBudget }) => {
//   const handleDeleteBudget = async (budgetId) => {
//     try {
//       await deleteBudget(budgetId);
//       message.success('Budget deleted successfully');
//     } catch (error) {
//       console.error('Error deleting budget:', error);
//       message.error('Failed to delete budget');
//     }
//   };

//   // Calculate spent and remaining amounts for each budget
//   const data = budgets.map((budget) => {
//     const spent = transactions
//       .filter((transaction) => transaction.budgetId === budget.id && transaction.type === 'expense')
//       .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

//     const remaining = budget.amount - spent;

//     return {
//       ...budget,
//       spent,
//       remaining,
//     };
//   });

//   const columns = [
//     {
//       title: 'Category',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Limit',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: (amount) => `₹ ${amount}`,
//     },
//     {
//       title: 'Spent',
//       dataIndex: 'spent',
//       key: 'spent',
//       render: (spent) => `₹ ${spent.toFixed(2)}`, // Display spent with two decimal places
//     },
//     {
//       title: 'Remaining',
//       dataIndex: 'remaining',
//       key: 'remaining',
//       render: (remaining) => `₹ ${remaining.toFixed(2)}`, // Display remaining with two decimal places
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Popconfirm
//           title="Are you sure to delete this budget?"
//           onConfirm={() => handleDeleteBudget(record.id)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="danger" className='budgetTable-btn'>Delete</Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   return <Table dataSource={data} columns={columns} />;
// };

// export default BudgetSummaryTable;






const BudgetSummaryTable = ({ budgets, transactions, deleteBudget }) => {
    const handleDeleteBudget = async (budgetId) => {
        try {
          await deleteBudget(budgetId);
          message.success('Budget deleted successfully');
        } catch (error) {
          console.error('Error deleting budget:', error);
          message.error('Failed to delete budget');
        }
      };
    
      // Calculate spent and remaining amounts for each budget
      const data = budgets.map((budget) => {
        const budgetTransactions = transactions.filter(
          (transaction) => transaction.budgetId === budget.id && transaction.type === 'expense'
        );
    
        // Calculate spent for the specific budget
        const spent = budgetTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
        // Calculate remaining for the specific budget
        const remaining = budget.amount - spent;
    
        return {
          ...budget,
          spent,
          remaining,
        };
      });
    
  
    const columns = [
      {
        title: 'Category',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Limit',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => `₹ ${amount}`,
      },
      {
        title: 'Spent',
        dataIndex: 'spent',
        key: 'spent',
        render: (spent) => `₹ ${spent.toFixed(2)}`, // Display spent with two decimal places
      },
      {
        title: 'Remaining',
        dataIndex: 'remaining',
        key: 'remaining',
        render: (remaining) => `₹ ${remaining.toFixed(2)}`, // Display remaining with two decimal places
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Popconfirm
            title="Are you sure to delete this budget?"
            onConfirm={() => handleDeleteBudget(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" className='budgetTable-btn'>Delete</Button>
          </Popconfirm>
        ),
      },
    ];
  
    return <Table dataSource={data} columns={columns} />;
  };
  
  export default BudgetSummaryTable;
  