import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { TUserPermission } from "../@types/permission";
import NoPermission from "../components/NoPermission";

const withPermission = (
  WrappedComponent: React.FC,
  requiredPermission: TUserPermission
) => {
  return () => {
    const currentUser = useSelector((state: AppState) => state.auth.user);
    if (!currentUser?.permission) {
      return <NoPermission />;
    }
    const hasPermission = currentUser.permission.find(
      (permission) => permission.name === requiredPermission
    );
    if (!hasPermission) {
      return <NoPermission />;
    }
    return <WrappedComponent />;
  };
};

export default withPermission;
