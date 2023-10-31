"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { App, Popover } from "antd";
import Loader from "@/app/components/Loader";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();
  const isPrivatePage =
    pathname !== "/auth/login" && pathname !== "/auth/register";

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/auth/currentuser");
      setCurrentUser(response.data.data);
    } catch (e: any) {
      message.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPrivatePage) {
      getCurrentUser();
    }
  }, [pathname]);

  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/auth/logout");
      message.success("Logout successfully");
      setCurrentUser(null);
      router.push("/auth/login");
    } catch (e: any) {
      message.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="flex flex-col gap-2 p-2">
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => router.push("/profile")}
      >
        <i className="ri-shield-user-line"></i>
        <span>Profile</span>
      </div>
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={onLogout}
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Log out</span>
      </div>
    </div>
  );

  return (
    <div>
      {loading && <Loader />}
      {isPrivatePage && currentUser && (
        <>
          <div className="bg-primary py-2 px-5 flex justify-between items-center">
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold text-red-500">Czad</h1>
              <h1 className="text-2xl font-bold text-yellow-500">Shop</h1>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ri-shopping-cart-line text-white text-2xl"></i>
              <Popover content={content} trigger="click">
                <div className="flex h-8 w-8 bg-white p-2 rounded-full items-center justify-center cursor-pointer">
                  <span>{currentUser.name[0].toUpperCase()}</span>
                </div>
              </Popover>
            </div>
          </div>
          <div className="p-5">{children}</div>
        </>
      )}

      {!isPrivatePage && children}
    </div>
  );
}

export default LayoutProvider;
