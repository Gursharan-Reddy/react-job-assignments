// src/components/EditUserModal.js
import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const EditUserModal = ({ user, visible, onEdit, onCancel }) => {
  const [form] = Form.useForm();

  // This effect runs when the modal becomes visible or the user data changes.
  // It populates the form fields with the current user's data.
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
      });
    }
  }, [user, visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Reset fields after submission
        form.resetFields();
        // Pass the updated values (along with the user ID) to the onEdit function
        onEdit({ ...user, ...values });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Basic Modal"
      okText="OK"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="user_edit_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;