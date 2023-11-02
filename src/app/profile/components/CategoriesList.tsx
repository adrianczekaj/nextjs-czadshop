"use client";
import React, { useEffect, useState } from "react";
import { App, Button, Table } from "antd";
import CategoryForm from "@/app/profile/components/CategoryForm";
import axios from "axios";
import moment from "moment";

function CategoriesList() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const getCategories = async function () {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories");
      setCategories(
        response.data.data.map((category: any) => {
          return { ...category, key: category._id };
        })
      );
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Created by",
      dataIndex: "createdBy",
      render: (createdBy: any) => createdBy.name,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD MMM YYYY"),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowCategoryForm(true)}>
          Add category
        </Button>
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={categories}
          pagination={false}
          loading={loading}
        />
      </div>

      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          reloadData={() => {}}
        />
      )}
    </div>
  );
}

export default CategoriesList;
