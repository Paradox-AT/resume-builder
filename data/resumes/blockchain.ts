import type { ResumeData } from "@/types";

export const blockchainResume: ResumeData = {
  label: "Sr. Blockchain Engineer",
  personalInfo: {
    name: "Aayush Thakur",
    role: "Sr. Blockchain Engineer",
    profilePhotoUrl: "/Me.jpg",
  },
  summary: "Enterprise Blockchain Architect and Engineering Leader with nearly a decade of experience spearheading the development of production-ready blockchain solutions. Combines deep technical mastery of Hyperledger and Ethereum with a proven ability to build and mentor high-performing engineering teams. Adept at transforming complex business requirements into robust, high-availability architectures, driving zero-downtime migrations, and delivering secure, audited smart contracts that maximize operational efficiency.",
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
        "Architected and delivered an enterprise-grade mortgage Proof of Concept (POC), systematically migrating highly complex core traditional features into production-ready smart contract chaincode.",
        "Engineered a robust, highly branching Finite State Machine (FSM) to capture, model, and immutably validate the entire multi-stakeholder lifecycle of mortgages, ensuring flawless state auditing.",
        "Orchestrated seamless multi-node deployment and container network configurations across AWS environments (using EKS for staging/demo and Docker for local development), securing high availability and streamlined DevOps orchestration."
      ],
    },
    {
      id: "fujitsu",
      date: { start: "2024-03", end: "2024-12" },
      title: "Application Developer",
      company: "Fujitsu, Pune",
      bullets: [
        "Directed the zero-downtime migration and lifecycle upgrade of enterprise-grade Hyperledger Fabric networks, ensuring continuous service availability for high-throughput client applications.",
        "Delivered a 35% increase in network throughput post-upgrade by optimizing transaction endorsement policies, fine-tuning block parameters, and implementing new Fabric chaincode lifecycle management, validated via Hyperledger Caliper.",
        "Designed and executed high-impact Proof of Concept (POC) frameworks, conducting rapid structural testing to validate the commercial viability and security architectures of emerging Web3 use cases."
      ],
    },
    {
      id: "protonshub",
      date: { start: "2023-02", end: "2024-02" },
      title: "Blockchain Consultant",
      company: "Protonshub, Indore",
      bullets: [
        "Pioneered R&D initiatives blending blockchain with IoT architectures, designing decentralized frameworks for secure machine-to-machine (M2M) automated payments and immutable device-identity logging integrated via MQTT and HTTPS REST APIs.",
        "Developed middleware and API layers to securely integrate legacy Web2 systems with decentralized ledgers, ensuring zero operational downtime and seamless cross-platform data synchronization.",
        "Conducted comprehensive smart contract audits, security vulnerability assessments, and gas optimization testing for Ethereum mainnet, Tron, and Hyperledger Besu networks, significantly reducing execution costs and mitigating critical exploits prior to mainnet deployment."
      ],
    },
    {
      id: "spydra",
      date: { start: "2022-04", end: "2023-01" },
      title: "Staff Engineer",
      company: "Spydra, Bengaluru, India",
      bullets: [
        "Headed the architecture and development of high-availability blockchain services and core infrastructure, ensuring technical feasibility, scalability, and system performance for enterprise-grade DaaS products.",
        "Built a universal GraphQL interface over Hyperledger Fabric's CouchDB state database to simplify complex JSON queries for unstructured schema data, maintaining granular access control (ACL) at the chaincode level.",
        "Created robust payment integration microservices using Stripe and the Go/Gin framework, optimizing transaction workflows and reducing checkout latency."
      ],
    },
    {
      id: "koinearth",
      date: { start: "2021-06", end: "2022-03" },
      title: "Senior Blockchain Engineer",
      company: "KoineArth, Bengaluru, India",
      bullets: [
        "Developed the core blockchain architecture for MarketsN, deploying cross-organizational Hyperledger Fabric private channels and wrapping FSM-driven chaincode that minimized supply chain transaction costs and mitigated billing fraud.",
        "Co-developed ngageN, an exclusive, invitation-only Web3 brand engagement platform, writing high-throughput Solidity smart contracts (ERC-721 and ERC-1155) to power digital asset creation and multi-tier incentive layers for premium content owners anchoring the passion economy.",
        "Performed comprehensive code reviews and implemented robust security controls to ensure code quality, enforce best practices, protect sensitive data, maintain system integrity, and meet industry compliance requirements."
      ],
    },
    {
      id: "antier",
      date: { start: "2020-10", end: "2021-05" },
      title: "Senior Blockchain Engineer",
      company: "Antier Solutions, Chandigarh, India",
      bullets: [
        "Established the governance framework design for a decentralized banking Proof of Concept (POC) for Sara Banking, ensuring strict regulatory compliance, data privacy, and operational efficiency within an enterprise banking environment.",
        "Acted as a technical consultant for enterprise clients, seamlessly integrating critical Web3 infrastructure including Chainlink Oracles (price feeds), non-custodial wallets, Infura nodes, and Sumsub KYC/AML verification services into production-ready dApps.",
        "Upskilled and mentored 10+ developers as the internal Subject Matter Expert (SME) on Hyperledger Fabric, leading technical workshops on permissioned ledgers, chaincode development, and network architecture."
      ],
    },
    {
      id: "acs",
      date: { start: "2017-07", end: "2020-09" },
      title: "Blockchain Engineer",
      company: "ACS Solutions, Hyderabad, India",
      bullets: [
        "Served as the sole subject matter expert and end-to-end owner for all blockchain initiatives. Architected, built, and deployed a decentralized Transport Management System (TMS) utilizing Hyperledger Fabric that secured 100% data integrity for business records.",
        "Constructed the full-stack architecture (frontend and backend) for a blockchain-integrated Electronic Fund Transfer (EFT) platform powered by Hyperledger Fabric, ensuring seamless user experiences and robust, auditable transaction logging.",
        "Led and mentored a team of 5 developers on blockchain fundamentals and integration best practices, successfully guiding the team through complex project delivery and ensuring high code quality."
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
    { name: "Hyperledger", level: 5 },
    { name: "Ethereum", level: 4 },
    { name: "Corda", level: 2 },
    { name: "Linux", level: 5 },
    { name: "IPFS", level: 4 },
    { name: "Android", level: 2 },
    { name: "Node.js", level: 4 },
    { name: "Spring Boot", level: 3 },
    { name: "GraphQL", level: 4 },
    { name: "NoSQL Database", level: 4 },
    { name: "SQL Database", level: 3 },
  ],
  languages: [
    { name: "Golang", level: 4 },
    { name: "Java", level: 3 },
    { name: "C#", level: 3 },
    { name: "C/C++", level: 2 },
    { name: "Kotlin", level: 2 },
    { name: "Javascript", level: 3 },
    { name: "TypeScript", level: 4 },
    { name: "Bash", level: 2 },
    { name: "Python", level: 2 },
  ],
};
