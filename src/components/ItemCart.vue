<template>
    <div class="row align-items-center border-bottom">
        <div class="col">{{ item.name }}</div>
        <div class="col">{{ item.quantity }}</div>
        <div class="col">Rp. {{ ribuan(item.price) }}</div>
        <div class="col">
            <button @click="deleteOne(index, item)" class="btn btn-danger me-1">Delete One</button>
            <button @click="deleteAll(index, item)" class="btn btn-danger">Delete All</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'itemCart-component',
        props: ['index','item'],
        methods: {
            deleteOne(index, item) {
                this.$store.dispatch('deleteOne', {index, item})
            },
            deleteAll(index, item) {
                this.$store.dispatch('deleteAll', {index, item})
            },
            ribuan(x) {
                return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>