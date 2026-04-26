export type Experience = {
  position: string;
  institution: string;
  location: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  experienceType: "work" | "education";
  skills?: string[];
};

const EXPERIENCES_EN: Experience[] = [
  {
    position: "Digital Solutions Developer",
    institution: "Alinma",
    location: "Riyadh, Saudi Arabia",
    description:
      "Contributed to multiple applications within my department serving the bank’s business and internal clients. Developed new features and enhanced existing ones. Collaborated closely with business, design, QA, and backend teams to deliver features efficiently, while ensuring consistency, localization, and accessibility across the applications.",
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
      "Agile/Scrum",
    ],
  },
  {
    position: "Software Engineer",
    institution: "InnovationTeam",
    location: "Riyadh, Saudi Arabia",
    description:
      "Worked in stc’s Applications section through InnovationTeam. Focused on solving problems and developing innovative solutions after completing a training program in React and related tools.",
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
      "Graduated with GPA 4.27/5 (Very Good) with Second Class Honor. Contributed to the 'USAP' graduation project, building frontend modules with Flutter to automate academic tasks.",
    startDate: "Aug 2017",
    endDate: "May 2022",
    current: false,
    experienceType: "education",
    skills: ["Flutter", "Dart", "Software Design"],
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
    experienceType: "education",
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
    experienceType: "education",
    skills: ["Python", "Flask", "SQL", "Docker", "APIs", "Testing"],
  },
];

export const EXPERIENCES_AR: Experience[] = [
  {
    position: "مطوّر حلول رقمية",
    institution: "بنك الإنماء",
    location: "الرياض، السعودية",
    description:
      "كجزء من فريق، عملت على عدة تطبيقات داخل القسم تخدم عملاء الأعمال والعملاء الداخليين في البنك. طورت مزايا جديدة وحسّنت مزايا قائمة. تعاونت بشكل وثيق مع فرق الأعمال والمصممين وضمان الجودة وفرق الواجهة الخلفية لتسليم المزايا بكفاءة. كما حرصت على الاتساق ودعم تعدد اللغات وتجربة استخدام مناسبة داخل التطبيق.",
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
      "Agile/Scrum",
    ],
  },
  {
    position: "مهندس برمجيات",
    institution: "InnovationTeam / stc",
    location: "الرياض، السعودية",
    description:
      "عملت في قسم التطبيقات بشركة stc من خلال InnovationTeam. ركزنا على حل المشكلات وتطوير حلول مبتكرة بعد إتمام برنامج تدريبي في React وأدوات مرتبطة بها.",
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
      "تخرجت بمعدل 4.27 من 5 (تقدير جيد جدًا مع مرتبة الشرف الثانية). ساهمت في مشروع التخرج 'USAP'، بتطوير واجهات أمامية باستخدام Flutter لتسهيل الاحتياجات الأكاديمية.",
    startDate: "أغسطس 2017",
    endDate: "مايو 2022",
    current: false,
    experienceType: "education",
    skills: ["Flutter", "Dart", "تصميم التطبيقات"],
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
    experienceType: "education",
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
    experienceType: "education",
    skills: ["Python", "Flask", "SQL", "APIs", "الإختبارات"],
  },
];

export default EXPERIENCES_EN;
