import {reactive, ref, Ref} from "vue";
import {AxiosError} from "axios";
import logRequestError from "@/composables/logRequestError";
import {webService} from "@/services/taskApi";
import {TaskFetchResponse} from "@/dtos/taskDtos";

interface TasksFetchState {
  fetchTasks: (taskType: string) => Promise<void>;
  tasks: Ref<TaskFetchResponse[]> | never[];
  isLoading: Ref<boolean>;
  isNetworkError: Ref<boolean>;
  axiosError: Ref<AxiosError | null>;
}

export function getTasks(): TasksFetchState {
  const tasks = reactive([]);
  const isLoading = ref(false);
  const isNetworkError = ref(false);
  const axiosError = ref(null);

  async function fetchTasks(taskType: string): Promise<void> {
    isLoading.value = true;
    tasks.length = 0;
    try {
      const response = await webService.getTasks(taskType);
      tasks.splice(0, tasks.length, ...response.data);
      isNetworkError.value = false;
    } catch (err: AxiosError | unknown) {
      logRequestError('fetchTasks', err);
      axiosError.value = err instanceof AxiosError ? err : undefined;
      isNetworkError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  return {fetchTasks, tasks, isLoading, isNetworkError, axiosError};
}
