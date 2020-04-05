import * as TaskManager from 'expo-task-manager';
import constants from '../constants';
import {updateLocation} from './api';

var token =null;

export const setToken = (t) => token =t;

registerLocationUpdateTask = async () =>{
  TaskManager.defineTask(constants.tasks.LOCATION_UPDATE, async ({ data: { locations }, error }) => {
    if (error || !token) {
      return;
    }
    await updateLocation(locations, token);
  });
}

export const unregisterLocationUpdateTask = async () => {
  const isTaskAvailable = await TaskManager.isTaskRegisteredAsync(constants.tasks.LOCATION_UPDATE);
  if(isTaskAvailable){
    await TaskManager.unregisterTaskAsync(constants.tasks.LOCATION_UPDATE)
  }
}

registerLocationUpdateTask();