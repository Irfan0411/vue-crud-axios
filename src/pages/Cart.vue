<template>
    <div class="container">
        <span class="fs-1">Keranjang Belanja</span>
        <div class="row fw-semibold border-bottom align-items-center">
            <div class="col">Name</div>
            <div class="col">Quantity</div>
            <div class="col">Price</div>
            <div class="col"></div>
        </div>
        <ItemCart v-for="(item, index) in cart" :key="index" :index="index" :item="item" />
        <div class="row fw-semibold align-items-center border-bottom">
            <div class="col">Total:</div>
            <div class="col">Rp. {{ ribuan(totalBayar) }}</div>
        </div>
        <br>
        <RouterLink to="/" class="btn btn-success me-1"><div class="i-back"></div> Back</RouterLink>
        <button @click="checkOut()" class="btn btn-success">Checkout</button>
    </div>
</template>

<script>
import ItemCart from '@/components/ItemCart.vue';
import swal from 'sweetalert'

export default {
    name: "cart-page",
    components: { ItemCart },
    methods: {
        ribuan(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        checkOut() {
            swal("Success", "total yang harus dibayar Rp. " + this.ribuan(this.totalBayar), "success")
            this.$store.dispatch('checkOut')
        }

    },
    computed: {
        totalBayar() {
            const total = this.cart.reduce((sum, value) => {
                return sum + value.price
            }, 0)
            return total
        },
        cart() {
            return this.$store.getters.getCart
        }
    }
}
</script>