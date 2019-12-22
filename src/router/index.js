import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookShelf from '../views/BookShelf.vue'
import User from '../views/User.vue'
import Book from '../views/Book.vue'
import Reader from '../views/Reader.vue'
import Chapter from '../views/Chapter.vue'
import List from '../views/List.vue'

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
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
