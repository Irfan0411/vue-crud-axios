<template>
    <div class="container">
        <span class="fs-1">Semua Produk</span>
        <div class="row fw-semibold border-bottom align-items-center">
            <div class="col">Name</div>
            <div class="col-4">Description</div>
            <div class="col-1">Stock</div>
            <div class="col-2">Price</div>
            <div class="col-2"></div>
        </div>
        <ItemProduct v-for="(item, index) in product" :key="index" :item="item" :index="index" />
        <br>
        <RouterLink to="/cart" class="btn btn-success">Cart</RouterLink>
    </div>
</template>

<script>
    import ItemProduct from '@/components/ItemProduct.vue';

    export default {
    name: "katalog-pages",
    components: { ItemProduct },
    computed: {
        product() {
            return this.$store.getters.getProduct
        }
    }
}
</script>