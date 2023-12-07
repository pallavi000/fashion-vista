export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  avatar: string;
}

export type TUserRole = "USER" | "ADMIN";

export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TUserRole | null;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
};
export type TUserEditInput = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TUserRole | null;
  avatar: string;
  password: string;
};

export type UserAddressInputs = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type TUpdatePasswordInput = {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
};

export type TGoogleCredentialUser = {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: boolean;
  nbf?: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale?: string;
  iat?: number;
  exp?: number;
  jti?: string;
};
