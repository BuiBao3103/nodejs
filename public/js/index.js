import '@babel/polyfill'
import { displayMap } from './mapbox'
import { login, logout } from './login'
import { register } from './register'

//DOM ELEMENTS
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.formLogin')
const registerForm = document.querySelector('.formRegister')
const logOutBtn = document.querySelector('.nav__el--logout')


//DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations)
  displayMap(locations)
}


if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  })
}
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
    register(name, email, password, passwordConfirm)
  })
}

if (logOutBtn)
  logOutBtn.addEventListener('click', logout)