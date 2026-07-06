function checkOutRoomRows(day){
  const todaysLet = findDateCol(defaultDatesRow, day);
  const todaysCol = getColumn(todaysLet, defaultDatesRow + 1, columnLength);

  const tomorrowsLet = columnToLetter(letterToColumn(todaysLet) + 1);
  const tomorrowsCol = getColumn(tomorrowsLet, defaultDatesRow + 1, columnLength);

  const rowsWithChanges = [];

for(let i = 0; i < columnLength - defaultDatesRow - 1; i++){
    let celdaHoy = todaysCol.getMatrix()[i][0];
    let celdaManana = tomorrowsCol.getMatrix()[i][0];

    if(!celdaHoy.isBlank()) {
      let valorHoy = celdaHoy.getDisplayValue().trim();
      let valorManana = celdaManana.getDisplayValue().trim();

      if(valorHoy !== valorManana){
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
      if(task.getWeekDays() == "all"){
        filteredTask.push(task);
        continue;
      }

      if(task.getWeekDays() == "custom"){
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