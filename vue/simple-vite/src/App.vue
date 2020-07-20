<template>
  <div>
    <span>count is {{ count }}</span>
    <button @click="addHandle">加1</button>
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  export default {
    name: "App",
    setup() {
      let count = ref(0);
      const addHandle = function () {
        count.value++
      }

      return {
        count,
        addHandle
      }
    }
  }
</script>

<style scoped>

</style>