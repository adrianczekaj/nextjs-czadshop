"use client";
import React from "react";
import { Tabs, TabsProps } from "antd";
import { useSelector } from "react-redux";
import CategoriesList from "@/app/profile/components/CategoriesList";

function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);

  const adminTabs: TabsProps["items"] = [
    { key: "1", label: "Products", children: "Products" },
    { key: "2", label: "Categories", children: <CategoriesList /> },
    { key: "3", label: "Orders", children: "Orders" },
    { key: "4", label: "Users", children: "Users" },
  ];

  const userTabs: TabsProps["items"] = [
    { key: "1", label: "Orders", children: "Orders" },
    {
      key: "2",
      label: "Personal information",
      children: "Personal information",
    },
  ];

  return (
    <div>
      {currentUser.isAdmin && <Tabs items={adminTabs}></Tabs>}
      {!currentUser.isAdmin && <Tabs items={userTabs}></Tabs>}
    </div>
  );
}

export default Profile;
