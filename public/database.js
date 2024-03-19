class Database {
  constructor() {
    this.data = {}
  }

  set(index, value) {
    print('set',index,value)
    socket.emit('database', { key: 'set', data: index, value: value });
  }

  add(index, value) {
    print(index,value)
    this.data[index] = value
  }

   get(index) {
    socket.emit('database', { key: 'get', data: index});
    return this.data[index]
   }
}

const socket = io();
const db = new Database()

socket.emit('database', { key: 'loadDB'});

socket.on('database', (key) => {
    if (key.key == "getA") {
      print(key)
    db.add(key.index,key.sData)
    }
  if (key.key == "theDB") {
    db.data = key.theDB
  }
});