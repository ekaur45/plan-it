class VenueModel{
    name
    location
    capacity
    images
    userId
    description
    constructor(obj={}) {
        this.name = obj.name??"";
        this.location = obj.location??"";
        this.description = obj.description??"";
        this.capacity = obj.capacity??0;
        this.images = obj.images ?? [];
    }
    get isValid(){
        return this.name && this.location && this.description&&  this.capacity>0 && this.images.length>0;
    }
}

module.exports = VenueModel;