var today = new Date();
today = today.toLocaleDateString();

function findTodaysDateCol(datesRow) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  let found = false;
  let col = 0;
  let startingColN = letterToColumn(startingCol);

  for(i = 0; !found && startingColN + i*seachChunck <= sheet.getMaxColumns(); i++){
    rows = getRow(datesRow, columnToLetter(startingColN + seachChunck * i), columnToLetter(startingColN + seachChunck * (i + 1))).getValues()[0];
    for(j = 0; j <= seachChunck && !found; j++){
      if(rows[j] instanceof Date){
        if(rows[j].toLocaleDateString() == today){
          found = true;
          col = columnToLetter(startingColN + j + i*seachChunck);
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
