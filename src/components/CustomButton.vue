<template>
  <button
    :class="[
      'mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-md hover:shadow-lg disabled:opacity-50 mr-2',
      bgStyle,
      textStyle,
      borderStyle,
    ]"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
    
<script>
export default {
  name: "CustomButton",
  props: {
    bgStyle: String,
    textStyle: String,
    borderStyle: String,
    text: String,
    disabled: Boolean,
  },
};
</script>
  