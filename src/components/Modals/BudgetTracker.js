// import React, { useState } from 'react';
// import "../Modals/BudgetTracker.css";
// const BudgetTracker = () => {
//   // State for managing budgets
//   const [budgets, setBudgets] = useState([]);
//   // State for managing expenses
//   const [expenses, setExpenses] = useState([]);
//   // State for tracking the current budget being added
//   const [currentBudget, setCurrentBudget] = useState({
//     name: '',
//     amount: 0,
//   });
//   // State for tracking the current expense being added
//   const [currentExpense, setCurrentExpense] = useState({
//     name: '',
//     amount: 0,
//   });

//   // Function to handle adding a budget
//   const addBudget = () => {
//     setBudgets([...budgets, currentBudget]);
//     setCurrentBudget({ name: '', amount: 0 });
//   };

//   // Function to handle adding an expense
//   const addExpense = () => {
//     // Check if the expense exceeds the budget limit
//     const remainingBudget = currentBudget.amount - currentExpense.amount;
//     if (remainingBudget < 0) {
//       alert('Expense exceeds the budget limit!');
//       return;
//     }

//     setExpenses([...expenses, currentExpense]);
//     setCurrentExpense({ name: '', amount: 0 });
//   };

//   // Function to calculate the remaining budget
//   const calculateRemainingBudget = (budget) => {
//     const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
//     return budget.amount - totalExpense;
//   };

//   return (
//     <div className="budget-tracker-card">
//       <h1>Budget Tracker</h1>

//       {/* Add Budget Form */}
//       <div className="form-section">
//         <h2>Add Budget</h2>
//         <input
//           type="text"
//           placeholder="Budget Name"
//           value={currentBudget.name}
//           onChange={(e) => setCurrentBudget({ ...currentBudget, name: e.target.value })}
//           className="input-field"
//         />
//         <input
//           type="number"
//           placeholder="Budget Amount"
//           value={currentBudget.amount}
//           onChange={(e) => setCurrentBudget({ ...currentBudget, amount: +e.target.value })}
//           className="input-field"
//         />
//         <button onClick={addBudget} className="button">
//           Add Budget
//         </button>
//       </div>

//       {/* Add Expense Form */}
//       <div className="form-section">
//         <h2>Add Expense</h2>
//         <select
//           value={currentBudget.name}
//           onChange={(e) => setCurrentExpense({ ...currentExpense, name: e.target.value })}
//           className="select-field"
//         >
//           <option value="">Select Budget</option>
//           {budgets.map((budget) => (
//             <option key={budget.name} value={budget.name}>
//               {budget.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Expense Name"
//           value={currentExpense.name}
//           onChange={(e) => setCurrentExpense({ ...currentExpense, name: e.target.value })}
//           className="input-field"
//         />
//         <input
//           type="number"
//           placeholder="Expense Amount"
//           value={currentExpense.amount}
//           onChange={(e) => setCurrentExpense({ ...currentExpense, amount: +e.target.value })}
//           className="input-field"
//         />
//         <button onClick={addExpense} className="button">
//           Add Expense
//         </button>
//       </div>

//       {/* Display Budgets */}
//       <div className="list-section">
//         <h2>Budgets</h2>
//         <ul className="list">
//           {budgets.map((budget) => (
//             <li key={budget.name} className="list-item">
//               {budget.name}: ₹ {budget.amount} (Remaining: ₹ {calculateRemainingBudget(budget)})
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Display Expenses */}
//       <div className="list-section">
//         <h2>Expenses</h2>
//         <ul className="list">
//           {expenses.map((expense, index) => (
//             <li key={index} className="list-item">
//               {expense.name}: ₹ {expense.amount}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BudgetTracker;




