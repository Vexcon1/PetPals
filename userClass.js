class Person {
  constructor(id, name, age, pet, _hobbies) {
    console.log('person id',id)
    this.id = id;
    this.name = name;
    this.age = age;
    this.pet = pet;
    this.location = 0;
    this.hobbies = _hobbies;
    this.recommend = [];
    this.friends = [];
    this.next = null;
    this.posts = []
  }

  // Accessor methods
  get(data_name) {
    return this[data_name]
  }

  set(data_name,data_set) {
    this[data_name] = data_set
  }

  // User Actions
  
  addFriend(current) {
    console.log('new friend',current)
    this.friends.push(current)
  }

  removeFriend(current) {
    console.log('remove friend',current)
    let index = this.friends.indexOf(current);
    this.friends = this.friends.splice(index, 1);
  }
}

module.exports = Person;