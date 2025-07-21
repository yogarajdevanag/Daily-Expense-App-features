document.getElementById('expense-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const res = await fetch('/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, description, category })
  });

  const data = await res.json();
  renderExpense(data);
  e.target.reset();
});

function loadExpenses() {
  fetch('/expenses')
    .then(res => res.json())
    .then(data => {
      data.forEach(exp => renderExpense(exp));
    });
}

function renderExpense(expense) {
  const container = document.getElementById('expense-table-container');
  const div = document.createElement('div');
  div.innerHTML = `
    <span>${expense.amount} - ${expense.description} (${expense.category})</span>
    <button onclick="deleteExpense(${expense.id}, this)">Delete</button>
  `;
  container.appendChild(div);
}

function deleteExpense(id, btn) {
  fetch(`/expenses/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
      btn.parentElement.remove();
    });
}
