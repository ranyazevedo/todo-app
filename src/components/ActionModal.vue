<template>
  <div class="absolute top-0 bottom-0 left-0 right-0">
    <div
      @click="$emit('closeModal')"
      class="absolute bg-black opacity-70 inset-0 z-0"
    ></div>
    <div class="w-full max-w-lg relative m-auto shadow-lg flex h-screen">
      <div class="bg-white p-3 m-auto rounded-xl w-full">
        <p class="font-mono text-2xl mb-5 font-bold mt-5">{{ title }}</p>
        <form>
          <div class="my-4">
            <input
              class="bg-transparent max-w-lg w-full border rounded-md border-sky-700 p-2"
              type="text"
              v-model="description"
              placeholder="Description"
              maxlength="80"
            />
          </div>
          <div class="my-4">
            <select
              class="bg-transparent max-w-lg w-full border rounded-md border-sky-700 p-2"
              v-model="color"
              name="color"
              id="color"
            >
              <option value="" disabled selected>Select color</option>
              <option value="lightblue">Blue</option>
              <option value="lightcoral">Red</option>
              <option value="lightseagreen">Green</option>
              <option value="khaki">Yellow</option>
              <option value="lightgray">Gray</option>
            </select>
          </div>
          <div class="my-4">
            <input
              class="bg-transparent max-w-lg w-full border rounded-md border-sky-700 p-2"
              type="date"
              v-model="date"
              placeholder="Date"
            />
          </div>
          <div class="my-4 text-left max-w-lg w-full m-auto">
            <input type="checkbox" v-model="priority" id="priority" />
            <label for="priority"> Priority</label><br />
          </div>
        </form>
        <div class="p-3 mt-2 text-center space-x-4 md:block">
          <CustomButton
            text="Save"
            bgStyle="bg-sky-700"
            textStyle="text-white"
            @click.prevent="saveTask"
            :disabled="isSubmitDisabled"
          />
          <CustomButton
            text="Close"
            bgStyle="bg-white"
            textStyle="text-gray-600"
            borderStyle="border text-gray-600 shadow-sm "
            @click.prevent="$emit('closeModal')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { mapGetters, mapActions } from "vuex";
import CustomButton from "./CustomButton.vue";

export default {
  name: "ActionModal",
  components: {
    CustomButton,
  },
  data() {
    return {
      id: "",
      description: "",
      color: "",
      priority: false,
      date: "",
    };
  },
  props: {
    title: String,
    task: {
      id: String,
      description: String,
      color: String,
      priority: Boolean,
      date: String,
    },
  },
  computed: {
    ...mapGetters(["getTaskLast"]),
    isSubmitDisabled() {
      return !this.description || !this.color || !this.date;
    },
  },
  mounted() {
    if (this.task) {
      this.description = this.task.description;
      this.color = this.task.color;
      this.priority = this.task.priority;
      this.date = this.task.date;
    }
  },
  methods: {
    ...mapActions(["addTask"]),
    saveTask() {
      const task = {
        id: this.task ? this.task.id : this.createTaskId(),
        description: this.description,
        color: this.color,
        priority: this.priority,
        date: this.date,
      };
      this.$emit("save", task);
    },
    createTaskId() {
      if (typeof this.getTaskLast !== "undefined") {
        return this.getTaskLast.id + 1;
      }
      return 1;
    },
  },
};
</script>
  