export const projects = [
  {
    id: 1,
    name: "Orora Invoice Generator",
    description: "A Python-based web application built with Flask, designed to help a logistics company generate invoices for renting warehouse space. The app calculates charges based on the highest number of pallets stored, imported, and exported during the month, and generates the corresponding invoice. This automation reduced the average invoice generation time from 10 hours to just 30 minutes - a 95% reduction in processing time.",
    image: "/images/projects/project1.jpg",
    category: "Web Development",
    technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "CSV"],
    features: [
      "Calculations: Automated computation of charges for pallet storage, imports, and exports",
      "Data Management: CSV-based product data handling including category, Sage ID, and pallet metrics",
      "Stock Overview: Comprehensive dashboard for monitoring stock and pallet data",
      "Import/Export: Dedicated section for updating stock movements",
      "Local Storage: Efficient local data persistence for inventory tracking"
    ],
    learnings: "This project deepened my understanding of full-stack web development using Python and Flask, enhanced my skills in data processing and file handling, and provided practical experience in creating business automation tools. It also improved my ability to design user-friendly interfaces for complex business operations.",
    position: { x: 0, y: 0, z: 0 } // Will be calculated dynamically
  },
  {
    id: 2,
    name: "TA Marking App",
    description: "A custom-built application designed to simplify and automate the grading process for teaching assistants. The app tracks student marks and utilizes .xml files for data storage.",
    image: "/images/projects/project2.jpg",
    category: "Education Tools",
    technologies: ["HTML", "Python", "XML"],
    features: [
      "Frontend: Built a clean, user-friendly interface using HTML for quick data input and result display",
      "Backend: Designed Python scripts to handle mark calculations, validate input, and ensure data consistency",
      "Data Handling: Implemented XML parsing libraries to store and retrieve structured data efficiently",
      "Automation: Created reusable Python modules to automate grading processes, minimizing errors and saving time"
    ],
    learnings: "This project enhanced my skills in web development and UI design using HTML, writing efficient Python code to integrate frontend and backend systems, storing and processing structured data with XML, and designing automation tools to handle real-world workflows.",
    position: { x: 0, y: 0, z: 0 }
  },
  {
    id: 3,
    name: "Storage Tracking App for Logistics",
    description: "An application developed for a logistics company to manage product imports, exports, and track the number of pallets used in each shipment. Built with a cloud database for real-time data access and scalability.",
    image: "/images/projects/project3.jpg",
    category: "Enterprise Software",
    technologies: ["Java", "Cloud Database"],
    features: [
      "Backend Development: Used Java to handle user authentication, data validation, and CRUD operations for shipments",
      "Database Integration: Connected to a cloud-based database for secure and real-time tracking of shipment data",
      "Reporting Features: Added functionality to generate reports on import/export trends and pallet usage",
      "Scalability: Designed the app to handle large data sets, enabling seamless tracking for growing operations"
    ],
    learnings: "This project provided hands-on experience with building Java-based applications tailored to real-world business operations, integrating cloud databases to provide scalable solutions, designing efficient data tracking systems, and gaining a deeper understanding of logistics processes.",
    position: { x: 0, y: 0, z: 0 }
  }
];
