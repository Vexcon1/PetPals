class Database {
  constructor() {
    this.data = {}
  }

  add(index, value) {
    print(index,value)
    this.data[index] = value
  }

  method(index,value) {
    socket.emit('methodServer', { key: index, args1: value });
    print('sent')
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
  if (key.key == "users") {
    for (let i=0; i<key.value.length; i++) {
      var server = {
        id: key.value[i][0],
        name: key.value[i][1],
        age: key.value[i][2],
        pet: key.value[i][3],
        hobbies: key.value[i][4],
      }
     let person = new Person(server.id, server.name, server.age, server.pet, server.hobbies);
    peopleList.addPerson(person);
      print(peopleList.get("link"))
    }
    boop()
  }
});

socket.on('methodClient', (server) => {
  if (server.key == "createPerson") {
     let person = new Person(server.value.id, server.value.name, server.value.age, server.value.pet, server.value.hobbies);
    peopleList.addPerson(person);
    print('new people',person)
    }
});