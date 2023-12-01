// // // import AddBudget from "../Modals/AddBudget";

// // import AddBudget from "../Modals/AddBudget";
// // import "./styles.css";
// // import { Button, Card, Row } from "antd";

// // const Cards = ({
// //   showExpenseModal,
// //   showIncomeModal,
// //   showBudgetModal,
// //   income,
// //   expense,
// //   currentBalance,
// // }) => {

// //   const savings = income - expense;

// //   return (
// //     <div>
// //     <Row className="card-row container">
// //       <Card className="mycard current-balance">
// //         <h2 className="title">Current Balance</h2>
// //         <p>₹ {currentBalance}</p>
// //       </Card>
// //       <Card className="mycard">
// //         <h2 className="title">Total Income</h2>
// //         <p>₹ {income}</p>
// //         <Button className="btn reset-balance-btn" onClick={showIncomeModal}>
// //           Add Income
// //         </Button>
// //       </Card>
// //       <Card className="mycard">
// //         <h2 className="title">Total Expenses</h2>
// //         <p>₹ {expense}</p>
// //         <Button className="btn reset-balance-btn" onClick={showExpenseModal}>
// //           Add Expense
// //         </Button>
        
// //       </Card>

// //       <Card className="mycard">
// //         <h2 className="title">Savings</h2>
// //         <p>₹ {savings}</p>
// //       </Card>


   
// //     </Row>
// //     <button className="add-budget-btn" onClick={showBudgetModal}>
// //         Create Budget
// //       </button>
// //   </div>
// //   );
// // };

// // export default Cards;















// import React from "react";
// import { Button, Card, Row } from "antd";
// import AddBudget from "../Modals/AddBudget";

// const Cards = ({
//   showExpenseModal,
//   showIncomeModal,
//   showBudgetModal,
//   income,
//   expense,
//   currentBalance,
//   budgets,
// }) => {
//   const savings = income - expense;

//   return (
//     <div>
//       <Row className="card-row container">
//         <Card className="mycard current-balance">
//           <h2 className="title">Current Balance</h2>
//           <p>₹ {currentBalance}</p>
//         </Card>
//         <Card className="mycard">
//           <h2 className="title">Total Income</h2>
//           <p>₹ {income}</p>
//           <Button className="btn reset-balance-btn" onClick={showIncomeModal}>
//             Add Income
//           </Button>
//         </Card>
//         <Card className="mycard">
//           <h2 className="title">Total Expenses</h2>
//           <p>₹ {expense}</p>
//           <Button className="btn reset-balance-btn" onClick={showExpenseModal}>
//             Add Expense
//           </Button>
//         </Card>
//         <Card className="mycard">
//           <h2 className="title">Savings</h2>
//           <p>₹ {savings}</p>
//         </Card>
//         {/* Display budgets before the chart */}
//         {budgets && budgets.map((budget) => (
//           <Card className="mycard" key={budget.id}>
//             <h2 className="title">{budget.name}</h2>
//             <p>₹ {budget.amount}</p>
//           </Card>
//         ))}
//       </Row>
//       {/* Add BudgetCard component at the end */}
//       <Row className="chart container">
//         {/* <Button className="btn reset-balance-btn" onClick={showBudgetModal}>
//           Add Budget
//         </Button> */}
//       </Row>
//     </div>
//   );
// };

// export default Cards;






import AddBudget from "../Modals/AddBudget";
import "./styles.css";
import { Button, Card, Row } from "antd";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  showBudgetModal,
  income,
  expense,
  currentBalance,
}) => {

  const savings = income - expense;

  return (
    <div>
    <Row className="card-row container">
      <Card className="mycard current-balance">
        <h2 className="title">Current Balance</h2>
        <p>₹ {currentBalance}</p>
      </Card>
      <Card className="mycard">
        <h2 className="title">Total Income</h2>
        <p>₹ {income}</p>
        <Button className="btn reset-balance-btn" onClick={showIncomeModal}>
          Add Income
        </Button>
      </Card>
      <Card className="mycard">
        <h2 className="title">Total Expenses</h2>
        <p>₹ {expense}</p>
        <Button className="btn reset-balance-btn" onClick={showExpenseModal}>
          Add Expense
        </Button>
        
      </Card>

      {/* <Card className="mysavingcard">
        <h2 className="savingtitle">Savings</h2>
        <p className="save">₹ {savings}</p>
      </Card> */}

      <Card className="mybudget">
        <h2 className="title">Want to create new Budget?</h2>
       
        <Button className="btn reset-balance-btn" onClick={showBudgetModal}>
          Add Here
        </Button>
        
      </Card>

   
    </Row>
  </div>
  );
};

export default Cards;
