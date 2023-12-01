import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Modal from "antd/es/modal/Modal";
import AddExpense from "../components/Modals/addExpense";
import AddIncome from "../components/Modals/addIncome";
import AddBudget from "../components/Modals/AddBudget";
// import BudgetCard from "../components/BudgetCard"; // Import a component for displaying each budget card
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query, doc, deleteDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";
import ChartComponent from "../components/Charts";
import { Card } from "antd";
import '../pages/Dashboard.css';





import { Button, Popconfirm, message } from 'antd';
import CurrencyConverter from "../components/CurrencyConverter";

// const BudgetCard = ({ budget, deleteBudget }) => {
//   const confirmDelete = () => {
//     deleteBudget(budget.id);
//     message.success('Budget deleted successfully');
//   };

//   return (
//     <Card className="mybudget">
//       <h2 className="title">{budget.name}</h2>
//       <p>Amount: ₹ {budget.amount}</p>
//       <p>Date: {budget.date}</p>
//       <Popconfirm
//         title="Are you sure to delete this budget?"
//         onConfirm={confirmDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button className="btn reset-balance-btn" danger>
//           Delete
//         </Button>
//       </Popconfirm>
//     </Card>
//   );
// };

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
  const [selectedBudget, setSelectedBudget] = useState(null);

  // const showExpenseModal = () => {
  //   setIsExpenseModalVisible(true);
  // };





  const showExpenseModal = (budget) => {
    setSelectedBudget(budget); // Set the selected budget
    setIsExpenseModalVisible(true);
  };


  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  // const handleExpenseCancel = () => {
  //   setIsExpenseModalVisible(false);
  // };




  const handleExpenseCancel = () => {
    setSelectedBudget(null); // Clear the selected budget when the modal is canceled
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

      setBudgets(budgetArray);
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
      await deleteDoc(doc(db, `users/${user.uid}/budgets`, budgetId));
      setBudgets(budgets.filter((budget) => budget.id !== budgetId));
      message.success('Budget deleted successfully');
    } catch (error) {
      console.error('Error deleting budget:', error);
      message.error('Failed to delete budget');
    }
  };

  // Add this function definition
const updateBudget = async (budget) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const budgetRef = collection(userRef, "budgets", budget.id);
    await setDoc(budgetRef, budget);
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error; // Propagate the error to handle it in the component
  }
};


const onFinish = (values, type, selectedBudget) => {
  const newTransaction = {
    type: type,
    date: values.date.format("DD-MM-YYYY"),
    amount: parseFloat(values.amount),
    name: values.name,
  };

  // Check if it's an expense and a budget is selected
  if (type === "expense" && selectedBudget) {
    // Update the budget
    const updatedBudget = {
      ...selectedBudget,
      spent: selectedBudget.spent + newTransaction.amount,
      remaining: selectedBudget.remaining - newTransaction.amount,
    };

    // Call the updateBudget function to update the budget in Firestore
    updateBudget(updatedBudget);

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

  // Close the modals
  setIsExpenseModalVisible(false);
  setIsIncomeModalVisible(false);
};


  return (
    <div>
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        showBudgetModal={showBudgetModal}
        income={income}
        expense={expense}
        currentBalance={currentBalance}
      />

      {/* Render Budget Cards */}
      {/* <div className="budget-cards-container">
        {budgets.map((budget) => (
          <Card key={budget.id} className="mybudget">
            <h2 className="title">{budget.name}</h2>
            <p>Amount: ₹ {budget.amount}</p>
          </Card>
        ))}
      </div> */}



<div className="budget-cards-container">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} deleteBudget={deleteBudget} />
        ))}
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

      <CurrencyConverter />
    </div>
  );
};

export default Dashboard;



































// import React, { useEffect, useState } from "react";
// import Cards from "../components/Cards";
// import Modal from "antd/es/modal/Modal";
// import AddExpense from "../components/Modals/addExpense";
// import AddIncome from "../components/Modals/addIncome";
// import { toast } from "react-toastify";
// import { auth, db } from "../firebase";
// import { addDoc, collection, getDocs, query, doc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import TransactionsTable from "../components/TransactionsTable";
// import ChartComponent from "../components/Charts";
// import AddBudget from "../components/Modals/AddBudget";

// const Dashboard = () => {
//   const [user] = useAuthState(auth);
//   const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
//   const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);
//   const [currentBalance, setCurrentBalance] = useState(0);
//   const [showBudgetModal, setShowBudgetModal] = useState(false);
//   const [budgets, setBudgets] = useState([]);

//   const showExpenseModal = () => {
//     setIsExpenseModalVisible(true);
//   };

//   const showIncomeModal = () => {
//     setIsIncomeModalVisible(true);
//   };

//   const handleExpenseCancel = () => {
//     setIsExpenseModalVisible(false);
//   };

//   const handleIncomeCancel = () => {
//     setIsIncomeModalVisible(false);
//   };

//   const fetchTransactions = async () => {
//     if (user) {
//       const dataRef = query(collection(db, `users/${user.uid}/transactions`));
//       const querySnapshot = await getDocs(dataRef);
//       let transactionArray = [];
//       querySnapshot.forEach((doc) => {
//         transactionArray.push({ ...doc.data(), id: doc.id });
//       });
//       setTransactions(transactionArray);
//       toast.success("Transaction Fetched!");
//     }
//   };

//   const fetchBudgets = async () => {
//     if (user) {
//       const userRef = doc(db, 'users', user.uid);
//       const budgetsRef = collection(userRef, 'budgets');
//       const querySnapshot = await getDocs(budgetsRef);
  
//       let budgetArray = [];
//       querySnapshot.forEach((doc) => {
//         budgetArray.push({ ...doc.data(), id: doc.id });
//       });
  
//       setBudgets(budgetArray);
//       toast.success('Budgets Fetched!');
//     }
//   };
  

//   useEffect(() => {
//     fetchTransactions();
//     fetchBudgets();
//   }, [user]);

//   useEffect(() => {
//     calculateBalance();
//   }, [transactions]);

//   const calculateBalance = () => {
//     let totalIncome = 0;
//     let totalExpense = 0;

//     transactions.forEach((transaction) => {
//       if (transaction.type === "income") {
//         totalIncome += parseFloat(transaction.amount);
//       } else {
//         totalExpense += parseFloat(transaction.amount);
//       }
//     });
//     setIncome(totalIncome);
//     setExpense(totalExpense);
//     setCurrentBalance(totalIncome - totalExpense);
//   };

//   const addTransaction = async (transaction, many) => {
//     try {
//       const docRef = await addDoc(
//         collection(db, `users/${user.uid}/transactions`),
//         transaction
//       );
//       if (!many) toast.success("Transaction Added!");
//       setTransactions([...transactions, transaction]);
//       calculateBalance();
//       fetchTransactions();
//     } catch (err) {
//       if (!many) toast.error("Couldn't add transaction");
//     }
//   };

//   const onFinish = (values, type) => {
//     const newTransaction = {
//       type: type,
//       date: values.date.format("DD-MM-YYYY"),
//       amount: parseFloat(values.amount),
//       name: values.name,
//     };
//     setTransactions([...transactions, newTransaction]);
//     setIsExpenseModalVisible(false);
//     setIsIncomeModalVisible(false);
//     addTransaction(newTransaction);
//   };

//   return (
//     <div>
//     <Cards
//         showExpenseModal={showExpenseModal}
//         showIncomeModal={showIncomeModal}
//         showBudgetModal={() => setShowBudgetModal(true)} // Pass the function
//         income={income}
//         expense={expense}
//         currentBalance={currentBalance}
//       />
//       <Modal open={isIncomeModalVisible} onCancel={handleIncomeCancel}>
//         Income
//       </Modal>
//       <Modal open={isExpenseModalVisible} onCancel={handleExpenseCancel}>
//         Expense
//       </Modal>
//       <AddExpense
//         isExpenseModalVisible={isExpenseModalVisible}
//         handleExpenseCancel={handleExpenseCancel}
//         onFinish={onFinish}
//       />
//       <AddIncome
//         isIncomeModalVisible={isIncomeModalVisible}
//         handleIncomeCancel={handleIncomeCancel}
//         onFinish={onFinish}
//       />
//       <div className="chart container">
//         {transactions.length !== 0 ? (
//           <div className="line-chart">
//             <ChartComponent transactions={transactions} />
//           </div>
//         ) : (
//           <div className="no-transaction">
//             <h2>No Transactions Available</h2>
//             <img
//               src={process.env.PUBLIC_URL + "/coin.gif"}
//               alt="No-transaction-img"
//             />
//           </div>
//         )}
//       </div>
//       <TransactionsTable
//         transactions={transactions}
//         addTransaction={addTransaction}
//         fetchTransactions={fetchTransactions}
//       />
//       <AddBudget userId={user.uid} onFinish={fetchBudgets} />

//       {/* Display budget list */}
//       <div className="budget-list-container">
//   {budgets.map((budget) => (
//     <div key={budget.id} className="budget-item">
//       <p className="budget-name">{budget.name}</p>
//       <p className="budget-amount">₹ {budget.amount}</p>
//     </div>
//   ))}
// </div>
//     </div>








//   );
// };

// export default Dashboard;
















