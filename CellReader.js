function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter) {
  let column = 0;
  
  let upperLetter = letter.toUpperCase(); 

  for (let i = 0; i < upperLetter.length; i++) {
    column = (column * 26) + (upperLetter.charCodeAt(i) - 64);
  }
  
  return column;
}

function getSingleCell(toRead) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet(); 
  const targetCell = sheet.getRange(toRead.getCell());

  return unmerge(targetCell);
}

function getCells(leftTopCorner, rightBottomCorner){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet(); 
  
  const rangeString = leftTopCorner.getCell() + ":" + rightBottomCorner.getCell();
  const targetRange = sheet.getRange(rangeString);
  
  const cells = []; 
  const numRows = targetRange.getNumRows();
  const numCols = targetRange.getNumColumns();

  for (let r = 1; r <= numRows; r++) {
    const currentRow = [];
    
    for (let c = 1; c <= numCols; c++) {
      const currentCell = targetRange.getCell(r, c);
      
      currentRow.push(unmerge(currentCell));
    }
    cells.push(currentRow);
  }
  
  return new RangeMatrix(cells);
}

function getRow(row, first = "A", max) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 

  const maxColumns = sheet.getLastColumn();
  maxColumnsLet = columnToLetter(maxColumns);

  const firstCol = letterToColumn(first);
  const maxCol = letterToColumn(max);

  if(maxColumns < maxCol){
    maxCol = maxColumns;
    max = maxColumnsLet;
  }

  if(firstCol > maxColumns){
    first = maxColumnsLet;
    firstCol = maxColumns;
  }
  
  const cells = getCells(new Cell(first, row), new Cell(max, row));

  return cells;
}

//Evitar usar debido a la carga computacional
function getFullRow(row, first = "A"){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  const maxColumns = sheet.getLastColumn();

  return getRow(row, first, maxColumns);
}

function getColumn(colum, first = 1, max) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  
  const maxColumns = sheet.getLastRow();
  if(maxColumns < max){
    max = maxColumns;
  }

  if(first > maxColumns){
    first = maxColumns
  }
  
  const cells = getCells(new Cell(colum, first), new Cell(colum, max));

  return cells;
}

//Evitar usar debido a la carga computacional
function getFullCol(col, first = 1){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  const maxRows = sheet.getLastRow();

  return getColumn(col, first, maxRows);
}

function unmerge(cell){
  if(cell.isPartOfMerge()){
    return cell.getMergedRanges()[0];
  }
  else{
    return cell;
  }
}