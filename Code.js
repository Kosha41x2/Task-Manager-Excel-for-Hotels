function myFunction() {
  toRead = new Cell("A", 1);
  toRead2 = new Cell("A", 10)
  toRead
  console.log(readCell(toRead));

  var values = readCells(toRead, toRead2);
  console.log(values);
}
