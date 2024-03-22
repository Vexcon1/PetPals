class Database {
  constructor() {
    this.data = {}
  }

  add(index, value) {
    print(index,value)
    this.data[index] = value
  }

  method(index,value,value2) {
    socket.emit('methodServer', { key: index, args1: value, args2: value2 });
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
      print(key.value[i])
      var server = {
        id: key.value[i].id,
        name: key.value[i].name,
        age: key.value[i].age,
        pet: key.value[i].pet,
        hobbies: key.value[i].hobbies,
        posts: []
      }
      for (let x=0; x<key.value[i].posts.length; x++) {
        console.log('postssssa',key.value[i].posts[x])
        let post = new Post(key.value[i].posts[x].id, key.value[i].posts[x].who, key.value[i].posts[x].words,key.value[i].posts[x].img,key.value[i].posts[x].likes);
        server.posts.push(post)
      }
     let person = new Person(server.id, server.name, server.age, server.pet, server.hobbies);
      person.posts = server.posts
      if (person != null) {
        if (ui.name == person.name) {
          ui.thisPerson = person
        }
    peopleList.addPerson(person);
      peopleList.ids.push(server.id);
      print(peopleList.get("link"))
      }
    }
    boop()
  }
  if (key.key == "load_user_post") {
    
  }
});

socket.on('methodClient', (server) => {
  if (server.key == "createPerson") {
     let person = new Person(server.value.id, server.value.name, server.value.age, server.value.pet, server.value.hobbies, server.value.posts);
    peopleList.addPerson(person);
    peopleList.ids.push(server.value.id);
    print('new people',person,peopleList.ids)
    }
});