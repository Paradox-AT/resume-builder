import type { ResumeData } from "@/types";

export const fullstackResume: ResumeData = {
  personalInfo: {
    name: "Aayush Thakur",
    role: "Sr. Full-Stack Engineer / Tech Lead",
    profilePhotoUrl: "/Me.jpg",
  },
  summary: "Senior Full-Stack Engineer and Engineering Leader with nearly a decade of experience building and scaling production-ready enterprise web & mobile applications, microservices, and distributed cloud systems. Combines deep technical mastery across React, Next.js, Node.js, Java, Spring Boot, and React Native/Android with a proven track record of architecting high-throughput REST/GraphQL APIs, optimizing database pipelines, and leading high-performing engineering teams. Expert at transforming complex product requirements into resilient, high-availability architectures and driving end-to-end DevOps automation.",
  contact: {
    phone: "+91 99 777 46005",
    email: "thakur.aayush@hotmail.com",
    linkedin: "linkedin.com/in/thakur-aayush",
    github: "github.com/Paradox-AT",
  },
  workHistory: [
    {
      id: "livegage",
      date: { start: "2025-11", end: "Current" },
      title: "Senior Full-Stack Engineer / Team Lead",
      company: "Livegage, Remote",
      bullets: [
        "Architected and delivered an enterprise-grade mortgage management platform (POC to production), systematically migrating legacy complex core features into modern, event-driven microservices.",
        "Engineered a robust, highly branching Finite State Machine (FSM) engine to capture, model, and immutably validate multi-stakeholder mortgage workflows with audit-grade state reliability.",
        "Orchestrated multi-environment container deployments across AWS (EKS, ECS, and Docker), establishing CI/CD pipelines, automated testing suites, and high-availability DevOps orchestration."
      ],
    },
    {
      id: "fujitsu",
      date: { start: "2024-03", end: "2024-12" },
      title: "Full-Stack Application Developer",
      company: "Fujitsu, Pune",
      bullets: [
        "Directed zero-downtime database migrations and core Java/Spring Boot API lifecycle upgrades for enterprise client applications, ensuring continuous 99.99% service availability.",
        "Delivered a 35% increase in backend API throughput by optimizing SQL/NoSQL database queries, fine-tuning caching strategies, and load balancing high-concurrency microservices.",
        "Designed and executed rapid Proof of Concept (POC) full-stack frameworks to validate commercial viability, UI/UX responsiveness, and security architectures for emerging enterprise products."
      ],
    },
    {
      id: "protonshub",
      date: { start: "2023-02", end: "2024-02" },
      title: "Full-Stack Consultant",
      company: "Protonshub, Indore",
      bullets: [
        "Engineered IoT and web-integrated telemetry dashboards, designing RESTful and MQTT API microservices in Node.js and Java for automated payment processing and real-time sensor data streaming.",
        "Developed robust API middleware and integration layers bridging legacy enterprise software with modern cloud-native web and mobile applications, ensuring zero operational downtime.",
        "Conducted comprehensive code reviews, API security vulnerability assessments, and database query optimizations, significantly reducing response latency and infrastructure execution costs."
      ],
    },
    {
      id: "spydra",
      date: { start: "2022-04", end: "2023-01" },
      title: "Staff Engineer (Full-Stack & Mobile)",
      company: "Spydra, Bengaluru, India",
      bullets: [
        "Headed the architecture and engineering of high-availability SaaS products, backend microservices, and React Native mobile applications, ensuring technical feasibility, scalability, and system performance.",
        "Built a universal GraphQL API aggregation layer over CouchDB/PostgreSQL to simplify complex nested JSON queries for unstructured schema data, maintaining granular access control (ACL).",
        "Created scalable payment integration microservices using Stripe, Webhooks, and Go (Gin framework), optimizing transaction workflows and reducing checkout latency."
      ],
    },
    {
      id: "koinearth",
      date: { start: "2021-06", end: "2022-03" },
      title: "Senior Full-Stack Engineer",
      company: "KoineArth, Bengaluru, India",
      bullets: [
        "Developed core web and mobile application architectures for enterprise supply chain platforms, building reactive React / React Native frontends and high-throughput Node.js/Java backend services.",
        "Co-developed a premium digital brand engagement platform (ngageN), engineering high-concurrency microservices, multi-tier incentive layers, and responsive user portals.",
        "Enforced strict code quality standards, automated test suites (Jest, Cypress), and security controls to protect sensitive user data and ensure industry compliance."
      ],
    },
    {
      id: "antier",
      date: { start: "2020-10", end: "2021-05" },
      title: "Senior Full-Stack Engineer",
      company: "Antier Solutions, Chandigarh, India",
      bullets: [
        "Architected full-stack web and Android mobile applications for enterprise digital banking applications (Sara Banking), meeting strict financial regulatory standards and data privacy requirements.",
        "Integrated critical third-party Web2 infrastructure including payment gateways, OAuth authentication, KYC/AML identity verification (Sumsub), and cloud storage services.",
        "Upskilled and mentored 10+ software engineers in full-stack JavaScript/TypeScript and Java paradigms, leading technical workshops on state management, REST API design, and clean architecture."
      ],
    },
    {
      id: "acs",
      date: { start: "2017-07", end: "2020-09" },
      title: "Full-Stack Engineer",
      company: "ACS Solutions, Hyderabad, India",
      bullets: [
        "Served as end-to-end owner for enterprise transport management systems (TMS), architecting responsive React web interfaces and Java / Spring Boot microservice backends.",
        "Constructed full-stack web and native Android architectures for automated Electronic Fund Transfer (EFT) portals, providing intuitive web dashboards and secure, auditable backend transaction logging.",
        "Led and mentored a team of 5 developers on full-stack web & mobile fundamentals, Git workflows, and API integration best practices, guiding the team through successful delivery."
      ],
    },
  ],
  education: [
    {
      id: "ips",
      date: { start: "2013-07", end: "2017-06" },
      degree: "Bachelor of Engineering Technology: Computer Science And Programming",
      school: "IPS Academy – Indore",
    },
  ],
  skills: [
    { name: "React / Next.js", level: 5 },
    { name: "Node.js / Express", level: 5 },
    { name: "Spring Boot", level: 4 },
    { name: "React Native", level: 4 },
    { name: "Android", level: 3 },
    { name: "GraphQL & REST", level: 5 },
    { name: "PostgreSQL / SQL", level: 4 },
    { name: "MongoDB / NoSQL", level: 4 },
    { name: "Docker & K8s", level: 4 },
    { name: "AWS Cloud", level: 4 },
  ],
  languages: [
    { name: "TypeScript", level: 5 },
    { name: "JavaScript", level: 5 },
    { name: "Java", level: 4 },
    { name: "Golang", level: 4 },
    { name: "Python", level: 3 },
    { name: "HTML5 / CSS3", level: 5 },
    { name: "SQL", level: 4 },
    { name: "Bash", level: 3 },
    { name: "C/C++", level: 2 },
  ],
};
