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
  if (typeof letter !== 'string') {
    throw new Error(`Error en letterToColumn: La columna debe ser un texto (String). Se recibió un tipo '${typeof letter}'.`);
  }
  if (!/^[a-zA-Z]+$/.test(letter)) {
    throw new Error(`Error en letterToColumn: El valor "${letter}" no es una columna válida (solo se admiten letras del alfabeto).`);
  }

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
  if (typeof first !== 'string' || typeof max !== 'string') {
    throw new Error(`Error en getRow: Los límites de las columnas deben ser letras (Strings). Se recibió first: '${first}', max: '${max}'.`);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 

  const maxColumns = sheet.getLastColumn();
  const maxColumnsLet = columnToLetter(maxColumns); // Faltaba el const/let aquí

  let firstCol = letterToColumn(first);
  let maxCol = letterToColumn(max);

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
  if (typeof first !== 'string') {
    throw new Error(`Error en getFullRow: La columna de inicio debe ser una letra. Se recibió: '${first}'.`);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  const maxColumns = sheet.getLastColumn();

  return getRow(row, first, columnToLetter(maxColumns));
}

function getColumn(colum, first = 1, max) {
  if (typeof colum !== 'string') {
    throw new Error(`Error en getColumn: El identificador de columna debe ser una letra (ej. "C"). Se recibió: '${colum}'.`);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  
  const maxRows = sheet.getLastRow();
  if(maxRows < max){
    max = maxRows;
  }

  if(first > maxRows){
    first = maxRows;
  }
  
  const cells = getCells(new Cell(colum, first), new Cell(colum, max));

  return cells;
}

//Evitar usar debido a la carga computacional
function getFullCol(col, first = 1){
  // 5. Control de errores delegado
  if (typeof col !== 'string') {
    throw new Error(`Error en getFullCol: La columna debe ser una letra. Se recibió: '${col}'.`);
  }

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