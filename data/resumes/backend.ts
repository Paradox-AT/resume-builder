import type { ResumeData } from "@/types/resume";

export const backendResume: ResumeData = {
  label: "Sr. Backend Engineer",
  personalInfo: {
    name: "Aayush Thakur",
    role: "Sr. Backend Engineer (Golang & Node.js)",
    profilePhotoUrl: "/Me.jpg",
  },
  summary: "Senior Backend Engineer and Technical Lead with nearly a decade of experience architecting, building, and scaling high-throughput microservices, distributed cloud systems, and event-driven backend architectures. Deep technical mastery in Golang (Gin, Fiber, gRPC) and Node.js (Express, NestJS, TypeScript), paired with extensive expertise in SQL/NoSQL databases (PostgreSQL, Redis, MongoDB, CouchDB), containerization (Docker, Kubernetes), and AWS cloud infrastructure. Proven track record of driving zero-downtime API migrations, optimizing database/ledger state query performance, and leading engineering teams.",
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
      title: "Senior Blockchain Engineer / Team Lead",
      company: "Livegage, Remote",
      bullets: [
        "Architected and delivered high-performance mortgage management backend microservices (POC to production), systematically replacing monolithic legacy systems with event-driven architectures.",
        "Engineered a robust, highly branching Finite State Machine (FSM) backend engine to capture, model, and immutably validate multi-stakeholder mortgage workflows with audit-grade state reliability.",
        "Designed and implemented containerization setups using Docker for local and staging environments, while collaborating on AWS Kubernetes (EKS) multi-node deployment configurations and CI/CD pipelines.",
      ],
    },
    {
      id: "fujitsu",
      date: { start: "2024-03", end: "2024-12" },
      title: "Application Developer",
      company: "Fujitsu, Pune",
      bullets: [
        "Directed zero-downtime database migrations and API lifecycle upgrades for client applications, ensuring continuous 99.99% service availability.",
        "Delivered a 35% increase in backend API throughput by optimizing SQL/NoSQL databases and blockchain ledger state queries (CouchDB), fine-tuning channel-based concurrency, and load balancing microservices.",
        "Designed and executed rapid Proof of Concept (POC) backends to validate system throughput, API responsiveness, and security architectures.",
      ],
    },
    {
      id: "protonshub",
      date: { start: "2023-02", end: "2024-02" },
      title: "Blockchain Consultant",
      company: "Protonshub, Indore",
      bullets: [
        "Consulted enterprise clients on architecting blockchain-based applications and decentralized microservice architectures from scratch, defining technical feasibility and system topology.",
        "Engineered IoT and telemetry backend microservices designing RESTful, gRPC, and MQTT APIs for automated payment processing and real-time sensor data streaming.",
        "Conducted comprehensive code reviews, API security vulnerability assessments, and query optimizations across SQL/NoSQL databases and blockchain ledger state queries, significantly reducing response latency and infrastructure execution costs.",
      ],
    },
    {
      id: "spydra",
      date: { start: "2022-04", end: "2023-01" },
      title: "Staff Engineer",
      company: "Spydra, Bengaluru, India",
      bullets: [
        "Headed the architecture and engineering of high-availability backend microservices ensuring technical feasibility, high concurrency, and low-latency system performance.",
        "Built a universal GraphQL API aggregation layer over CouchDB/PostgreSQL to simplify complex nested JSON queries for unstructured schema data, maintaining granular access control (ACL).",
        "Created scalable payment integration backend services using Stripe, Webhooks, optimizing transaction workflows and reducing checkout latency.",
      ],
    },
    {
      id: "koinearth",
      date: { start: "2021-06", end: "2022-03" },
      title: "Senior Blockchain Engineer",
      company: "KoineArth, Bengaluru, India",
      bullets: [
        "Developed core backend architectures for enterprise supply chain platforms, building high-throughput REST services and concurrent chaincode microservices.",
        "Co-developed a premium digital brand engagement platform (ngageN), engineering high-concurrency microservices, multi-tier incentive layers, and asynchronous event processors.",
        "Enforced strict code quality standards, automated integration test suites, and security controls to protect sensitive data and meet industry compliance requirements.",
      ],
    },
    {
      id: "antier",
      date: { start: "2020-10", end: "2021-05" },
      title: "Senior Blockchain Engineer",
      company: "Antier Solutions, Chandigarh, India",
      bullets: [
        "Architected distributed microservice backends for enterprise digital banking applications (Sara Banking), meeting strict financial regulatory standards and data privacy requirements.",
        "Integrated critical third-party Web2 and Web3 infrastructure including payment gateways, OAuth authentication, KYC/AML identity verification (Sumsub), and cloud storage services into backend APIs.",
        "Upskilled and mentored 10+ software engineers in modern backend architectures and microservice paradigms, leading technical workshops on REST/gRPC API design, caching strategies, and clean architecture.",
      ],
    },
    {
      id: "acs",
      date: { start: "2017-07", end: "2020-09" },
      title: "Blockchain Engineer",
      company: "ACS Solutions, Hyderabad, India",
      bullets: [
        "Served as end-to-end backend architect for enterprise transport management systems (TMS), engineering scalable REST APIs and background worker processing pipelines.",
        "Constructed high-throughput backend services for automated Electronic Fund Transfer (EFT) portals, providing secure, auditable backend transaction logging and real-time state tracking.",
        "Led and mentored a team of 5 developers on backend engineering fundamentals, API design best practices, microservices, and database query optimization.",
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
    { name: "Golang / Go", level: 5 },
    { name: "Node.js / Express / NestJS", level: 5 },
    { name: "Microservices & gRPC", level: 5 },
    { name: "REST & GraphQL APIs", level: 5 },
    { name: "PostgreSQL / SQL", level: 4 },
    { name: "Redis & MongoDB", level: 4 },
    { name: "Docker & Kubernetes", level: 4 },
    { name: "AWS Cloud", level: 4 },
    { name: "Linux System Admin", level: 5 },
    { name: "Spring Boot / Java", level: 3 },
  ],
  languages: [
    { name: "Golang", level: 5 },
    { name: "TypeScript", level: 5 },
    { name: "JavaScript", level: 5 },
    { name: "SQL", level: 4 },
    { name: "Java", level: 3 },
    { name: "Python", level: 3 },
    { name: "Bash", level: 3 },
    { name: "C/C++", level: 2 },
  ],
};
