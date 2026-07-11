function jsonToTaskList(jsonString) {
  if (!jsonString) return new TaskList([]);
  
  let plainObjects = JSON.parse(jsonString);
  
  let instances = plainObjects.map(obj => {
    return new Task(obj.name, obj.duration, obj.importance, obj.weekDays || "carry_over");
  });

  return new TaskList(instances);
}

function GenJson(){
  const yesterdaysTasks = getLeftoverTasks(jsonName);
  const todaysTasks = getTodaysTask();
  const processedTasks = mergeLeftovers(todaysTasks, yesterdaysTasks);

  saveTasksToJson(processedTasks, jsonName);
}

function saveTasksToJson(tasksList, propertyKey) {
  const jsonData = tasksList.getList().map(task => ({
    name: task.getName(),
    duration: task.getDuration(),
    importance: task.getImportance()
  }));
  
  let finalJsonString = JSON.stringify(jsonData);
  PropertiesService.getScriptProperties().setProperty(propertyKey, finalJsonString);
}

function getLeftoverTasks(propertyKey) {
  const oldJsonString = PropertiesService.getScriptProperties().getProperty(propertyKey);
  
  return oldJsonString ? JSON.parse(oldJsonString) : [];
}

function deleteTaskOnServer(taskName) {
  let jsonString = PropertiesService.getScriptProperties().getProperty(jsonName);
  
  if (!jsonString) return; 
  
  let tasksArray = JSON.parse(jsonString);
  
  tasksArray = tasksArray.filter(task => task.name !== taskName);
  
  let newJsonString = JSON.stringify(tasksArray);
  PropertiesService.getScriptProperties().setProperty(jsonName, newJsonString);
}