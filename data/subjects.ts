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
  {
    slug: "java-programming-lab",
    type: "lab",
    subject_name: "Java Programming Lab",
    units: [
      { unit: "Experiment 1", title: "Method Overloading", topics: ["Multiple methods with same name", "Different parameters"] },
      { unit: "Experiment 2", title: "Constructor & Types of Constructor", topics: ["Default constructor", "Parameterized constructor"] },
      { unit: "Experiment 3", title: "Types of Array", topics: ["Single dimensional arrays", "Multidimensional arrays"] },
      { unit: "Experiment 4", title: "Inheritance", topics: ["Code reusability", "Hierarchical relationships"] },
      { unit: "Experiment 5", title: "Method Overriding", topics: ["Specific implementation in subclass"] },
      { unit: "Experiment 6", title: "Interfaces", topics: ["Multiple inheritance", "Abstraction"] },
      { unit: "Experiment 7A", title: "Exception Handling", topics: ["try, catch, finally", "throw and throws"] },
      { unit: "Experiment 7B", title: "User Defined Exception", topics: ["Custom exception class"] },
      { unit: "Experiment 8", title: "Threading & Thread Class Methods", topics: ["Multithreading", "Thread class methods"] },
      { unit: "Experiment 9", title: "String Class & Its Methods", topics: ["String manipulation methods"] },
      { unit: "Experiment 10", title: "Date Time & Calendar Class", topics: ["Handling date and time operations"] },
      { unit: "Experiment 11", title: "List and Set Interface (Collections Framework)", topics: ["Commonly used methods"] },
    ],
  },
];
