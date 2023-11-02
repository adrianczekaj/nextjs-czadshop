"use client";
import React, { useState } from "react";
import { Button } from "antd";
import CategoryForm from "@/app/profile/components/CategoryForm";

function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowCategoryForm(true)}>
          Add category
        </Button>
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
