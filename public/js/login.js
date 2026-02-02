import axios from 'axios';
import { showAlert } from './alerts';

const form = document.querySelector('.form--login');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert('An error occurred during login.');
    }
  }
};

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

export const logout = async () => {
  console.log('Logging out...');
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      console.log('Logout success, reloading...');
      location.assign('/');
    }
  } catch (err) {
    console.log('Logout error:', err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
