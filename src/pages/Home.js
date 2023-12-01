// FrontPage.jsx

import React from "react";
import "../pages/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="front-page">
      <h1>Welcome to Persoanl Expense Tracker</h1>

      <main>
        <section>
          <p>
            A personal finance tracker is a tool or application designed to help
            individuals manage their financial activities, monitor spending
            habits, and achieve their financial goals. These trackers can come
            in various forms, including mobile apps, web-based platforms, or
            even traditional spreadsheets. The primary goal is to provide users
            with a comprehensive view of their financial health and empower them
            to make informed decisions about their money. Key features of a
            personal finance tracker may include: Expense Tracking: Users can
            record and categorize their daily expenses, allowing them to
            visualize where their money is going. This helps individuals
            identify areas where they can cut back or optimize spending.
          </p>
        </section>
        <section>
          <Link to="/signup">
            <button>Get Started</button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
