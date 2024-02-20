class Message {
  constructor(_id, _owner, _msg) {
    this.id = _id
    this.owner = _owner
    this.msg = _msg
    this.emoji = null
  }

  // Accessor methods 
  get(data_name) {
    return this[data_name]
  }
  set(data_name,data_set) {
    this[data_name] = data_set
  }
}