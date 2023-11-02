"use client";
import React, { useState } from "react";
import { Tabs, TabsProps } from "antd";
import { useSelector } from "react-redux";
import CategoriesList from "@/app/profile/components/CategoriesList";
import { useRouter, useSearchParams } from "next/navigation";

function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";
  const [selectedTab, setSelectedTab] = useState(id);
  const router = useRouter();

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
      {currentUser.isAdmin && (
        <Tabs
          items={adminTabs}
          onChange={(key) => {
            router.push(`/profile?id=${key}`);
            setSelectedTab(key);
          }}
          activeKey={selectedTab}
        ></Tabs>
      )}
      {!currentUser.isAdmin && <Tabs items={userTabs}></Tabs>}
    </div>
  );
}

export default Profile;
