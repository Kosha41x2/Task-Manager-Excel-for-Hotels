function checkOutRoomRows(day){
  const todaysLet = findDateCol(defaultDatesRow, day);
  const todaysCol = getColumn(todaysLet, defaultDatesRow + 1, columnLength);

  const tomorrowsLet = columnToLetter(letterToColumn(todaysLet) + 1);
  const tomorrowsCol = getColumn(tomorrowsLet, defaultDatesRow + 1, columnLength);

  const rowsWithChanges = [];

  for(let i = 0; i < columnLength - defaultDatesRow - 1; i++){
    let todayCell = todaysCol.getMatrix()[i][0];
    let tomorrowCell = tomorrowsCol.getMatrix()[i][0];

    if(!todayCell.isBlank()) {
      let todayValue = todayCell.getDisplayValue().trim();
      let tomorrowValue = tomorrowCell.getDisplayValue().trim();

      if(todayValue !== tomorrowValue){
        rowsWithChanges.push(i + defaultDatesRow + 1);
      }
    }
  }

  return rowsWithChanges;
}

function checkOutRooms(day, baseTask){
  day = day.toLocaleDateString();
  const rowsWithChanges = checkOutRoomRows(day);

  const checkOuts = new TaskList([]);

  for(let i = 0; i < rowsWithChanges.length; i++){
    let room = getRow(rowsWithChanges[i], roomInfoFistCol, roomInfoLastCol).getValues()[0];
    let checkOut = baseTask.clone();

    for(let j = 0; j < room.length; j++){
      checkOut.setName(checkOut.getName() + " " + room[j]);
    }

    checkOuts.push(checkOut);
  }

  return checkOuts;
}

function filterOnWeekDay(day, tasks){
  const filteredTask = new TaskList();
  for(let j = 0; j < tasks.getList().length; j++){
    let task = tasks.getList()[j];

    if(typeof task.getWeekDays() == 'string'){
      if(task.getWeekDays() == everyday){
        filteredTask.push(task);
        continue;
      }

      if(task.getWeekDays() == customDays){
        continue;
      }
    }

    let found = false;

    for(let k = 0; k < task.getWeekDays().length && !found; k++){
      if(task.getWeekDays()[k] == day.getDay()){ 
        filteredTask.push(task);
        found = true;
      }
    }
  }
  return filteredTask;
}

function topTasks(tasks, maxTime){
  let time = 0;
  tasks.arrangeList();
  const toppedTasks = new TaskList();
  var isNeeded;
  for(let i = 0; i < tasks.getList().length && (time <= maxTime || isNeeded); i++){
    let task = tasks.getList()[i];
    isNeeded = task.getImportance() >= necessityImportance;
    time += task.getDuration();
    if(time <= maxTime || isNeeded){
      toppedTasks.push(task);
    }
  }

  return toppedTasks;
}