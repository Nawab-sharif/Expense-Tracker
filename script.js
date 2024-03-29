document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
  
    // Load expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Render expenses
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${expense.name} : Rs. ${expense.amount}
          <span class="delete" data-index="${index}">X</span>
        `;
        expenseList.appendChild(li);
      });
    }
    renderExpenses();

    // Calculate total expense
    function calculateTotalExpense() {
      const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      return total.toFixed(2);
    }

    // Render total expense
    function renderTotalExpense() {
      const totalExpenseDiv = document.getElementById('totalExpense');
      totalExpenseDiv.innerHTML = `Total Expense: Rs. ${calculateTotalExpense()}`;
    }
    renderTotalExpense();
  
    // Add expense
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('expenseName').value;
      const amount = parseFloat(document.getElementById('expenseAmount').value);
      if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        renderTotalExpense();
        expenseForm.reset();
      }
    });
  
    // Delete expense
    expenseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        renderTotalExpense();
      }
    });
  });  