import { Province } from "./GlobalModel";

export class Station {
    constructor({id, name, address, provinceId, stationProvince, image}) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.address = address ? address : null;
        this.provinceId = provinceId ? provinceId : null;
        this.provinceObj = stationProvince ? new Province(stationProvince) : null;
        this.image = image ? image : null;
    }
}