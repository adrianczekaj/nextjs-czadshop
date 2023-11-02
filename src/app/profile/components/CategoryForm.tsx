import React, { useState } from "react";
import { App, Form, Modal } from "antd";
import { getAntdFieldRequiredRule } from "@/helpers/validation";
import axios from "axios";

interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: (show: boolean) => void;
  reloadData: () => void;
}

function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  reloadData,
}: CategoryFormProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async function (values: any) {
    try {
      setLoading(true);
      await axios.post("/api/categories", values);
      message.success("Category added successfully");
      setShowCategoryForm(false);
      reloadData();
    } catch (e: any) {
      message.error(e.response.data.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showCategoryForm}
      onCancel={() => setShowCategoryForm(false)}
      centered
      title={<h1 className="text-2xl font-bold text-gray-800">Add category</h1>}
      closable={false}
      okText="Save"
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <hr />
      <Form
        form={form}
        initialValues={{ name: "" }}
        layout="vertical"
        className="flex flex-col gap-5 mt-5"
        onFinish={onFinish}
      >
        <Form.Item
          label="Category name"
          name="name"
          rules={getAntdFieldRequiredRule("Category name is required")}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item
          label="Category description"
          name="description"
          rules={getAntdFieldRequiredRule("Category description is required")}
        >
          <textarea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryForm;
