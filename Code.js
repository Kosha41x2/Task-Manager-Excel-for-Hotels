function myFunction() {
  toRead = new Cell("C", 2);
  toRead2 = new Cell("I", 7);

  console.log(findTodaysDateCol(dafaultDatesRow));
  console.log(getColumnUntilBlank("W", 2,40).getValues());
}
