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
  
    // Add expense
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('expenseName').value;
      const amount = parseFloat(document.getElementById('expenseAmount').value);
      if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
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
      }
    });
  });  