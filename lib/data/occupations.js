export const OCCUPATIONS = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Engineering",
    description: "Designs, develops, and maintains both client-side and server-side web architectures, APIs, and data layers.",
    averageSalary: "₹6.5 - ₹16.0 LPA",
    demandLevel: "Very High",
    qpCode: "SSC/Q0509",
    nsqfLevel: "Level 6",
    requiredSkills: [
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "HTML5",
      "CSS3",
      "SQL",
      "MongoDB",
      "RESTful APIs",
      "Git",
      "Tailwind CSS",
      "Docker"
    ],
    recommendedCourses: ["pmkvy-fsd-01", "pmkvy-web-02"]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Software Engineering",
    description: "Constructs responsive, accessible, and high-performance user interfaces and web applications using modern web standards.",
    averageSalary: "₹5.0 - ₹12.5 LPA",
    demandLevel: "High",
    qpCode: "SSC/Q0503",
    nsqfLevel: "Level 5",
    requiredSkills: [
      "JavaScript",
      "React.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Next.js",
      "TypeScript",
      "Responsive Design",
      "Git",
      "Web Performance"
    ],
    recommendedCourses: ["pmkvy-web-02", "pmkvy-fsd-01"]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Engineering",
    description: "Engineers core business logic, microservices, databases, authentication, and integration pipelines for scalable systems.",
    averageSalary: "₹6.0 - ₹15.0 LPA",
    demandLevel: "Very High",
    qpCode: "SSC/Q0508",
    nsqfLevel: "Level 6",
    requiredSkills: [
      "Node.js",
      "Express.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "RESTful APIs",
      "Docker",
      "Redis",
      "System Architecture",
      "Git"
    ],
    recommendedCourses: ["pmkvy-backend-03", "pmkvy-cloud-05"]
  },
  {
    id: "software-developer",
    title: "Software Developer",
    category: "Software Engineering",
    description: "Applies computer science foundations, algorithms, and object-oriented programming to build enterprise software solutions.",
    averageSalary: "₹5.5 - ₹14.0 LPA",
    demandLevel: "High",
    qpCode: "SSC/Q0508",
    nsqfLevel: "Level 5",
    requiredSkills: [
      "Java",
      "C++",
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "SQL",
      "Git",
      "Unit Testing",
      "Software Design Patterns",
      "Linux"
    ],
    recommendedCourses: ["pmkvy-backend-03", "pmkvy-fsd-01"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & AI",
    description: "Transforms raw business and transactional data into actionable insights, dashboards, statistical metrics, and forecasts.",
    averageSalary: "₹4.8 - ₹11.5 LPA",
    demandLevel: "High",
    qpCode: "SSC/Q0401",
    nsqfLevel: "Level 5",
    requiredSkills: [
      "SQL",
      "Python",
      "Excel",
      "Power BI",
      "Tableau",
      "Pandas",
      "Data Visualization",
      "Statistical Analysis",
      "Data Cleaning"
    ],
    recommendedCourses: ["pmkvy-data-04", "pmkvy-ai-08"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    description: "Develops statistical models, machine learning algorithms, and predictive analytics pipelines to solve complex business problems.",
    averageSalary: "₹8.0 - ₹18.0 LPA",
    demandLevel: "Very High",
    qpCode: "SSC/Q8115",
    nsqfLevel: "Level 7",
    requiredSkills: [
      "Python",
      "Machine Learning",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Deep Learning",
      "SQL",
      "Statistical Modeling",
      "TensorFlow",
      "Data Preprocessing"
    ],
    recommendedCourses: ["pmkvy-ai-08", "pmkvy-data-04"]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Infrastructure & Security",
    description: "Protects IT infrastructure, monitors security incident events, conducts vulnerability assessments, and enforces compliance.",
    averageSalary: "₹6.0 - ₹14.5 LPA",
    demandLevel: "Very High",
    qpCode: "SSC/Q0901",
    nsqfLevel: "Level 5",
    requiredSkills: [
      "Network Security",
      "Ethical Hacking",
      "SIEM Tools",
      "Linux",
      "Vulnerability Assessment",
      "Firewalls",
      "Cryptography",
      "Incident Response",
      "Wireshark"
    ],
    recommendedCourses: ["pmkvy-cyber-06", "pmkvy-net-07"]
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    category: "Infrastructure & Security",
    description: "Architects, deploys, and manages resilient cloud infrastructure, serverless solutions, and containerized cloud workloads.",
    averageSalary: "₹7.0 - ₹16.5 LPA",
    demandLevel: "Very High",
    qpCode: "SSC/Q8104",
    nsqfLevel: "Level 6",
    requiredSkills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Linux",
      "Terraform",
      "CI/CD Pipelines",
      "Bash Scripting",
      "Cloud Networking",
      "Git"
    ],
    recommendedCourses: ["pmkvy-cloud-05", "pmkvy-cyber-06"]
  },
  {
    id: "database-administrator",
    title: "Database Administrator",
    category: "Data & Infrastructure",
    description: "Manages, optimizes, secures, and backs up mission-critical relational and NoSQL database management systems.",
    averageSalary: "₹5.5 - ₹13.0 LPA",
    demandLevel: "Moderate",
    qpCode: "SSC/Q0110",
    nsqfLevel: "Level 5",
    requiredSkills: [
      "SQL",
      "PostgreSQL",
      "MySQL",
      "Database Optimization",
      "Query Tuning",
      "Backup & Recovery",
      "Database Security",
      "Linux",
      "Replication"
    ],
    recommendedCourses: ["pmkvy-backend-03", "pmkvy-data-04"]
  },
  {
    id: "network-administrator",
    title: "Network Administrator",
    category: "Infrastructure & Security",
    description: "Configures, maintains, and troubleshoots enterprise local area networks (LAN), WANs, routers, switches, and VPN tunnels.",
    averageSalary: "₹4.5 - ₹10.0 LPA",
    demandLevel: "Moderate",
    qpCode: "SSC/Q0903",
    nsqfLevel: "Level 4",
    requiredSkills: [
      "Networking Protocols (TCP/IP, DNS, DHCP)",
      "Cisco IOS / Routing & Switching",
      "Firewalls & VPNs",
      "Linux & Windows Server",
      "Network Monitoring",
      "Troubleshooting",
      "Wireshark"
    ],
    recommendedCourses: ["pmkvy-net-07", "pmkvy-cyber-06"]
  }
];

export const SKILL_CATEGORIES = {
  "Programming Languages": ["JavaScript", "Python", "Java", "C++", "TypeScript", "SQL", "HTML5", "CSS3", "Bash Scripting"],
  "Frameworks & Libraries": ["React.js", "Next.js", "Node.js", "Express.js", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Tailwind CSS"],
  "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  "Tools & Platforms": ["Git", "Docker", "Kubernetes", "AWS", "Linux", "Power BI", "Tableau", "Excel", "Terraform", "Wireshark", "CI/CD Pipelines", "SIEM Tools"],
  "Concepts & Methodologies": ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "RESTful APIs", "Machine Learning", "Deep Learning", "Network Security", "Ethical Hacking", "Responsive Design", "System Architecture", "Query Tuning"]
};

