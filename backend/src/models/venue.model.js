class VenueModel{
    name
    location
    capacity
    images
    userId
    constructor(obj={}) {
        this.name = obj.name??"";
        this.location = obj.location??"";
        this.capacity = obj.capacity??0;
        this.images = obj.images ?? [];
    }
    get isValid(){
        return this.name && this.location &&  this.capacity && this.images.length>0;
    }
}

module.exports = VenueModel;