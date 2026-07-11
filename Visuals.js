function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏨 Herramientas Hotel')
    .addItem('Comprobar Tareas de Hoy', 'OpenLateralPanel')
    .addToUi();
}

var date = new Date(2026, 5, 18);

function GenTasksForFront() {
  let checkOuts = checkOutRooms(todayDay, taskList.getList()[5]);
  let filtered = filterOnWeekDay(todayDay, taskList);
  filtered.concatenate(checkOuts);
  let tasks = topTasks(filtered, tasksMaxTime);

  const list = tasks.getList();
  const jsonData = [];
  
  for(let i = 0; i < list.length; i++) {
    let task = list[i];
    jsonData.push({
      name: task.getName(),
      duration: task.getDuration(),
      importance: task.getImportance()
    });
  }
  
  return jsonData;
}

function OpenLateralPanel() {
  const html = HtmlService.createHtmlOutputFromFile('TaskPanel')
      .setTitle('🏨 Control de Limpieza')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}