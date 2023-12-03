import React from "react";
import AddBudget from "../Modals/AddBudget";
// import PropTypes from 'prop-types';
import "./styles.css";
import { Button, Card, Row } from "antd";

const Cards = ({ 
  showExpenseModal,
   showIncomeModal, 
   showBudgetModal, 
   income,
   expense,
  currentBalance }) => {

  // const savings = income - expense;

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
