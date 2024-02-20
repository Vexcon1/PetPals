class Database {
  constructor() {
    this.data = {}
  }

  set(index, value) {
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
}

const db = new Database()

function preload() {
  db.chievData(loadJSON("db.json"))
}

function stop() {
  saveJSON("db.json", db.archData())
}