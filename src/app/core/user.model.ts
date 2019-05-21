export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;

  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
  }
}

export class User {
  protectoraName: string;
  protectoraAmbit: Array<string>;
  volunteerAmount: string;

  country: string;
  province: string;
  location: string;
  address: string;

  responsableName: string;
  contactEmail: string;
  contactPhone: string;
  web: string;
  contactTime: string;
  visitTime: string;

  constructor() {
    this.protectoraName = '';
    this.protectoraAmbit = [];
    this.volunteerAmount = '';

    this.country = '';
    this.province = '';
    this.location = '';
    this.address = '';

    this.responsableName = '';
    this.contactEmail = '';
    this.contactPhone = '';
    this.web = '';
    this.contactTime = '';
    this.visitTime = '';
  }
}
