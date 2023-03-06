<template>
  <input
    class="bg-transparent max-w-lg w-full border-b border-neutral-400 outline-0"
    type="text"
    v-model="searchTask"
    placeholder="Search"
  />
</template>
  
<script>
export default {
  name: "SearchInput",
  data() {
    return {
      searchTask: "",
    };
  },
};
</script>
