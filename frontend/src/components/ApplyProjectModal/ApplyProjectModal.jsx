import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Spin,
  message,
} from "antd";
import axios from "axios";
import "./ApplyProjectModal.css";

const { TextArea } = Input;
const { Title } = Typography;

const ApplyProjectModal = ({ isOpen, onClose, projectId }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    } else {
      form.resetFields();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/applications/profile",
        {
          withCredentials: true,
        }
      );

      const data = response.data || {};

      form.setFieldsValue({
        student_name: data.student_name || "",
        student_email: data.student_email || "",
        phone_number: data.phone_number || "",
        github_url: data.github_url || "",
        linkedin_url: data.linkedin_url || "",
        resume_url: data.resume_url || "",
      });
    } catch (error) {
      console.error(error);

      message.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:8000/api/applications",
        {
          project_id: projectId,
          ...values,
        },
        {
          withCredentials: true,
        }
      );

      message.success("Application submitted successfully.");

      onClose();

      form.resetFields();
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message ||
          "Failed to submit application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>Apply for Project</Title>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Divider style={{ margin: "12px 0 24px" }} />

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "50px 0",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="student_name"
                label="Student Name *"
                rules={[
                  {
                        required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="student_email"
                label="Email *"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                ]}
              >
                <Input
                  readOnly
                  disabled
                  style={{
                    color: "rgba(0,0,0,0.45)",
                    cursor: "not-allowed",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Phone Number *"
                rules={[
                  {
                    required: true,
                    message: "Please enter phone number",
                  },
                ]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="resume_url"
                label="Resume URL *"
                rules={[
                  {
                    required: true,
                    message: "Please enter resume URL",
                  },
                ]}
              >
                <Input placeholder="https://drive.google.com/..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="github_url"
                label="GitHub URL"
              >
                <Input placeholder="https://github.com/username" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="linkedin_url"
                label="LinkedIn URL"
              >
                <Input placeholder="https://linkedin.com/in/username" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Form.Item
            name="cover_note"
            label="Cover Note *"
            rules={[
              {
                required: true,
                message: "Please enter your cover note",
              },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Tell us why you're the right candidate for this project..."
            />
          </Form.Item>

          <Form.Item
            name="additional_comments"
            label="Additional Comments"
          >
            <TextArea
              rows={3}
              placeholder="Anything else you'd like the evaluator to know..."
            />
          </Form.Item>

          <Form.Item
            style={{
              marginTop: 30,
              marginBottom: 0,
              textAlign: "right",
            }}
          >
            <Space>
              <Button
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                Submit Application
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ApplyProjectModal;