export type Experience = {
  position: string;
  institution: string;
  location: string;
  description: string;
  highlights?: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  experienceType: "work" | "education" | "course";
  skills?: string[];
};

const EXPERIENCES_EN: Experience[] = [
  {
    position: "Digital Solutions Developer",
    institution: "Alinma",
    location: "Riyadh, Saudi Arabia",
    description: "",
    highlights: [
      "Develop and enhance application features that support business workflows and serve the bank’s business and internal users.",
      "Serve as Project Manager, coordinating team activities, supporting delivery planning, and tracking project progress.",
      "Work closely with business, design, QA, and backend teams to deliver features effectively.",
      "Participate in code reviews, sprint planning, and issue tracking.",
    ],
    startDate: "Feb 2025",
    current: true,
    experienceType: "work",
    skills: [
      "React Native",
      "JavaScript",
      "TypeScript",
      "Git/GitHub",
      "Expo",
      "Redux",
      "Figma",
      "Project Management",
      "Jira",
    ],
  },
  {
    position: "Software Engineer",
    institution: "InnovationTeam",
    location: "Riyadh, Saudi Arabia",
    description: "",
    highlights: [
      "Contributed to bug fixes and application maintenance within stc’s Applications department through InnovationTeam.",
      "Completed training in React and other development tools.",
    ],
    startDate: "Sep 2022",
    endDate: "Dec 2024",
    current: false,
    experienceType: "work",
    skills: ["React", "JavaScript", "TypeScript", "Git/GitHub"],
  },
  {
    position: "Bachelor's Degree in Computer Science",
    institution: "Qassim University",
    location: "Qassim, Saudi Arabia",
    description:
      "Graduated with a GPA of 4.27/5.00 (Very Good) and Second Class Honors.",
    startDate: "Aug 2017",
    endDate: "May 2022",
    current: false,
    experienceType: "education",
    skills: [],
  },
  {
    position: "Nanodegree: React & Redux Development",
    institution: "Udacity",
    location: "Online Course",
    description:
      "Completed intensive training in React UI development, Redux state management, and React Native with practical projects.",
    startDate: "Jan 2024",
    endDate: "Feb 2024",
    current: false,
    experienceType: "course",
    skills: ["React", "Redux", "Hooks", "React Native", "JavaScript"],
  },
  {
    position: "Nanodegree: Full-Stack Web Development (Python/Flask)",
    institution: "Udacity / MISK",
    location: "Online Course",
    description:
      "Gained experience in SQL, Flask APIs, identity management, and containerized deployment. Delivered tested and documented backend solutions.",
    startDate: "Jun 2021",
    endDate: "Sep 2021",
    current: false,
    experienceType: "course",
    skills: ["Python", "Flask", "SQL", "Docker", "APIs", "Testing"],
  },
];

export const EXPERIENCES_AR: Experience[] = [
  {
    position: "مطوّر حلول رقمية",
    institution: "بنك الإنماء",
    location: "الرياض، السعودية",
    description: "",
    highlights: [
      "أطوّر مزايا التطبيقات وأحسّنها لدعم إجراءات العمل وخدمة عملاء الأعمال والمستخدمين الداخليين في البنك.",
      "أتولى مسؤوليات مدير مشروع، بما يشمل تنسيق أعمال الفريق ودعم تخطيط التنفيذ ومتابعة تقدم المشروع.",
      "أتعاون مع فرق الأعمال والتصميم وضمان الجودة والأنظمة الخلفية لتسليم المزايا بفعالية.",
      "أشارك في مراجعة الكود وتخطيط دورات العمل ومتابعة المشكلات.",
    ],
    startDate: "فبراير 2025",
    current: true,
    experienceType: "work",
    skills: [
      "React Native",
      "JavaScript",
      "TypeScript",
      "Git/GitHub",
      "Expo",
      "Redux",
      "Figma",
      "Project Management",
      "Jira",
    ],
  },
  {
    position: "مهندس برمجيات",
    institution: "InnovationTeam / stc",
    location: "الرياض، السعودية",
    description: "",
    highlights: [
      "ساهمت في إصلاح الأخطاء وصيانة التطبيقات ضمن قسم التطبيقات في stc من خلال InnovationTeam.",
      "أكملت تدريبًا في React وأدوات تطوير أخرى.",
    ],
    startDate: "سبتمبر 2022",
    endDate: "ديسمبر 2024",
    current: false,
    experienceType: "work",
    skills: ["React", "React Native", "JavaScript", "TypeScript", "Git/GitHub"],
  },
  {
    position: "بكالوريوس علوم حاسب",
    institution: "جامعة القصيم",
    location: "القصيم، السعودية",
    description:
      "تخرجت بمعدل 4.27 من 5، بتقدير جيد جدًا مع مرتبة الشرف الثانية.",
    startDate: "أغسطس 2017",
    endDate: "مايو 2022",
    current: false,
    experienceType: "education",
    skills: [],
  },
  {
    position: "Nanodegree: React وRedux",
    institution: "Udacity",
    location: "دورة عن بعد",
    description:
      "أتممت تدريب مكثف في تطوير واجهات React، إدارة الحالة باستخدام Redux، وتطوير تطبيقات React Native عبر مشاريع عملية.",
    startDate: "يناير 2024",
    endDate: "فبراير 2024",
    current: false,
    experienceType: "course",
    skills: ["React", "Redux", "Hooks", "React Native", "JavaScript"],
  },
  {
    position: "Nanodegree: تطوير ويب متكامل (Python/Flask)",
    institution: "Udacity / مسك",
    location: "دورة عن بعد",
    description:
      "تعلمت SQL وFlask وAPIs وإدارة الهوية والصلاحيات، مع تجربة في النشر بالحاويات والاختبار وتوثيق الحلول.",
    startDate: "يونيو 2021",
    endDate: "سبتمبر 2021",
    current: false,
    experienceType: "course",
    skills: ["Python", "Flask", "SQL", "APIs", "الإختبارات"],
  },
];

export default EXPERIENCES_EN;
