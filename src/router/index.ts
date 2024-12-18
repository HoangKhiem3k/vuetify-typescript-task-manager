// Composables
import {createRouter, createWebHistory} from 'vue-router'
import TasksOverviewPage from "@/pages/TasksOverviewPage.vue";
import {HOME_VIEW, TASK_CREATE_VIEW, TASK_DETAIL_VIEW, TASK_UPDATE_VIEW} from "@/constants/appConstants";
import TaskCreatePage from "@/pages/TaskCreatePage.vue";
import TaskDetailsPage from "@/pages/TaskDetailsPage.vue";
import TaskUpdatePage from "@/pages/TaskUpdatePage.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: HOME_VIEW,
        component: TasksOverviewPage,
        props: true
      },
      {
        path: 'create-task',
        name: TASK_CREATE_VIEW,
        component: TaskCreatePage,
        props: true
      },
      {
        path: 'tasks/:id',
        name: TASK_DETAIL_VIEW,
        component: TaskDetailsPage,
        props: true
      },
      {
        path: 'tasks/edit/:id',
        name: TASK_UPDATE_VIEW,
        component: TaskUpdatePage,
        props: true
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
