export default interface usertype {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  countryCode: string;
  photoUrl: string;
  photoPath?: string;
  dateOfBirth: string;
  role: "ADMIN" | "TENANT" | "SUPERADMIN";
  encrypted_password: string;
  password: string;
  salt: string;
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  isOnline: boolean;
  blockStatus: "BLOCKED" | "UNBLOCKED";
  lastLogin: Date | string;
  token: string;
  encryptPassword(rawPassword: string): string;
  authenticate(rawPassword: string): boolean;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    countryCode: string;
    photoUrl: string;
    photoPath?: string;
    dateOfBirth: string;
    role: "ADMIN" | "TENANT" | "SUPERADMIN";
    encrypted_password: string;
    password: string;
    salt: string;
    fcmTokens: {
      web: string;
      android: string;
      ios: string;
    };
    isOnline: boolean;
    blockStatus: "BLOCKED" | "UNBLOCKED";
    lastLogin: Date | string;
    token: string;
    encryptPassword(rawPassword: string): string;
    authenticate(rawPassword: string): boolean;
  };
}
