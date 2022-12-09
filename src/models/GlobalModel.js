export class Hashtag {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}
export class BusType {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}
export class OrderStatus {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}
export class PaymentStatus {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}
export class PaymentMethod {
  constructor({ id, name, logo, subTitle, promo, conditionLink, paymentIntro }) {
    this.id = id || null;
    this.name = name || null;
    this.logo = logo || null;
    this.subTitle = subTitle || null;
    this.promo = promo || null;
    this.conditionLink = conditionLink || null;
    this.paymentIntro = paymentIntro || null;
  }
}
export class Usertype {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}
export class Status {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}
export class Province {
  constructor({ id, name }) {
    this.id = id || null;
    this.name = name || null;
  }
}

export class Article {
  constructor({ id, title, subTitle, hashtag, image, description, content, updatedAt }) {
    this.id = id ? id : null;
    this.title = title ? title : null;
    this.subTitle = subTitle ? subTitle : null;
    this.hashtag = hashtag ? JSON.parse(hashtag) : null;
    this.description = description ? description : null;
    this.image = image ? image : null;
    this.content = content ? content : null;
    this.updatedAt = updatedAt ? updatedAt : null;
  }
}

export class Banner {
  constructor({ id, title, description, banner, enable }) {
    this.id = id || null;
    this.title = title || null;
    this.description = description || null;
    this.banner = banner || null;
    this.enable = enable || false;
  }
}

export const mapArticleHashTag = (articles, hashtags) => {
  const result = articles?.map((article) => {
    const hashtagObj = article.hashtag?.map(h1 => {
      return hashtags?.find(h2 => h2.id === h1);
    });
    return {
      ...article,
      hashtagObj,
    };
  });
  return result;
};

export const getArticleByHashTag = (articles, hashTag) => {
  return articles?.filter(i => i.hashtagObj?.findIndex(j => j.name === hashTag) !== -1) || [];
}

export const getFromToOfArray = (arr, start, size) => {
  return arr?.splice(start, size);
}