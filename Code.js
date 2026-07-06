function myFunction() {
  toRead = new Cell("C", 2);
  toRead2 = new Cell("I", 7);

  var date = new Date(2026, 5, 19);

  let todaysTasks = filterOnWeekDay(date, taskList).concatenate(checkOutRooms(date, taskList.getList()[5]));
  let todaysTasksTopped = topTasks(todaysTasks, tasksMaxTime);
  console.log(todaysTasksTopped.getNames());
}
