export default class VenueModel {
    _id: string = "";
    name: string = "";
    type: string = ""; // can be "indoor", "outdoor", "other"
    location: string = "";
    description: string = "";
    capacity: number = 0;
    price: number = 0;
    images: any[] = [];
    rating:any[] = [];
}