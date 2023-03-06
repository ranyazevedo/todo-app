<template>
  <input
    class="bg-transparent max-w-lg w-full border-b border-neutral-400 outline-0"
    type="text"
    v-model="searchTask"
    placeholder="Search"
  />
</template>
  
<script>
import { ref } from "vue";

export default {
  name: "SearchInput",
  setup() {
    const searchTask = ref("");
    return {
      searchTask,
    };
  },
};
</script>
