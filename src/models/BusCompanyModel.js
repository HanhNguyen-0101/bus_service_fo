export class BusCompany {
  constructor({ id, name, address, content, review, comments, image, description }) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.address = address ? address : null;
    this.content = content ? content : null;
    this.review = review ? new Review(JSON.parse(review)) : null;
    this.comments = comments ? comments : null;
    this.description = description ? description : null;
    this.image = image ? image.split(";") : null;
  }
}
export class Review {
  constructor(review = {}) {
    this["clear info"] = review["clear info"] || 0;
    this["employee"] = review["employee"] || 0;
    this["facilities"] = review["facilities"] || 0;
    this["safety"] = review["safety"] || 0;
    this["service quality"] = review["service quality"] || 0;
  }
}
