import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookShelf from '../views/BookShelf.vue'
import User from '../views/User.vue'
import Book from '../views/Book.vue'
import Reader from '../views/Reader.vue'
import Chapter from '../views/Chapter.vue'
import List from '../views/List.vue'
import Search from '../views/Search'
import Login from '../views/Login'
import Register from '../views/Register'
import Setting from '../views/Setting'
import ResetPassword from '../views/ResetPassword'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/bookshelf',
    name: 'bookshelf',
    component: BookShelf
  },
  {
    path:'/user',
    name: 'user',
    component: User
  },
  {
    path:'/book',
    name: 'book',
    component: Book
  },
  {
    path:'/reader',
    name: 'reader',
    component: Reader
  },
  {
    path: '/chapter',
    name: 'chapter',
    component: Chapter
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/search',
    name: 'search',
    component: Search

  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  }
]

const router = new VueRouter({
  routes
})

export default router
