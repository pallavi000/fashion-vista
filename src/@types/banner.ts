export type TBanner = {
  _id: string;
  banner: string;
  page?: string;
  position?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BannerInputs = {
  banner: string;
  page: string;
  position: string;
};
