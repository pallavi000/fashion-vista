export type SidebarTitle =
  | "Dashboard"
  | "Users"
  | "Categories"
  | "Products"
  | "Orders"
  | "Sizes"
  | "Permissions";

export type SidebarPath =
  | "/admin/dashboard"
  | "/admin/users"
  | "/admin/categories"
  | "/admin/products"
  | "/admin/orders"
  | "/admin/sizes"
  | "/admin/permissions";

export type SidebarItem = {
  title: SidebarTitle;
  path: SidebarPath;
  icon: React.ReactNode;
};
