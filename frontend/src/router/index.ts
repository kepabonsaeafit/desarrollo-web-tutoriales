import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import BooksIndexView from '@/views/BooksIndexView.vue';
import BooksShowView from '@/views/BooksShowView.vue';
import BooksCreateView from '@/views/BooksCreateView.vue';
import ContactView from '@/views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
    { path: '/books', name: 'books', component: BooksIndexView, meta: { title: 'Books' } },
    {
      path: '/books/create',
      name: 'books.create',
      component: BooksCreateView,
      meta: { title: 'Create Book' },
    },
    { path: '/books/:id', name: 'book', component: BooksShowView, meta: { title: 'Book' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } },
  ],
});

export default router;
