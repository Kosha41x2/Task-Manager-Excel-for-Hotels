function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏨 Herramientas Hotel')
    .addItem('Comprobar Tareas de Hoy', 'OpenLateralPanel')
    .addToUi();
}

function GenTasksForFront() {
  let jsonString = PropertiesService.getScriptProperties().getProperty(jsonName);
  let toShow = jsonToTaskList(jsonString);

  toShow = topTasks(toShow, tasksMaxTime);
  
  if (toShow) {
    return toShow.getList(); 
  } else {
    return []; 
  }
}

function OpenLateralPanel() {
  const html = HtmlService.createHtmlOutputFromFile('TaskPanel')
      .setTitle('🏨 Control de Limpieza')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}