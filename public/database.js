class Database {
  constructor() {
    this.data = {}
  }

  set(index, value) {
    print('set',index,value)
    socket.emit('database', { key: 'set', data: index, value: value });
  }

  get(index) {
    socket.emit('database', { key: 'get', data: index});
    socket.on('database', (key, index, value) => {
      print('get',key,index,value)
    });
  }
}

function mousePressed() {
 db.set('h','hah')
  db.get('h')
}

const db = new Database()

function setup() {
  
}