<template>
    <div class="row border-bottom align-items-center">
        <div class="col-3">{{ item.name }}</div>
        <div class="col-4">{{ item.desc }}</div>
        <div class="col-1">{{ item.stock }}</div>
        <div class="col-2 price">Rp. {{ ribuan(item.price) }}</div>
        <div class="col-2 button">
            <button @click="addOne(index, item)" v-if="item.stock !== 0" class="btn btn-primary me-1">Add One</button>
            <button @click="addAll(index, item)" v-if="item.stock !== 0" class="btn btn-primary">Add All</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'itemProduct',
        props: ['item', 'index'],
        methods: {
            addOne(index, item) {
                this.$store.dispatch('addOne', {index, item})
            },
            addAll(index, item) {
                this.$store.dispatch('addAll', {index, item})
            },
            ribuan(x) {
                return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>