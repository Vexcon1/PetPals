class Serializer{
    constructor(types){this.types = types;}
    serialize(object) {
        let idx = this.types.findIndex((e)=> {return e.name == object.constructor.name});
        if (idx == -1) throw "type  '" + object.constructor.name + "' not initialized";
        return JSON.stringify([idx, Object.entries(object)]);
    }
    deserialize(jstring) {
        console.log(typeof(jstring))
        let array = JSON.parse(jstring);
        let object = new this.types[array[0]]();
        array[1].map(e=>{object[e[0]] = e[1];});
        return object;
    }
}

module.exports = Serializer;