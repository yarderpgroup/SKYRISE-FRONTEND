export type Testimonial_Cards = {
  id: string;
  displayImage: string;
  authorName: string;
  rating: number | undefined;
  type: string;
  role: string;
  description: string;
};

export type schoolInfo = {
  id: number;
  image: string;
  name: string;
  location: string;
  ratings: number;
  StudentsCount: number;
  distance: number;
};

export type FeesPoliciesDetails = {
  id: number;
  image: string;
  title: string;
  description: string;
  getData: {
    id: number;
    name: string;
    value: string;
  }[];
};

export type AmenitiesDetails = {
  id: number;
  title: string;
  desc: string;
  getData: {
    id: number;
    item: string;
  }[];
};

export type notificationType = {
  id: number;
  heading: string;
  title: string;
  date: string;
  time: string;
  description: string;
};
export type propertyType = {
  _id: string;
  photos: any;
  isPublished: Boolean;
  terms:any;
  totalBHK: number;
  propertyterms:{
    rentPrice:number;
  };
  rentPrice:any;
  setFurnishingStatus?:any
  areaDetails:any;
  setPropertyType:any;
  setBedRooms:any;
  setBathRoom:any;
  squareFeet:any;
  filterData:any;
  isFavorite:Boolean;
  type: "SELL" | "RENT";
  selectedType: "RESIDENTIAL" | "COMMERCIAL";
  propertyType: string;
  country: string;
  city: string;
  measureIn:string;
  pricing:any;
  propertyName: string;
  propertyPrice: number;
  estimatePrice: number;
  totalRooms: number;
  propertyHeroImage: string;
  photoPath: string;
  crimeScore: number;
  averageHomePrice: number;
  predictedRentPrice: number;
  locality: string;
  address: string;
  bedrooms: number;
  balconies: number;
  totalFloors: number;
  bathrooms: number;
  amenities: [string];
  utilities: [string];
  totalArea: string;
  propertyDescription: string;
  propertyStyle: string;
  buildDate: Date;
  furnishingStatus: string;
  community: string;
  userId: object;
  owner: object;
  isFeatured: boolean;
  isApproved: boolean;
  isBlocked: string;
  pricingDetails: {
    ownership: string;
    expectedPrice: number;
    squareFt: number;
    isTax: boolean;
    isNegotiable: boolean;
    isLeased: boolean;
    retPerMonth: number;
    description: string;
    owner: object;
    property: object;
  };
  propertyTerm: {
    rentPrice: number;
    securityDeposit: number;
    availableDate: Date;
    leaseDuration: string;
    moveInFees: number;
    parking: number;
    displayName: string;
    contactNumber: number;
    isPets: boolean;
    property: object;
    unique: boolean;
    owner: object;
  };
  petsDetails: {
    petType: string;
    petRent: number;
    petLimit: number;
    property: object;
    owner: object;
    petDescription: string;
  };
  scheduleDetails: {
    property: object;
    date: Date;
    startTime: Date;
    endTime: Date;
    duration: string;
    owner: object;
  };
};
export type CouponCardType = {
  _id: number;
  couponCode: string;
  validFrom: Date;
  validTill: Date;
  maxUser: number;
  discount: number;
  users: [object];
  isValid: boolean;
};
