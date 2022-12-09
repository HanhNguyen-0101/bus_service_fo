export class Trip {
    constructor({id, fromStation, toStation, from, to, startTime, price, image, tripAt}) {
        this.id = id ? id : null;
        this.fromStation = fromStation ? fromStation : null;
        this.toStation = toStation ? toStation : null;
        this.startTime = startTime ? startTime : null;
        this.tripAt = tripAt ? tripAt : null;
        this.price = price ? price : null;
        this.image = image ? image : null;
        this.toStationObj = to || null;
        this.fromStationObj = from || null;
    }
}
