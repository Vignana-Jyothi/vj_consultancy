import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Tag,
  Button,
  Row,
  Col,
  Descriptions,
  Alert,
  Skeleton,
  Space,
  Typography,
  Divider,
} from "antd";
import { ArrowLeft, ExternalLink, Briefcase, DollarSign, Clock, Calendar, CheckSquare } from "lucide-react";
import "./ProjectDetails.css";
import ApplyProjectModal from "../../components/ApplyProjectModal/ApplyProjectModal";

const { Title, Text, Paragraph } = Typography;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/projects/${id}`,
          {
            withCredentials: true,
          }
        );
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="project-details-loading">
        <Button
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
          className="back-btn"
          style={{ marginBottom: 24 }}
        >
          Back
        </Button>
        <Card className="skeleton-card">
          <Skeleton active avatar={{ size: "large", shape: "square" }} paragraph={{ rows: 4 }} />
          <Divider />
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>
    );
  }

  // Format skills string/array
  const skillsArray = typeof project.skills === "string"
    ? project.skills.split(",").map(s => s.trim()).filter(Boolean)
    : Array.isArray(project.skills) ? project.skills : [];

  // Parse client requirements into bullet points
  const requirementsArray = typeof project.client_requirements === "string"
    ? project.client_requirements.split("\n").map(r => r.trim()).filter(Boolean)
    : Array.isArray(project.client_requirements) ? project.client_requirements : [];

  // Map status colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "open":
        return "success";
      case "in progress":
        return "processing";
      case "completed":
        return "blue";
      case "closed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="project-details-container">
      <div className="back-btn-container">
        <Button
          type="text"
          icon={<ArrowLeft size={16} style={{ marginRight: 8, verticalAlign: "middle" }} />}
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          Back to Projects
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Main Details Column */}
        <Col xs={24} lg={16}>
          <Card className="main-project-card">
            {/* Header Area */}
            <div className="project-header">
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <div className="project-badges">
                  {project.category && (
                    <Tag color="blue" className="project-badge category-badge">
                      {project.category}
                    </Tag>
                  )}
                  {project.status && (
                    <Tag color={getStatusColor(project.status)} className="project-badge status-badge">
                      {project.status.toUpperCase()}
                    </Tag>
                  )}
                  {project.payment_type && (
                    <Tag color="purple" className="project-badge payment-type-badge">
                      {project.payment_type === "fixed" ? "Fixed Price" : "Hourly"}
                    </Tag>
                  )}
                </div>
                <Title level={2} className="project-title">
                  {project.title}
                </Title>
              </Space>
            </div>

            <Divider style={{ margin: "20px 0" }} />

            {/* Description Section */}
            <div className="project-description-section">
              <Title level={4} className="section-title">
                Project Description
              </Title>
              <Paragraph className="project-description-text">
                {project.description}
              </Paragraph>
            </div>

            {/* Skills Section */}
            {skillsArray.length > 0 && (
              <div className="project-skills-section">
                <Title level={4} className="section-title">
                  Required Skills
                </Title>
                <div className="skills-tags">
                  {skillsArray.map((skill, index) => (
                    <Tag key={index} className="skill-pill">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Client Requirements Section */}
            {requirementsArray.length > 0 && (
              <div className="project-requirements-section">
                <Title level={4} className="section-title">
                  Client Requirements
                </Title>
                <div className="requirements-box">
                  <ul className="requirements-list">
                    {requirementsArray.map((req, index) => (
                      <li key={index} className="requirement-item">
                        <CheckSquare size={16} className="req-icon" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </Col>

        {/* Sticky Apply & Info Sidebar Column */}
        <Col xs={24} lg={8}>
          <div className="sticky-sidebar">
            <Card className="sidebar-info-card">
              <Title level={4} className="sidebar-title">
                Project Overview
              </Title>
              
              <div className="overview-details">
                {project.payment_type === "fixed" ? (
                  <Descriptions column={1} bordered size="small" layout="horizontal">
                    <Descriptions.Item label={<span className="desc-label"><DollarSign size={14} /> Budget</span>}>
                      <Text strong className="value-highlight">₹{project.budget}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="desc-label"><Clock size={14} /> Duration</span>}>
                      {project.duration}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="desc-label"><Calendar size={14} /> Deadline</span>}>
                      {project.deadline?.split("T")[0]}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  <Space direction="vertical" size={16} style={{ width: "100%" }}>
                    <Descriptions column={1} bordered size="small" layout="horizontal">
                      <Descriptions.Item label={<span className="desc-label"><DollarSign size={14} /> Hourly Rate</span>}>
                        <Text strong className="value-highlight">₹{project.hourly_rate}/hr</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label={<span className="desc-label"><Briefcase size={14} /> Est. Hours</span>}>
                        {project.estimated_hours || project.estimated_duration || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={<span className="desc-label"><DollarSign size={14} /> Est. Budget</span>}>
                        ₹{project.estimated_budget}
                      </Descriptions.Item>
                      <Descriptions.Item label={<span className="desc-label"><Clock size={14} /> Est. Duration</span>}>
                        {project.estimated_duration}
                      </Descriptions.Item>
                    </Descriptions>

                    <Alert
                      description="This is an hourly project. Estimated Budget shown above is only an approximation. Final payment depends on the total approved working hours and may be lower or higher than the estimated budget."
                      type="info"
                      showIcon={false}
                      className="hourly-alert"
                    />
                  </Space>
                )}
              </div>

              <Divider style={{ margin: "24px 0 16px 0" }} />

              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Button
                  type="primary"
                  size="large"
                  block
                  className="action-btn apply-btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Apply Now
                </Button>
                {project.source_website && (
                  <Button
                    icon={<ExternalLink size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />}
                    size="large"
                    block
                    href={project.source_website}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn open-project-btn"
                  >
                    Open Original Project
                  </Button>
                )}
              </Space>
            </Card>
          </div>
        </Col>
      </Row>

      <ApplyProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={id}
      />
    </div>
  );
};

export default ProjectDetails;