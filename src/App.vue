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

    <ToDoList :data="filteredData" @show-edit-modal="openEditModal" @remove-task="taskRemove"/>

    <ActionBar
      :listLength="getTaskList.length"
      :disableDeleteBtn="!filteredData.length || filteredData.length !== getTaskList.length"
      @show-add-modal="showAddModal = true"
      @remove-list="removeTaskList"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      searchTask: "",
      taskClicked: {}
    };
  },
  computed: {
    ...mapGetters(["getTaskList"]),
    filteredData() {
      return this.getTaskList.filter((item) =>
        item.description.toLowerCase().includes(this.searchTask.toLowerCase())
      );
    },
  }, 
  methods: {
    ...mapActions(["removeTaskList", "addTask", "editTask", "removeTask"]),
    taskAdd(task) {
      this.addTask(task);
      this.showAddModal = false;
    },
    taskEdit(task) {
      this.editTask(task);
      this.showEditModal = false;
    },
    taskRemove(taskId) {
      this.removeTask(taskId);
    },
    openEditModal(task) {
      this.showEditModal = true;
      this.taskClicked = task;
    },
    createTaskId() {
      if (typeof this.getTaskLast !== "undefined") {
        return this.getTaskLast.id + 1;
      }
      return 1;
    },
  }
};
</script>