export interface Topic {
  title: string;
}

export interface Unit {
  unit: string;
  title?: string;
  hours?: number;
  topics?: string[];
}

export interface Subject {
  slug: string;
  subject_name: string;
  type: string;
  units?: Unit[];
}

export const subjects: Subject[] = [
  {
    slug: "operating-system",
    type: "theory",
    subject_name: "Operating System",
    units: [
      { unit: "Unit 1", title: "Overview of Operating System", topics: ["Evolution", "Kernel Architectures"] },
      { unit: "Unit 2", title: "Process Management", topics: ["Process States", "Scheduling Algorithms"] },
      { unit: "Unit 3", title: "Process Co-ordination", topics: ["Deadlock Prevention", "Semaphores"] },
    ],
  },
  {
    slug: "java-programming",
    type: "theory",
    subject_name: "Java Programming",
    units: [
      { unit: "Unit 1", title: "Basic Concepts", topics: ["Classes", "Constructors"] },
      { unit: "Unit 2", title: "OOP", topics: ["Inheritance", "Exception Handling"] },
      { unit: "Unit 3", title: "Multithreading", topics: ["Thread Life Cycle", "Synchronization"] },
    ],
  },
  {
    slug: "hardware-networking",
    type: "lab",
    subject_name: "Hardware & Networking Lab",
    units: [
      { unit: "Experiment 1", title: "Basic Commands for Switch Configuration" },
      { unit: "Experiment 2", title: "Router Configuration" },
      { unit: "Experiment 3", title: "Installation of Windows OS" },
    ],
  },
  {
    slug: "engineering-economics",
    type: "theory",
    subject_name: "Engineering Economics",
    units: [
      { unit: "Unit 1", title: "Demand Analysis" },
      { unit: "Unit 2", title: "Theory of Production" },
    ],
  },
  {
    slug: "environmental-studies",
    type: "theory",
    subject_name: "Environmental Studies",
    units: [
      { unit: "Unit 1", title: "Natural resources" },
      { unit: "Unit 2", title: "Ecosystem and Biodiversity" },
    ],
  },
  {
    slug: "employability-skills",
    type: "theory",
    subject_name: "Employability Skills",
    units: [
      { unit: "Unit 1", title: "Soft Skills Development" },
      { unit: "Unit 2", title: "Aptitude and Problem-Solving Skills" },
    ],
  },
  {
    slug: "sensors-actuators",
    type: "theory",
    subject_name: "Sensors and Actuators",
    units: [
      { unit: "Unit 1", title: "Introduction to Sensors" },
      { unit: "Unit 2", title: "Temperature and Pressure Sensors" },
    ],
  },
];
