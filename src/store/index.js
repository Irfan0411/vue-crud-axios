import { createStore } from 'vuex'
import axios from 'axios'

const api = 'http://localhost:3000/'

const store = createStore({
    state() {
        return {
            product: [],
            cart: []
        }
    },
    getters: {
        getProduct(state) {
            return state.product
        },
        getCart(state) {
            return state.cart
        }
    },
    mutations: {
        getData(state, payload) {
            state.product = payload.product
            state.cart = payload.cart
        },
        addOne(state, payload) {
            state.product[payload.index].stock--
            const id = state.cart.length + 1
            const i = state.cart.findIndex(e => e.name === payload.item.name)
            if (i === -1) {
                state.cart = [...state.cart, { name: payload.item.name, quantity: 1, price: payload.item.price, id }]
            } else {
                state.cart[i].quantity++
                state.cart[i].price += payload.item.price
            }
        },
        addAll(state, payload) {
            const id = state.cart.length + 1
            const i = state.cart.findIndex(e => e.name === payload.item.name)
            if (i === -1) {
                state.cart = [...state.cart, { name: payload.item.name, quantity: payload.item.stock, price: payload.item.price * payload.item.stock, id }]
            } else {
                state.cart[i].quantity += payload.item.stock
                state.cart[i].price += payload.item.price * payload.item.stock
            }
            state.product[payload.index].stock = 0
        },
        deleteOne(state, payload) {
            const i = state.product.findIndex(e => e.name === payload.item.name)
            state.product[i].stock++
            state.cart[payload.index].quantity--
            state.cart[payload.index].price -= state.product[i].price
            if (state.cart[payload.index].quantity === 0) state.cart.splice(payload.index, 1)
        },
        deleteAll(state, payload) {
            const i = state.product.findIndex(e => e.name === payload.item.name)
            state.product[i].stock += payload.item.quantity
            state.cart.splice(payload.index, 1)
        },
        checkOut(state) {
            state.cart = []
        }
    },
    actions: {
        async getData(context) {
            let product = []
            let cart = []
            await axios(api+'product').then(json => product = json.data)
            await axios(api+'cart').then(json => cart = json.data)
            context.commit('getData', { product, cart})
        },
        async addOne(context, payload) {
            try {
                await axios.patch(api+'product/'+payload.item.id, {stock: payload.item.stock-1})
                const i = context.state.cart.findIndex(e => e.name === payload.item.name)
                if (i === -1) {
                    await axios.post(api+'cart', { name: payload.item.name, quantity: 1, price: payload.item.price })
                } else {
                    await axios.patch(api+'cart/'+(i+1), {quantity: context.state.cart[i].quantity + 1, price: context.state.cart[i].price + payload.item.price})
                }
                context.commit('addOne', payload)   
            } catch (err) {
                console.log(err)
            }
        },
        async addAll(context, payload) {
            try {
                const i = context.state.cart.findIndex(e => e.name === payload.item.name)
                if (i === -1) {
                    await axios.post(api+'cart', { name: payload.item.name, quantity: payload.item.stock, price: payload.item.price * payload.item.stock })
                } else {
                    await axios.patch(api+'cart/'+(i+1), { quantity: context.state.cart[i].quantity + payload.item.stock, price: context.state.cart[i].price + payload.item.price * payload.item.stock })
                }
                await axios.patch(api+'product/'+payload.item.id, { stock: 0 })
                context.commit('addAll', payload)
            } catch (err) {
                console.log(err)
            }
        },
        async deleteOne(context, payload) {
            try {
                const i = context.state.product.findIndex(e => e.name === payload.item.name)
                await axios.patch(api+'product/'+(i+1), { stock: context.state.product[i].stock + 1})
                await axios.patch(api+'cart/'+payload.item.id, { quantity: context.state.cart[payload.index].quantity - 1, price: context.state.cart[payload.index].price - context.state.product[i].price })
                if (context.state.cart[payload.index].quantity === 1) {
                    await axios.delete(api+'cart/'+payload.item.id)
                }               
                context.commit('deleteOne', payload) 
            } catch (err) {
                console.log(err);
            }
        },
        async deleteAll(context, payload) {
            try {
                const i = context.state.product.findIndex(e => e.name === payload.item.name)
                await axios.patch(api+'product/'+(i+1), { stock: context.state.product[i].stock + payload.item.quantity})
                await axios.delete(api+'cart/'+payload.item.id)  
                context.commit('deleteAll', payload)
            } catch (err) {
                console.log(err);
            }
        },
        checkOut(context) {
            try {
                const cart = context.state.cart
                cart.forEach(async item => await axios.delete(api+'cart/'+item.id))
                context.commit('checkOut')
            } catch (err) {
                console.log(err)
            }
        }
    }
})

export default store