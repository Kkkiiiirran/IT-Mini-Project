// public/script.js
async function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
  
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    alert(await response.text());
  }
  
  async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    alert(await response.text());
  }
  
  async function logout() {
    const response = await fetch('/logout');
    alert(await response.text());
  }
  
  async function checkProfile() {
    const response = await fetch('/profile');
    alert(await response.text());
  }
  