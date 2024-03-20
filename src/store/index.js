import { createStore } from 'vuex'
import axios from 'axios'

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export default createStore({

	state: {
		user: null,
		productCategories: [],
		products: [],
		productCategoriesProducts: [],
	},

	getters: {

		productCategory: (state) => (id) => {
			const res = state.productCategories.find(productCategory => productCategory.id == id)
			return res
		},

		productCategories: (state) => {
			return state.productCategories
		},

		product: (state) => (id) => {
			const res = state.products.find(prod => prod.id == id)
			return res
		},

		productsByCategory: (state) => (productCategoryId) => {
			const relations = state.productCategoriesProducts.filter(pcp => pcp.productCategoryId === productCategoryId)
			return relations.map(relation => state.products.find(prod => prod.id === relation.productId))
		}
	},

	mutations: {
		
		setUser (state, user) {
			state.user = user;
		},

		addProductCategories (state, productCategories) {
			productCategories.forEach(productCategory => {
				if (!state.productCategories.find(pc => pc.id == productCategory.id)) {
					state.productCategories.push(productCategory)
				}
			});
		},

		addProducts (state, products) {
			products.forEach(product => {
				if (!state.products.find( prod => prod.id === product.id)) {
					state.products.push(product);
				}
			});
		},

		addProductCategoriesProducts (state, { productCategoryId, products }) {
			if (!state.productCategoriesProducts.find(pcp => pcp.productCategoryId == productCategoryId)) {
				products.forEach((product)=> {
					state.productCategoriesProducts.push({productId:product.id, productCategoryId:productCategoryId})
				})
			}
		},

		setProductDetail (state, {productId, detail}){
			const product = state.products.find( prod => prod.id == productId)
			product.detail = detail
		}
	},

	actions: {
		
		async fetchProductCategories ({ commit }) {
			try {
				const res = await axios(`${BASE_API_URL}/ProductCategory`)
				const categories = res.data
				commit('addProductCategories', categories)
				return categories
			} catch (error) {
				console.error("Error fetching categories:", error)
			}
		},

		async fetchProductsByCategory ({ commit }, productCategoryId) {
			try {
				const res = await axios(`${BASE_API_URL}/Product/byProductCategoryId/` + productCategoryId)
				const products = res.data
				commit('addProducts', products)
				commit('addProductCategoriesProducts', { productCategoryId, products })
				return products
			} catch (error) {
				console.error("Error fetching products for category:", error)
			}
		},

		async fetchProductDetail ({ commit }, productId) {
			try {
				const res = await axios(`${BASE_API_URL}/Product/productDetail/` + productId)
				const detail = res.data
				commit('setProductDetail', {productId, detail})
				return res.data
			} catch (error) {
				console.error("Error fetching detail for product:", error)
			}
		},

		async login ({ commit }, credentials) {
			try {
				const res = await axios.post(`${BASE_API_URL}/login`, credentials)
				const user = res.data
				/***
					De user is alleen voor het demonstreren van login en autorisatie
					Op dit moment worden er alleen sessie gegevens gezet
				*/
				commit('setUser', user)
				return user
			} catch (error) {
				console.error("Error logging in:", error)
			}
		},

		async register ({}, credentials) {
			try {
				await axios.post(`${BASE_API_URL}/register`, credentials)
				return 'Success!'
			} catch (error) {
				console.error("Error registering:", error)
			}
		},

		async fetchUserAccount ({ state }) {
			/***
				Deze functie dient momenteel alleen voor het demonstreren van authorized requests
				Er wordt geen data opgehaald
				De userId is een mock variabele, deze wordt niet gebruikt
			*/
			const token = state.user?.accessToken
			const userId = 999
			try {
				const res = await axios.get(`${BASE_API_URL}/UserAccount/`+userId, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				return res
			} catch (error) {
				console.error("Error logging in:", error)
			}
		}
	},

	modules: {}
});
