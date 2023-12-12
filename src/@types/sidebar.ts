import { TUserPermission } from "./permission";

export type SidebarTitle =
  | "Dashboard"
  | "Users"
  | "Categories"
  | "Products"
  | "Orders"
  | "Sizes"
  | "Permissions"
  | "Banners";

export type SidebarPath =
  | "/admin/dashboard"
  | "/admin/users"
  | "/admin/categories"
  | "/admin/products"
  | "/admin/orders"
  | "/admin/sizes"
  | "/admin/permissions"
  | "/admin/banners";

export type SidebarItem = {
  title: SidebarTitle;
  path: SidebarPath;
  icon: React.ReactNode;
  permission: TUserPermission;
};
