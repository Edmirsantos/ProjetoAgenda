import 'core-js/stable'
import 'regenerator-runtime'


import './assets/css/style.css'

import Login from './modules/Login'

const cadastro = new Login('.form-cadastro')
const login = new Login('.form-cadastro')


cadastro.init()
login.init()
