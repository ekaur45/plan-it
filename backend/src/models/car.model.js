class CarModel{
    name
    model
    color
    images
    rent
    userId
    description
    constructor(obj={}) {
        this.name = obj.name??"";
        this.model = obj.model??"";
        this.color = obj.color??"";
        this.description = obj.description??"";
        this.images = obj.images ?? [];
        this.rent = obj.rent ?? 0;
    }
    get isValid(){
        return this.name && this.model &&  this.color &&  this.description && this.rent>0 && this.images.length>0;
    }
}

module.exports = CarModel;