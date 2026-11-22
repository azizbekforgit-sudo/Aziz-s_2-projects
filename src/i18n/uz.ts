import type { Dict } from "./ru";

// Oʻzbekcha lugʻat (lotin yozuvi). Kalitlar ru.ts bilan bir xil boʻlishi shart — TypeScript va test tekshiradi.

const uz: Dict = {
  meta: {
    title: "Talent to Impact — Navoiy viloyati maktab oʻquvchilari loyihalari",
    description: "7–11-sinf oʻquvchilari real muammo va uning yechimini yozadi, koordinator loyihani tekshiradi va uni boshqa maktablar koʻradi.",
    login: "Kirish",
    register: "Roʻyxatdan oʻtish",
    dashboard: "Mening loyihalarim",
    projects: "Oʻquvchilar loyihalari",
    newProject: "Loyiha yuborish",
    opportunities: "Tanlov va stipendiyalar",
    admin: "Moderatsiya",
    talentMap: "Talent Map",
    community: "Knowledge Bridge",
    mentorship: "Mentorlik"
  },
  common: {
    skip: "Asosiy qismga oʻtish",
    home: "Talent to Impact — bosh sahifa",
    signIn: "Kirish",
    signOut: "Chiqish",
    signUp: "Akkaunt yaratish",
    openMenu: "Menyu",
    backHome: "Bosh sahifaga",
    language: "Til",
    newTab: "(yangi oynada ochiladi)",
    soon: "Tez orada",
    pilot: "Pilot: Navoiy viloyati, Oʻzbekiston"
  },
  nav: { how: "Qanday ishlaydi", projects: "Loyihalar", opportunities: "Tanlov va stipendiyalar" },
  home: {
    title: "Maktab oʻquvchilari loyihalari: gʻoyadan eʼlongacha",
    lead: "7–11-sinf oʻquvchilari maktabi yoki mahallasidagi real muammoni va uni qanday hal qilishni yozadi. Koordinator loyihani tekshiradi va uni boshqa maktablar koʻradi.",
    ctaPrimary: "Akkaunt yaratish",
    ctaSecondary: "Loyihalarni koʻrish",
    note: "Hozir Navoiy viloyatida ishlaydi",
    sample: {
      label: "Loyiha namunasi",
      title: "Mahalla uchun toza suv datchiklari",
      author: "Aziza K. · 9-sinf · Karmana",
      problemLabel: "Muammo",
      problem: "Maktab yonidagi ariqdagi suv yomgʻirdan keyin loyqalanadi va bu haqda kech bilishadi.",
      solutionLabel: "Yechim",
      solution: "Arduino’dagi uchta loyqalik datchigi koʻrsatkichlarni mahallaning telegram kanaliga yuboradi.",
      checked: "Koordinator tomonidan tekshirilgan"
    },
    howTitle: "Qanday ishlaydi",
    steps: [
      { t: "Roʻyxatdan oʻtish", d: "Maktabing va sinfingni koʻrsat. Koordinator akkauntni tasdiqlaydi — odatda bir-ikki kun ichida." },
      { t: "Loyiha", d: "Atrofingda koʻrgan muammoni va uni qanday hal qilishingni yoz. Yolgʻiz yoki sinfdoshlar bilan." },
      { t: "Tekshiruv", d: "Tekshiruvchi loyihani tasdiqlaydi yoki nimani tuzatish kerakligini yozadi. Tasdiqlangan loyihani hamma koʻradi." }
    ],
    latestTitle: "Yangi loyihalar",
    latestAll: "Barcha loyihalar",
    soonTitle: "Keyin nimalar qoʻshiladi",
    soon: [
      { name: "Talent Map", d: "Sakkiz yoʻnalish boʻyicha kuchli tomonlar soʻrovnomasi" },
      { name: "Knowledge Bridge", d: "Oʻquvchilarning oʻzlari olib boradigan mashgʻulotlar" },
      { name: "Mentorlik", d: "Oliygohlar va kompaniyalardan tasdiqlangan ustozlar" }
    ],
    more: "Batafsil",
    ctaTitle: "Maktabing yoki mahallang uchun gʻoyang bormi",
    ctaText: "Roʻyxatdan oʻtish bir daqiqa oladi. Tasdiqlangandan soʻng loyiha yuborish mumkin.",
    ctaButton: "Akkaunt yaratish"
  },
  login: {
    title: "Kirish",
    lead: "Oʻquvchilar va koordinatorlar uchun",
    email: "Email",
    password: "Parol",
    submit: "Kirish",
    submitting: "Kirilmoqda…",
    newHere: "Akkauntingiz yoʻqmi?",
    createLink: "Roʻyxatdan oʻtish",
    invalid: "Email yoki parol notoʻgʻri",
    pending: "Akkaunt hali tasdiqlanmagan. Koordinator yangi arizalarni tekshiradi, odatda bu bir-ikki kun oladi.",
    blocked: "Ariza rad etilgan yoki akkaunt oʻchirilgan. Maktabingiz koordinatoriga murojaat qiling.",
    tooMany: "Muvaffaqiyatsiz urinishlar juda koʻp. 15 daqiqadan soʻng qayta urinib koʻring.",
    inactiveQuery: "Akkaunt faol emas. Agar hozirgina roʻyxatdan oʻtgan boʻlsangiz — koordinator tasdiqlashini kuting."
  },
  register: {
    title: "Oʻquvchi sifatida roʻyxatdan oʻtish",
    lead: "7–11-sinf oʻquvchilari uchun. Koordinator akkauntni tasdiqlaydi, shundan soʻng loyiha yuborish mumkin.",
    name: "Ism va familiya",
    namePh: "Aziza Karimova",
    email: "Email",
    password: "Parol",
    passwordHint: "Kamida 10 ta belgi",
    school: "Maktab",
    schoolPh: "7-maktab, Karmana",
    schoolHint: "Shu orqali koordinator oʻquvchi ekaningizni biladi",
    grade: "Sinf",
    gradeSelect: "Tanlang",
    gradeN: "{n}-sinf",
    submit: "Ariza yuborish",
    submitting: "Yuborilmoqda…",
    already: "Akkauntingiz bormi?",
    signInLink: "Kirish",
    doneTitle: "Ariza yuborildi",
    doneText: "Koordinator uni tekshiradi, odatda bir-ikki kun ichida. Tasdiqlangach, shu email va parol bilan kiring.",
    doneButton: "Kirish sahifasiga"
  },
  errors: {
    generic: "Nimadir xato ketdi. Qaytadan urinib koʻring.",
    nameRequired: "Ism va familiyani kiriting",
    nameMin: "Ism kamida 2 ta belgi boʻlsin",
    nameMax: "Ism 80 ta belgidan oshmasin",
    emailRequired: "Emailni kiriting",
    emailInvalid: "Emailni tekshiring",
    emailTaken: "Bu email allaqachon roʻyxatdan oʻtgan",
    passwordRequired: "Parolni kiriting",
    passwordMin: "Parol kamida 10 ta belgi boʻlsin",
    passwordMax: "Parol 100 ta belgidan oshmasin",
    gradeRequired: "Sinfni tanlang",
    schoolRequired: "Maktabni koʻrsating",
    schoolMax: "Maktab nomi 120 ta belgidan oshmasin",
    titleRequired: "Nomini kiriting",
    titleMin: "Nom kamida 4 ta belgi boʻlsin",
    titleMax: "Nom juda uzun",
    summaryRequired: "Qisqa tavsif yozing",
    summaryMin: "Tavsif kamida 20 ta belgi boʻlsin",
    summaryMax: "Tavsif 500 ta belgidan oshmasin",
    categoryRequired: "Toifani tanlang",
    textMax: "Matn juda uzun",
    noteRequired: "Nimani tuzatish kerakligini yozing",
    orgRequired: "Tashkilotchini koʻrsating",
    descRequired: "Tavsif qoʻshing",
    dateInvalid: "Sanani tekshiring",
    urlInvalid: "Havola https:// bilan boshlanishi kerak"
  },
  appNav: {
    myProjects: "Mening loyihalarim",
    submit: "Loyiha yuborish",
    projects: "Barcha loyihalar",
    opportunities: "Tanlov va stipendiyalar",
    admin: "Moderatsiya"
  },
  roles: {
    STUDENT: "Oʻquvchi",
    MENTOR: "Mentor",
    TEACHER: "Oʻqituvchi",
    REGIONAL_COORDINATOR: "Hududiy koordinator",
    ADMIN: "Administrator",
    SUPER_ADMIN: "Bosh administrator"
  },
  status: {
    DRAFT: "Qoralama",
    PENDING_REVIEW: "Tekshiruvda",
    APPROVED: "Tasdiqlandi",
    ACTIVE: "Jarayonda",
    COMPLETED: "Yakunlangan",
    REJECTED: "Qayta ishlashga",
    ARCHIVED: "Arxivda"
  },
  categories: {
    Technology: "Texnologiya",
    Business: "Biznes",
    Education: "Taʼlim",
    Ecology: "Ekologiya",
    "Social Innovation": "Ijtimoiy innovatsiya",
    Engineering: "Muhandislik"
  },
  oppCategories: {
    Competition: "Tanlov",
    Olympiad: "Olimpiada",
    Scholarship: "Stipendiya",
    Grant: "Grant",
    Program: "Dastur"
  },
  dashboard: {
    title: "Mening loyihalarim",
    lead: "Bu yerda har bir loyihaning holati koʻrinadi: tekshiruvda, tasdiqlangan yoki qayta ishlashga qaytarilgan",
    submittedTitle: "Loyiha tekshiruvga yuborildi.",
    submittedText: "Tekshiruvchi qaror qabul qilganda holat shu yerda oʻzgaradi.",
    emptyTitle: "Hali loyihalar yoʻq",
    emptyText: "Maktab yoki mahallangda koʻrgan muammoni va uni qanday hal qilishingni yoz. Tekshiruvchi shu yerda javob beradi.",
    emptyCta: "Birinchi loyihani yuborish",
    submittedOn: "{category} · {date} da yuborilgan",
    note: "Tekshiruvchi izohi"
  },
  projects: {
    title: "Oʻquvchilar loyihalari",
    lead: "Koordinator tekshiruvidan oʻtgan loyihalar",
    submit: "Loyiha yuborish",
    emptyTitle: "Hali tasdiqlangan loyihalar yoʻq",
    emptyText: "Birinchi loyihalar tekshiruvdan oʻtmoqda. Oʻzingiznikini roʻyxatdan oʻtgach yuborishingiz mumkin."
  },
  project: {
    back: "Barcha loyihalar",
    summary: "Qisqacha",
    problem: "Muammo",
    solution: "Yechim",
    author: "{name} · {grade}-sinf",
    submitted: "{date} da yuborilgan",
    note: "Tekshiruvchi izohi",
    private: "Bu loyihani tasdiqlanmaguncha faqat siz va tekshiruvchilar koʻrasiz.",
    decisionTitle: "Qaror",
    noteLabel: "Oʻquvchi uchun izoh",
    noteHint: "Rad etishda nimani tuzatish kerakligini albatta yozing",
    approve: "Tasdiqlash",
    reject: "Qayta ishlashga qaytarish"
  },
  newProject: {
    title: "Loyiha yuborish",
    lead: "Haqiqiy muammo va oʻz yechimingni yoz. Tekshiruvchi loyihani tasdiqlaydi yoki nimani tuzatish kerakligini yozadi.",
    titleLabel: "Nomi",
    titlePh: "Mahalla uchun toza suv datchiklari",
    category: "Toifa",
    categoryPh: "Tanlang",
    summary: "Qisqacha",
    summaryHint: "20–500 ta belgi. Buni loyihalar roʻyxatida koʻrishadi.",
    problem: "Muammo",
    problemHint: "Nima notoʻgʻri, bu kimga taalluqli",
    solution: "Yechim",
    solutionHint: "Nima qilasan va natijani qanday bilasan",
    optional: "ixtiyoriy",
    submit: "Tekshiruvga yuborish",
    submitting: "Yuborilmoqda…"
  },
  opportunities: {
    title: "Tanlov va stipendiyalar",
    lead: "Maktab oʻquvchilari uchun tanlovlar, olimpiadalar, stipendiyalar va dasturlar. Har birini koordinator qoʻshadi.",
    emptyTitle: "Hozircha ochiq tanlovlar yoʻq",
    emptyText: "Koordinatorlar ularni paydo boʻlishi bilan qoʻshadi.",
    official: "Tashkilotchi sayti",
    deadline: "{date} gacha",
    open: "Muddatsiz"
  },
  soon: {
    badge: "Tez orada",
    what: "Bu yerda nima boʻladi",
    why: "Nega hozircha yopiq",
    back: "Mening loyihalarimga",
    talentMap: {
      title: "Talent Map",
      description: "Kuchli tomonlar soʻrovnomasi va rivojlanish rejasi",
      features: [
        "Sakkiz yoʻnalish boʻyicha qisqa soʻrovnoma: yetakchilik, tanqidiy fikrlash, ijodkorlik, muloqot, tadbirkorlik, texnologiya, tadqiqot, ijtimoiy taʼsir",
        "Eng kuchli tomonlar koʻrsatilgan profil",
        "Shu profilga mos loyiha va tanlovlar"
      ],
      blocker: "Savollar va hisoblashni avval dasturning metodik jamoasi tasdiqlashi kerak. Oʻylab topilgan ballarni koʻrsatmaymiz."
    },
    community: {
      title: "Knowledge Bridge",
      description: "Oʻquvchilarning oʻzlari olib boradigan mashgʻulotlar",
      features: [
        "Viloyat tumanlari boʻyicha oʻquvchilar hamjamiyatlari",
        "«Oʻquvchidan oʻquvchiga» mashgʻulotlari",
        "Moderatorlar tekshirgan materiallar kutubxonasi"
      ],
      blocker: "Postlar va fayl yuklash uchun moderatsiya va xavfsizlik tekshiruvi kerak."
    },
    mentorship: {
      title: "Mentorlik",
      description: "Oliygohlar, kompaniyalar va NNTlardan ustozlar",
      features: [
        "Faqat tekshirilgan ustozlar",
        "Qiziqish va loyihalar boʻyicha moslashtirish",
        "Moderatorlar nazoratidagi yozishmalar — oʻquvchilar voyaga yetmagan"
      ],
      blocker: "Avval ustozlarni tekshirish va voyaga yetmaganlar bilan xavfsiz muloqot qoidalari kerak."
    }
  },
  admin: {
    title: "Moderatsiya",
    lead: "Oʻquvchilar arizalari, tekshiruvdagi loyihalar va tanlovlar",
    stats: {
      pendingUsers: "Akkaunt arizalari",
      pendingProjects: "Tekshiruvdagi loyihalar",
      students: "Faol oʻquvchilar",
      published: "Tasdiqlangan loyihalar"
    },
    viewOnly: "Navbatlarni koʻrishingiz mumkin. Qarorlarni administratorlar qabul qiladi.",
    usersTitle: "Akkaunt arizalari",
    usersEmpty: "Yangi arizalar yoʻq",
    userMeta: "{school} · {grade}-sinf · {date}",
    noSchool: "maktab koʻrsatilmagan",
    projectsTitle: "Tekshiruvdagi loyihalar",
    projectsEmpty: "Barcha loyihalar tekshirilgan",
    open: "Ochish",
    approve: "Tasdiqlash",
    reject: "Rad etish",
    oppTitle: "Tanlov yoki stipendiya qoʻshish",
    oppLead: "Saqlangandan soʻng darhol «Tanlov va stipendiyalar» boʻlimida paydo boʻladi",
    opp: {
      title: "Nomi",
      organizer: "Tashkilotchi",
      category: "Turi",
      deadline: "Arizalar qabul qilinadi",
      url: "Tashkilotchi saytiga havola",
      description: "Tavsif va shartlar",
      submit: "Eʼlon qilish",
      submitting: "Eʼlon qilinmoqda…",
      done: "Eʼlon qilindi."
    },
    logTitle: "Qarorlar jurnali",
    logEmpty: "Hali qarorlar boʻlmagan",
    logBy: "{name}",
    actions: {
      "user.active": "Akkaunt tasdiqlandi",
      "user.deactivated": "Ariza rad etildi",
      "project.approved": "Loyiha tasdiqlandi",
      "project.rejected": "Loyiha qaytarildi",
      "opportunity.created": "Tanlov qoʻshildi"
    },
    deleted: "oʻchirilgan",
    system: "tizim"
  }
};

export default uz;
