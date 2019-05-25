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
  type: string;

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
    this.type = 'protector';
  }
}

export class Volunteer {

  name: string;
  surname: string;

  country: string;
  province: string;
  location: string;
  address: string;

  contactEmail: string;
  contactPhone: string;

  helpingMethods: Array<string>;

  type: string;

  constructor() {
    this.name = '';
    this.surname = '';

    this.country = '';
    this.province = '';
    this.location = '';
    this.address = '';

    this.contactEmail = '';
    this.contactPhone = '';

    this.helpingMethods = [];

    this.type = 'volunteer'
  }
}
