class CarModel{
    name
    model
    color
    images
    rent
    userId
    description
    capacity
    fuelType
    fuelAverage
    transmission
    constructor(obj={}) {
        this.name = obj.name??"";
        this.model = obj.model??"";
        this.color = obj.color??"";
        this.description = obj.description??"";
        this.images = obj.images ?? [];
        this.rent = obj.rent ?? 0;
        this.capacity = obj.capacity??"";
        this.fuelType = obj.fuelType??"";
        this.fuelAverage = obj.fuelAverage??"";
        this.transmission = obj.transmission??"";
    }
    get isValid(){
        return this.name && this.model &&  this.color &&  this.description && this.rent>0 && this.images.length>0 &&this.capacity&&this.fuelType&&this.fuelAverage&&this.transmission;
    }
}

module.exports = CarModel;