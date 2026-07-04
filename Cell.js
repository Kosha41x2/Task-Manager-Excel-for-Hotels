class Cell{
  constructor(_colum, _row){
    this.setCell(_colum, _row);
  }

  setCell(_colum, _row){
    this.colum = _colum;
    this.row = _row;
  }

  getCell(){
    return this.colum + this.row;
  }
}