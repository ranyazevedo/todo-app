<template>
  <div class="bg-violet-50 text-center p-3 min-h-screen">
    <ActionModal
      title="Add new task"
      @close-modal="showAddModal = false"
      @save="taskAdd"
      v-if="showAddModal"
    ></ActionModal>

    <ActionModal
      title="Edit task"
      :task="taskClicked"
      @close-modal="showEditModal = false"
      @save="taskEdit"
      v-if="showEditModal"
    ></ActionModal>

    <h1 class="font-mono text-3xl font-large py-5">TODO LIST</h1>

    <div class="my-5">
      <SearchInput v-model="searchTask" />
    </div>

    <ToDoList
      :data="filteredData"
      @open-edit-modal="openEditModal"
      @remove="taskRemove"
    />

    <ActionBar
      :listLength="getTaskList.length"
      :disableDeleteBtn="
        !filteredData.length || filteredData.length !== getTaskList.length
      "
      @show-add-modal="showAddModal = true"
      @remove-list="removeList"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import ToDoList from "@/components/ToDoList.vue";
import SearchInput from "@/components/SearchInput.vue";
import ActionBar from "@/components/ActionBar.vue";
import ActionModal from "@/components/ActionModal.vue";

export default {
  name: "App",
  components: {
    ActionModal,
    ToDoList,
    SearchInput,
    ActionBar,
  },
  emits: ["remove", "openEditModal"],
  setup() {
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const searchTask = ref("");
    const taskClicked = ref({});

    const store = useStore();
    const getTaskList = computed(() => store.getters.getTaskList);
    const getTaskLast = computed(() => store.getters.getTaskLast);

    const filteredData = computed(() => {
      return getTaskList.value.filter((item) =>
        item.description.toLowerCase().includes(searchTask.value.toLowerCase())
      );
    });

    const taskAdd = function (task) {
      store.dispatch("addTask", task);
      showAddModal.value = false;
    };

    const taskEdit = function (task) {
      store.dispatch("editTask", task);
      showEditModal.value = false;
    };

    const taskRemove = function (taskId) {
      store.dispatch("removeTask", taskId);
    };

    const removeList = function () {
      store.dispatch("removeTaskList");
    };

    const openEditModal = function (task) {
      showEditModal.value = true;
      taskClicked.value = task;
    };

    const createTaskId = function () {
      if (typeof getTaskLast.value !== "undefined") {
        return getTaskLast.value.id + 1;
      }
      return 1;
    };

    return {
      showAddModal,
      showEditModal,
      searchTask,
      taskClicked,
      getTaskList,
      filteredData,
      taskAdd,
      taskEdit,
      taskRemove,
      openEditModal,
      createTaskId,
      removeList,
      getTaskLast,
    };
  },
};
</script>