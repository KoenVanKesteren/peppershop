import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductCategoryView from '../views/ProductCategoryView.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/home',
			redirect: { name: 'home' }
		},
		{
			path: '/category/:id',
			name: 'category',
			component: ProductCategoryView
		},
		{
			path: '/product/:id',
			name: 'product',
			component: ProductView
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView
		},
		{ 
			path: '/:pathMatch(.*)*',
			name: 'NotFound', 
			component: NotFoundView
		},
	]
})

export default router