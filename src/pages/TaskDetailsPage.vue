<script setup lang="ts">

import {onMounted, reactive} from "vue";
import {TaskFetchResponse} from "@/dtos/taskDtos";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import {useTaskStore} from "@/store/taskStore";
import router from "@/router";
import Navbar from "@/components/Navbar.vue";
import MainBackground from "@/components/MainBackground.vue";
import TaskDetailsCard from "@/components/TaskDetailsCard.vue";

defineProps({
  id: String
});

const task = reactive<TaskFetchResponse>({
  id: 0,
  description: '',
  isReminderSet: null,
  isTaskOpen: null,
  createdOn: null,
  priority: null
});

const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const taskStore = useTaskStore();

onMounted(showTaskDetails);

function showTaskDetails() {
  Object.assign(task, taskStore.taskToEdit);
}

const clickedBackButton = () => {
  router.back();
};
</script>

<template>
  <Navbar @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <MainBackground>
    <TaskDetailsCard :task="task" @back-clicked="clickedBackButton"/>
  </MainBackground>
</template>
