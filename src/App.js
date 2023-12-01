// import "./App.css";
// import Header from "./components/Header";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/Home";
// // import "antd/dist/antd.css"; // Add this line to import the Ant Design CSS

// function App() {
//   return (
//     <div className="App">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Signup />} />
//           {/* <Route path="/" element={<Home />} />
//           <Route path="/signup">{<Signup />}</Route> */}
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home'; // Import the new FrontPage component
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
