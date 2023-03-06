<template>
  <div class="absolute top-0 bottom-0 left-0 right-0">
    <div
      @click="$emit('closeModal')"
      class="absolute bg-black opacity-70 inset-0 z-0"
    ></div>
    <div class="w-full max-w-lg relative m-auto shadow-lg flex h-screen">
      <div class="bg-white p-3 m-auto rounded-xl w-full">
        <p
          class="font-mono text-2xl mb-5 font-bold mt-5"
          data-test="modal-title"
        >
          {{ title }}
        </p>
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomButton from "./CustomButton.vue";

export default {
  name: "ActionModal",
  components: {
    CustomButton,
  },
  props: {
    title: String,
    task: {
      id: String,
      date: String,
      color: String,
      description: String,
      priority: Boolean,
    },
  },
  setup(props, context) {
    const id = ref("");
    const date = ref("");
    const color = ref("");
    const description = ref("");
    const priority = ref(false);

    const store = useStore();
    const getLastTask = computed(() => store.getters.getTaskLast);

    const isSubmitDisabled = computed(() => {
      return !description.value || !color.value || !date.value;
    });

    const saveTask = function () {
      const updatedTask = {
        id: props.task ? props.task.id : createTaskId(),
        description: description.value,
        color: color.value,
        priority: priority.value,
        date: date.value,
      };
      context.emit("save", updatedTask);
    };

    const createTaskId = function () {
      if (typeof getLastTask.value !== "undefined") {
        return getLastTask.value.id + 1;
      }
      return 1;
    };

    onMounted(() => {
      if (props.task) {
        description.value = props.task.description;
        color.value = props.task.color;
        priority.value = props.task.priority;
        date.value = props.task.date;
      }
    });

    return {
      id,
      date,
      color,
      description,
      priority,
      saveTask,
      isSubmitDisabled,
    };
  },
};
</script>
  