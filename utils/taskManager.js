import * as TaskManager from 'expo-task-manager';
import constants from '../constants';
import {updateLocation} from './api';

var token =null;

export const setToken = (t) => token =t;

registerLocationUpdateTask = () =>{
  unregisterLocationUpdateTask();
  TaskManager.defineTask(constants.tasks.LOCATION_UPDATE, async ({ data: { locations }, error }) => {
    if (error || !token) {
      return;
    }
    await updateLocation(locations, token);
  });
}

export const unregisterLocationUpdateTask = () => {
  if(TaskManager.isTaskRegisteredAsync(constants.tasks.LOCATION_UPDATE)){
    TaskManager.unregisterTaskAsync(constants.tasks.LOCATION_UPDATE)
  }
}

try{
  registerLocationUpdateTask();
}catch(e){

}