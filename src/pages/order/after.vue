<template>
  <div>
      <Order />
  </div>
</template>

<script>
import Order from './order.vue'
export default {
    provide() {
        return {
            status: 66
        }
    },
    components: {
        Order
    }
}
</script>

<style>

</style>