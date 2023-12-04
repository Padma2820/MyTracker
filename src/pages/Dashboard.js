import React, { useEffect, useRef, useState } from "react";
import Cards from "../components/Cards";
import Modal from "antd/es/modal/Modal";
import AddExpense from "../components/Modals/addExpense";
import AddIncome from "../components/Modals/addIncome";
import AddBudget from "../components/Modals/AddBudget";
import { where } from 'firebase/firestore'
// import BudgetCard from "../components/BudgetCard"; // Import a component for displaying each budget card
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";
import ChartComponent from "../components/Charts";
import { Card } from "antd";
import '../pages/Dashboard.css';
import {updateDoc} from 'firebase/firestore';
import { Button, Popconfirm, message } from 'antd';
import CurrencyConverter from "../components/Currency/CurrencyConverter";
import BudgetSummaryTable from "../components/BudgetSummaryTable";
import BudgetsTable from "../components/BudgetsTable";



const BudgetCard = ({ budget, deleteBudget }) => {
  const confirmDelete = () => {
    deleteBudget(budget.id);
    message.success('Budget deleted successfully');
  };

  return (
    <Card className="mybudget">
      <h2 className="title">{budget.name}</h2>
      <p>Amount: ₹ {budget.amount}</p>
     
      <p>Date: {budget.date}</p>
      <Popconfirm
        title="Are you sure to delete this budget?"
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button className="btn reset-balance-btn" danger>
          Delete
        </Button>
      </Popconfirm>
    </Card>
  );
};


const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const[budget,setBudget] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const currencyConverterRef = useRef(null);
 
  const showExpenseModal = (budget) => {
    setSelectedBudget(budget); // Set the selected budget
    setIsExpenseModalVisible(true);
  };

  

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

 



  const handleExpenseCancel = () => {
    // Clear any state or do cleanup if needed
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const showBudgetModal = () => {
    setIsBudgetModalVisible(true);
  };

  const handleBudgetCancel = () => {
    setIsBudgetModalVisible(false);
  };

  const fetchTransactions = async () => {
    if (user) {
      const dataRef = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(dataRef);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push({ ...doc.data(), id: doc.id });
      });
      setTransactions(transactionArray);
      toast.success("Transaction Fetched!");
    }
  };

  const fetchBudgets = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const budgetsRef = collection(userRef, "budgets");
      const querySnapshot = await getDocs(budgetsRef);

      let budgetArray = [];
      querySnapshot.forEach((doc) => {
        budgetArray.push({ ...doc.data(), id: doc.id });
      });
      const updatedBudgets = budgetArray.map((budget) => {
        const amount = parseFloat(budget.amount);
        const spent = parseFloat(budget.spent);
        const remaining = amount - spent;
        return { ...budget, remaining };
      });
      setBudgets(updatedBudgets);
      toast.success("Budgets Fetched!");
    }
  };




  
  
  
  
  


  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += parseFloat(transaction.amount);
      } else {
        totalExpense += parseFloat(transaction.amount);
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setCurrentBalance(totalIncome - totalExpense);
   
  };


 
  



  const updateBudget = async (selectedBudget, newTransaction) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const budgetRef = doc(userRef, 'budgets', selectedBudget.id);
  
      const budgetSnapshot = await getDoc(budgetRef);
      const currentBudget = budgetSnapshot.data();
  
      // Ensure the currentBudget is retrieved correctly
      if (!currentBudget) {
        console.error('Budget not found:', selectedBudget.id);
        return;
      }
  
      // Update the budget based on the transaction type (income/expense)
      let updatedBudget;
      if (newTransaction.type === 'expense') {
        updatedBudget = {
          ...currentBudget,
          spent: currentBudget.spent + newTransaction.amount,
          remaining: currentBudget.remaining - newTransaction.amount,
        };
      } else {
        updatedBudget = { ...currentBudget };
        // Add logic for updating budget in case of income (if needed)
      }
  
      await updateDoc(budgetRef, updatedBudget);
  
      // Log success message or perform additional actions if needed
      console.log('Budget updated successfully!', updatedBudget);
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  };
  
  

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success("Transaction Added!");
      setTransactions([...transactions, transaction]);
      calculateBalance();
      fetchTransactions();
    } catch (err) {
      if (!many) toast.error("Couldn't add transaction");
    }
  };

  const addBudget = async (budget) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const budgetRef = collection(userRef, "budgets");
      const newBudgetDoc = await addDoc(budgetRef, budget);

      // If you need to do something after adding the budget, you can use newBudgetDoc
      console.log("Budget added with ID: ", newBudgetDoc.id);

      setBudgets([...budgets, budget]);
      toast.success("Budget Added!");
      setIsBudgetModalVisible(false); // Close the modal after finishing
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };




  

  const deleteBudget = async (budgetId) => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/budgets/${budgetId}`));
      setBudgets(budgets.filter((budget) => budget.id !== budgetId));
      message.success('Budget deleted successfully');
    } catch (error) {
      console.error('Error deleting budget:', error);
      message.error('Failed to delete budget');
    }
  };

 
  
  // const updateBudget = async (budget, newTransaction) => {
  //   try {
  //     console.log('Updating budget. Budget:', budget, 'New Transaction:', newTransaction);
  //     const userRef = doc(db, 'users', user.uid);
  //     const budgetRef = doc(userRef, 'budgets', budget.id);
  
  //     const budgetSnapshot = await getDoc(budgetRef);
  //     const currentBudget = budgetSnapshot.data();
  
  //     // Ensure the currentBudget is retrieved correctly
  //     if (!currentBudget) {
  //       console.error('Budget not found:', budget.id);
  //       return;
  //     }
  
   
  //     let updatedBudget;
  //     if (newTransaction.type === 'expense') {
  //       updatedBudget = {
  //         ...currentBudget,
  //         spent: currentBudget.spent + newTransaction.amount,
  //         remaining: currentBudget.remaining - newTransaction.amount,
  //       };
  //     } else {
  //       updatedBudget = { ...currentBudget };
       
  //     }
  
  //     await updateDoc(budgetRef, updatedBudget);
  
   
  //     console.log('Budget updated successfully!', updatedBudget);
  //   } catch (error) {
  //     console.error('Error updating budget:', error);
   
  //     throw error; // Propagate the error to handle it in the component
  //   }
  // };

  const onFinish = (values, type, selectedBudget) => {
    // 1. Prepare the new transaction
    const newTransaction = {
      type: type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      name: values.name,
    };
  
    // 2. Check conditions and call necessary functions
    if (type === "expense" && selectedBudget) {
      // If it's an expense and a budget is selected
      // Call the updateBudget function with the necessary parameters
      updateBudget(selectedBudget, newTransaction);
      // Add the transaction to Firestore
      addTransaction(newTransaction);
      // Display a success toast
      toast.success("Expense added successfully!");
    } else {
      // If it's not an expense or no budget is selected, proceed with adding the transaction
      addTransaction(newTransaction);
      // Display a success toast
      toast.success("Transaction added successfully!");
    }
  
    // 3. Close the modals
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };
  
  // When adding an expense, make sure to set the expenses field in the budget document

  

  


  
    return (
      <>
   
    <div>
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        showBudgetModal={showBudgetModal}
        income={income}
        expense={expense}
        currentBalance={currentBalance}
      />

    <div className="budget-cards-container">
    {/* {budgets.map((budget) => (
  <BudgetCard key={budget.id} budget={budget} deleteBudget={deleteBudget} />
  
))} */}

<BudgetsTable budgets={budgets} transactions={transactions} deleteBudget={deleteBudget} />

      </div>


      {/* Budget Modal */}
      {isBudgetModalVisible && (
        <Modal open={true} onCancel={() => setIsBudgetModalVisible(false)}>
          <AddBudget
            isBudgetModalVisible={isBudgetModalVisible}
            handleBudgetCancel={() => setIsBudgetModalVisible(false)}
            addBudget={addBudget} 
          />
        </Modal>
      )}


      <Modal open={isIncomeModalVisible} onCancel={handleIncomeCancel}>
        Income
      </Modal>
      <Modal open={isExpenseModalVisible} onCancel={handleExpenseCancel}>
        Expense
      </Modal>
      <Modal open={isBudgetModalVisible} onCancel={handleBudgetCancel}>
        Budget
      </Modal>

      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
        budgets={budgets}
      />



      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddBudget
        isBudgetModalVisible={isBudgetModalVisible}
        handleBudgetCancel={handleBudgetCancel}
        addBudget={addBudget}
      />

      <div className="chart container">
        {transactions.length !== 0 ? (
          <div className="line-chart">
            <ChartComponent transactions={transactions} />
          </div>
        ) : (
          <div className="no-transaction">
            <h2>No Transactions Available</h2>
            <img
              src={process.env.PUBLIC_URL + "/coin.gif"}
              alt="No-transaction-img"
            />
          </div>
        )}
      </div>

      <TransactionsTable
        transactions={transactions}
        addTransaction={addTransaction}
        fetchTransactions={fetchTransactions}
      />

    
    </div>
    <CurrencyConverter />
    </>
  );
};

export default Dashboard;






























