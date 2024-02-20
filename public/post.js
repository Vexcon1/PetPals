class Post {
  constructor(_id, _owner, _mediaType, _media) {
    this.id = _id
    this.owner = _owner
    this.mediaType = _mediaType
    this.media = _media
    this.likes = []
  }


  // Accessor methods
  get(data_name) {
    return this[data_name]
  }
  set(data_name,data_set) {
    this[data_name] = data_set
  }
}