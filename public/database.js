class Database {
  constructor() {
    this.data = {}
  }

  set(index, value) {
    print(index,value)
    this.data[index] = value
  }

  get(index) {
    return  this.data[index]
  }

  archData() {
    return  this.data
  }

  chievData(_data) {
    this.data = _data
  }

  saveData() {
    localStorage.setItem('database', JSON.stringify(this.data));
  }

  loadData() {
    print(localStorage.getItem('database'))
    if (JSON.parse(localStorage.getItem('database')) != null) {
    this.data = JSON.parse(localStorage.getItem('database'));
    }
  }

  saveFile(name,data) {
    
  }
}

const db = new Database()

function setup() {
  db.loadData()
}

function stop() {
db.saveData()
}