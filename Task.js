class Task{
  constructor(_name, _duration, _importance, _weekDays){
    this.name = _name;
    this.duration = _duration;
    this.importance = _importance;
    this.weekDays = _weekDays;
  }

  setName(_name){
    this.name = _name;
    return this;
  }

  setDuration(_duration){
    this.duration = _duration;
    return this;
  }

  setImportance(_importance){
    this.importance = _importance;
    return this;
  }

  setWeekDays(_weekDays){
    this.weekDays = _weekDays;
    return this
  }

  getName(){
    return this.name;
  }

  getDuration(){
    return this.duration;
  }
  
  getImportance(){
    return this.importance;
  }

  getWeekDays(_weekDays){
    return this.weekDays;
  }

  clone() {
    return new Task(this.name, this.duration, this.importance);
  }
}


class TaskList{
  constructor(_list = []){
    this.list = _list;
  }

  arrangeList(){
    this.list = this.list.sort((a, b) => {
      return b.importance - a.importance
    });
  }

  push(task){
    this.list.push(task);
    return this;
  }

  getList(){
    return this.list;
  }

  getNames() {
    return this.list.map(task => task.getName());
  }

  getDurations() {
    return this.list.map(task => task.getDuration());
  }

  getImportances() {
    return this.list.map(task => task.getImportance());
  }

  concatenate(taskList){
    this.list = this.list.concat(taskList.getList());
    return this;
  }

  eliminateTask(index){
    this.list.splice(index);
  }

  clone(){
    return new TaskList([...this.list]); 
  }
}