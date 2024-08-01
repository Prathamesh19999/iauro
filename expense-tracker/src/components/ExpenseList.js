import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function ExpenseList({ token }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: token }
        });
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpenses();
  }, [token]);

  const categories = [...new Set(expenses.map(exp => exp.category))];
  const data = categories.map(cat => 
    expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
  );

  const chartData = {
    labels: categories,
    datasets: [{
      data,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  return (
    <div>
      <h2>Expense List</h2>
      <Pie data={chartData} />
      <ul>
        {expenses.map(exp => (
          <li key={exp._id}>
            {exp.category}: ${exp.amount} - {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
