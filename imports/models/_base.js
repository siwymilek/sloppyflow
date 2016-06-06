export default class BaseModel {

    constructor() {
        this.model;
    }

    _initModel(name) {
        check(name, String);
        return this.model = new Mongo.Collection('sloppyflow_' + name);
    }
}