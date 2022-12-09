import { Usertype } from "./GlobalModel";

export class User {
  constructor({ id, name, email, password, phone, avatar, typeId, typeObj }) {
    this.id = id || null;
    this.name = name || null;
    this.email = email || null;
    this.password = password || null;
    this.numberPhone = phone || null;
    this.avatar = avatar || null;
    this.typeId = typeId || null;
    this.typeObj = typeObj ? new Usertype(typeObj) : null;
  }
}
