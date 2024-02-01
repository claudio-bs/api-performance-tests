import http from 'k6/http';
import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json';
import User from '../request/user.request'
import Products from '../request/products.request';
import Customers from '../request/customers.request';

export const options = {
  stages: [
      { duration: '5s', target: 10 },
      { duration: '10s', target: 50 },
      { duration: '5s', target: 50 },
      { duration: '5s', target: 0 },
      { duration: '15s', target: 20 },
  ],
  thresholds: {
      http_req_duration: ['p(99) < 1000']
  }
}

export default function () {
   
  let login = new Login()
  let user = new User()
  let products = new Products()
  let customers = new Customers()

  group('login and get token', () => {
    login.access(data.usuariosOk.user, data.usuariosOk.pass)
  })

  group('list users', () => {
    user.list(login.getToken())
  })

  group('list products', () => {
    products.list(login.getToken())
  })

  group('list customers', () => {
    customers.list(login.getToken())
  })

  }