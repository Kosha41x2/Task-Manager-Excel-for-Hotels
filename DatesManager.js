var todayDay = new Date();
today = todayDay.toLocaleDateString();
weekDay = todayDay.getDay();

function findDateCol(datesRow, date) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  let found = false;
  let col = 0;
  let startingColN = letterToColumn(startingCol);

  for(i = 0; !found && startingColN + i*searchChunck <= sheet.getMaxColumns(); i++){
    rows = getRow(datesRow, columnToLetter(startingColN + searchChunck * i), columnToLetter(startingColN + searchChunck * (i + 1))).getValues()[0];
    for(j = 0; j <= searchChunck && !found; j++){
      if(rows[j] instanceof Date){
        if(rows[j].toLocaleDateString() == date){
          found = true;
          col = columnToLetter(startingColN + j + i*searchChunck);
        }
      }
    }
  }
  
  if(found){
    return col;
  }
  else {
    throw new Error("Today's date wasn't found in the row: " + datesRow);
  }
}
