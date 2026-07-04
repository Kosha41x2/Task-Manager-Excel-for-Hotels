function readCell(toRead) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet(); 
  
  const value = sheet.getRange(toRead.getCell()).getValue();
  
  return value;
}

function readCells(leftTopCorner, rightBottomCorner){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet(); 
  
  const values = sheet.getRange(leftTopCorner.getCell() + ":" + rightBottomCorner.getCell()).getValues();
  
  return values;
}