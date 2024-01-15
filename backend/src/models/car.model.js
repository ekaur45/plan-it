class CarModel{
    name
    model
    color
    images
    rent
    userId
    constructor(obj={}) {
        this.name = obj.name??"";
        this.model = obj.model??"";
        this.color = obj.color??"";
        this.images = obj.images ?? [];
        this.rent = obj.rent ?? 0;
    }
    get isValid(){
        return this.name && this.model &&  this.color && this.rent>0 && this.images.length>0;
    }
}

module.exports = CarModel;