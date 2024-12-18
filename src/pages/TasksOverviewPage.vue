<script lang="ts" setup>
import {onMounted, ref, watch, watchEffect} from "vue";
import router from "@/router";
import {getTasks} from "@/composables/getTasks";
import {TASK_DETAIL_VIEW, TASK_UPDATE_VIEW} from "@/constants/appConstants";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import {useTaskStore} from "@/store/taskStore";
import MainBackground from "@/components/MainBackground.vue";
import Navbar from "@/components/Navbar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";
import TaskOverviewCard from "@/components/TaskOverviewCard.vue";
import {TaskFetchResponse} from "@/dtos/taskDtos";
import {removeTask} from "@/composables/removeTask";
import TaskDeleteDialog from "@/components/TaskDeleteDialog.vue";


const {fetchTasks, tasks, isLoading, isNetworkError, axiosError} = getTasks();
const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const taskStore = useTaskStore();
const selectedTaskId = ref(0);
const isDeleteDialogSelected = ref(false);
const selectedTaskDescription = ref('');


onMounted(() => {
  fetchTasks(taskStore.selectedTaskType);
});

watch(() => taskStore.selectedTaskType, (newType) => {
  fetchTasks(newType);
});

watchEffect(() => {
  fetchTasks(taskStore.selectedTaskType);
});


const openDeleteDialog = (task: { id: number, description: string }) => {
  selectedTaskId.value = task.id;
  selectedTaskDescription.value = task.description;
  isDeleteDialogSelected.value = true;
};

const handleCardClicked = (id: number) => {
  router.push({name: TASK_DETAIL_VIEW, params: {id: id.toString()}}).then();
};

const navigateToTaskUpdateView = (task: TaskFetchResponse) => {
  taskStore.setTaskToEdit(task);
  router.push({name: TASK_UPDATE_VIEW, params: {id: task.id.toString()}}).then();
};

const deleteTask = (id: number) => {
  removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskStore.selectedTaskType);
};

</script>

<template>
  <Navbar @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <MainBackground>
    <ErrorDialog :model-value="isNetworkError" :axios-error="axiosError"/>
    <TaskOverviewCard
      :tasks="tasks"
      @card-clicked="handleCardClicked"
      @delete-clicked="openDeleteDialog"
      @edit-clicked="navigateToTaskUpdateView"
    />
    <TaskDeleteDialog
      v-model="isDeleteDialogSelected"
      :task-description="selectedTaskDescription.valueOf()"
      @confirm-delete="deleteTask(selectedTaskId.valueOf())"/>
    <LoadingSpinner :is-loading="isLoading"/>
  </MainBackground>
</template>
