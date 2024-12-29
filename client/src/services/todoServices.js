import { http } from "../common/http";
import { appConfig } from "../common/config";

export const createTask = ({ title, description }) =>
  http.post(`${appConfig.BASE_URL}/api/task`, {
    title,
    description,
  });

export const deleteTask = (taskId) => {
  http.delete(`${appConfig.BASE_URL}/api/task/${taskId}`);
};