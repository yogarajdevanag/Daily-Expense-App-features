window.addEventListener('DOMContentLoaded', () => {
  fetch('/check-auth')
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('expense-form').style.display = 'block';
        loadExpenses();
      }
    });

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) location.reload();
    else alert('Login failed!');
  });
});
