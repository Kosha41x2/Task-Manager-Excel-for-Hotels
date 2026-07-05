class Cell{
  constructor(_colum, _row){
    this.setCell(_colum, _row);
  }

  setCell(_colum, _row){
    this.colum = _colum;
    this.row = _row;
    return this;
  }

  getCell(){
    return this.colum + this.row;
  }
}

class RangeMatrix {
  constructor(matrix2D) {
    this.matrix = matrix2D; 
  }

  getValues() {
    return this.matrix.map(row => row.map(cell => cell.getValue()));
  }

  getValue(row, col){
    return this.matrix[row][col];
  }

  pushValue(row, value){
    this.matrix[row].push(value);
  }
}