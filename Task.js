class Task{
  constructor(_name, _duration, _importance){
    this.name = _name;
    this.duration = _duration;
    this.importance = _importance;
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

  getName(){
    return this.name;
  }

  getDuration(){
    return this.duration;
  }
  
  getImportance(){
    return this.importance;
  }
}


class TaskList{
  constructor(_list){
    this.list = _list;
  }

  arrangeList(){
    this.list.sort((a, b) => {
      return a.importance - b.importance
      });
  }
}