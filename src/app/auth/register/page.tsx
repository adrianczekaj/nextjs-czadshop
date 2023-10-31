"use client";
import React, { useState } from "react";
import { App, Button, Form } from "antd";
import Link from "next/link";
import { getAntdFieldRequiredRule } from "@/helpers/validation";
import axios from "axios";
import { useRouter } from "next/navigation";

interface userType {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const router = useRouter();
  const onRegister = async (values: userType) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/register", values);
      message.success("Registration successful, please login to continue!");
      router.push("/auth/login");
    } catch (e: any) {
      message.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="h-full bg-primary hidden md:flex items-center justify-center">
        <h1 className="text-7xl font-bold text-red-500">Czad</h1>
        <h1 className="text-7xl font-bold text-gray-500">-</h1>
        <h1 className="text-7xl font-bold text-yellow-500">Shop</h1>
      </div>
      <div className="flex items-center justify-center h-full">
        <Form
          className="w-[400px] flex flex-col gap-5"
          layout="vertical"
          onFinish={onRegister}
          initialValues={{ name: "", email: "", password: "" }}
        >
          <h1 className="text-2xl font-bold">Register</h1>

          <hr />

          <Form.Item
            name="name"
            label="Name"
            rules={getAntdFieldRequiredRule("Please input your name!")}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={getAntdFieldRequiredRule("Please input your email!")}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={getAntdFieldRequiredRule("Please input your password!")}
          >
            <input type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>

          <Link href="/auth/login" className="text-primary">
            Already have an account? Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
