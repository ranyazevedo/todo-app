<template>
  <div
    class="flex max-w-lg w-full m-auto my-5 items-center justify-between bg-white p-3 rounded-sm"
  >
    <p>Total tasks: {{ listLength }}</p>
    <div>
      <CustomButton
        text="New task"
        bgStyle="bg-sky-700"
        textStyle="text-white"
        @click.prevent="$emit('showAddModal')"
      />
      <CustomButton
        text="Delete all"
        bgStyle="bg-rose-600"
        textStyle="text-white"
        @click.prevent="$emit('removeList')"
        :disabled="disableDeleteBtn"
      />
    </div>
  </div>
</template>
  
<script>
import CustomButton from "./CustomButton.vue";

export default {
  name: "ActionBar",
  props: {
    listLength: Number,
    disableDeleteBtn: Boolean,
  },
  components: {
    CustomButton,
  },
};
</script>
