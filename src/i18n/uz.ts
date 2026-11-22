import type { Dict } from "./ru";

// Oʻzbekcha lugʻat (lotin yozuvi). Kalitlar ru.ts bilan bir xil boʻlishi shart — TypeScript va test tekshiradi.
// Maktablarga koʻrsatishdan oldin ona tili egasi tomonidan oʻqib chiqilishi kerak.

const uz: Dict = {
  meta: {
    title: "Talent to Impact — Navoiy viloyati maktab oʻquvchilari loyihalari",
    description: "7–11-sinf oʻquvchilari maktab yoki mahalladagi real muammoni payqab, yechim taklif qiladi, koordinator loyihani tekshiradi va uni boshqa maktablar koʻradi.",
    login: "Kirish",
    register: "Roʻyxatdan oʻtish",
    dashboard: "Mening loyihalarim",
    projects: "Oʻquvchilar loyihalari",
    newProject: "Loyiha yuborish",
    opportunities: "Tanlov va stipendiyalar",
    admin: "Moderatsiya",
    talentMap: "Talent Map",
    community: "Knowledge Bridge",
    mentorship: "Mentorlik",
    notFound: "Sahifa topilmadi",
    error: "Xatolik"
  },
  common: {
    skip: "Asosiy qismga oʻtish",
    home: "Bosh sahifa",
    homeLabel: "Talent to Impact — bosh sahifa",
    signIn: "Kirish",
    signOut: "Chiqish",
    signUp: "Akkaunt yaratish",
    openMenu: "Menyu",
    closeMenu: "Menyuni yopish",
    language: "Til",
    newTab: "(yangi oynada ochiladi)",
    soon: "Tez orada",
    breadcrumbs: "Navigatsiya zanjiri",
    mainNav: "Asosiy navigatsiya",
    accountNav: "Kabinet boʻlimlari",
    loading: "Yuklanmoqda",
    tagline: "Oʻquvchilar maktab va mahalla muammolarini tekshirilgan loyihalarga aylantiradigan platforma",
    pilot: "Pilot: Navoiy viloyati, Oʻzbekiston",
    rights: "© {year} Talent to Impact"
  },
  nav: { how: "Qanday ishlaydi", projects: "Loyihalar", opportunities: "Tanlov va stipendiyalar", submit: "Loyiha yuborish", moderation: "Moderatsiya", myProjects: "Mening loyihalarim" },
  home: {
    label: "Pilot · Navoiy viloyati",
    title: "Muammoni payqa. Yechim yarat. Atrofingni oʻzgartir.",
    lead: "Oʻquvchilar maktabi yoki mahallasidagi real muammoni va uni hal qilish yoʻlini yozadi. Koordinator loyihani tekshiradi va uni boshqa maktablar koʻradi.",
    ctaPrimary: "Akkaunt yaratish",
    ctaSecondary: "Loyihalarni koʻrish",
    note: "7–11-sinf oʻquvchilari uchun",
    sample: {
      label: "Loyiha varagʻi namunasi",
      number: "Loyiha № 014",
      category: "Ekologiya",
      title: "Mahalla uchun toza suv datchiklari",
      author: "Aziza K. · 9-sinf",
      problemLabel: "Muammo",
      problem: "Maktab yonidagi ariqdagi suv yomgʻirdan keyin loyqalanadi va bu haqda juda kech bilishadi.",
      solutionLabel: "Yechim",
      solution: "Arduino’dagi uchta loyqalik datchigi koʻrsatkichlarni mahallaning telegram kanaliga yuboradi.",
      checkLabel: "Tekshiruv",
      check: "Navoiy viloyati koordinatori"
    },
    trust: ["7–11-sinflar uchun", "Navoiy viloyatida pilot", "Loyihalar koordinator tekshiruvidan oʻtadi"],
    howTitle: "Kuzatuvdan harakatga",
    steps: [
      { t: "Payqa", d: "Maktab yoki mahalladagi muammoni koʻr." },
      { t: "Taklif qil", d: "Gʻoyang va yechim yoʻlini yoz." },
      { t: "Ulash", d: "Tekshiruvdan soʻng loyihani boshqa maktablar koʻradi." }
    ],
    latestTitle: "Harakatdagi gʻoyalar",
    latestAll: "Barcha loyihalar",
    openProject: "Loyihani ochish",
    oppTitle: "Gʻoyadan keyingi qadam",
    oppText: "Maktab oʻquvchilari uchun olimpiadalar, grantlar va dasturlar. Har bir imkoniyatni koordinator qoʻshadi.",
    oppCta: "Tanlov va stipendiyalar",
    soonTitle: "Keyin nimalar qoʻshiladi",
    soonLead: "Keyingi bosqichni tayyorlayapmiz va metodika hamda xavfsizlik qoidalari tayyor boʻlmaguncha uni ochmaymiz.",
    soon: [
      { name: "Talent Map", d: "Kuchli tomonlar xaritasi" },
      { name: "Knowledge Bridge", d: "«Oʻquvchidan oʻquvchiga» taʼlim" },
      { name: "Mentorlik", d: "Ustozlar bilan bogʻlanish" }
    ],
    ctaTitle: "Gʻoyang real oʻzgarishlarni boshlashi mumkin.",
    ctaButton: "Akkaunt yaratish"
  },
  login: {
    title: "Akkauntga kirish",
    lead: "Oʻquvchilar va koordinatorlar uchun",
    email: "Email",
    password: "Parol",
    showPassword: "Parolni koʻrsatish",
    hidePassword: "Parolni yashirish",
    submit: "Kirish",
    submitting: "Kirilmoqda…",
    newHere: "Akkauntingiz yoʻqmi?",
    createLink: "Akkaunt yaratish",
    asideTitle: "Har bir tekshirilgan gʻoya oʻz sahifasini oladi",
    asideText: "Oʻquvchilar loyihalarini boshqa maktablar oʻqiydi — muammo, yechim va koordinator belgisi bilan.",
    invalid: "Email yoki parol notoʻgʻri",
    pending: "Akkaunt hali tasdiqlanmagan. Koordinator yangi arizalarni tekshiradi, odatda bu bir-ikki kun oladi.",
    blocked: "Ariza rad etilgan yoki akkaunt oʻchirilgan. Maktabing koordinatoriga murojaat qil.",
    tooMany: "Muvaffaqiyatsiz urinishlar juda koʻp. 15 daqiqadan soʻng qayta urinib koʻr.",
    sessionEnded: "Sessiya yakunlandi: akkaunt endi faol emas. Qayta kir yoki yangi akkaunt yarat.",
    inactiveQuery: "Akkaunt faol emas. Agar hozirgina roʻyxatdan oʻtgan boʻlsang — koordinator tasdiqlashini kut."
  },
  register: {
    title: "Oʻquvchi akkauntini yarat",
    lead: "7–11-sinf oʻquvchilari uchun roʻyxatdan oʻtish. Koordinator akkauntni tasdiqlaydi, shundan soʻng loyiha yuborish mumkin.",
    name: "Ism va familiya",
    namePh: "Aziza Karimova",
    email: "Email",
    password: "Parol",
    passwordHint: "Kamida 10 ta belgi",
    school: "Maktab",
    schoolPh: "7-maktab, Karmana",
    schoolHint: "Shu orqali koordinator oʻquvchi ekaningni biladi",
    grade: "Sinf",
    gradeSelect: "Tanla",
    gradeN: "{n}-sinf",
    submit: "Akkaunt yaratish",
    submitting: "Yaratilmoqda…",
    already: "Akkauntingiz bormi?",
    signInLink: "Kirish",
    asideTitle: "Roʻyxatdan oʻtgach, koordinator akkauntni tekshiradi",
    asideText: "Odatda bu bir-ikki kun oladi. Soʻng birinchi loyihani yuborish mumkin.",
    doneTitle: "Akkaunt tasdiqlanishini kutmoqda",
    doneText: "Koordinator arizani tekshiradi, odatda bir-ikki kun ichida. Akkaunt tasdiqlanmaguncha loyiha yuborib boʻlmaydi. Tasdiqlangach, shu email va parol bilan kir.",
    doneButton: "Kirish sahifasiga"
  },
  errors: {
    generic: "Nimadir xato ketdi. Qaytadan urinib koʻr.",
    nameRequired: "Ism va familiyani kirit",
    nameMin: "Ism kamida 2 ta belgi boʻlsin",
    nameMax: "Ism 80 ta belgidan oshmasin",
    emailRequired: "Emailni kirit",
    emailInvalid: "Emailni tekshir",
    emailTaken: "Bu email allaqachon roʻyxatdan oʻtgan",
    passwordRequired: "Parolni kirit",
    passwordMin: "Parol kamida 10 ta belgi boʻlsin",
    passwordMax: "Parol 100 ta belgidan oshmasin",
    gradeRequired: "Sinfni tanla",
    schoolRequired: "Maktabni koʻrsat",
    schoolMax: "Maktab nomi 120 ta belgidan oshmasin",
    titleRequired: "Nomini kirit",
    titleMin: "Nom kamida 4 ta belgi boʻlsin",
    titleMax: "Nom juda uzun",
    summaryRequired: "Qisqa tavsif yoz",
    summaryMin: "Tavsif kamida 20 ta belgi boʻlsin",
    summaryMax: "Tavsif 500 ta belgidan oshmasin",
    categoryRequired: "Toifani tanla",
    textMax: "Matn juda uzun",
    noteRequired: "Nimani tuzatish kerakligini yoz",
    orgRequired: "Tashkilotchini koʻrsat",
    descRequired: "Tavsif qoʻsh",
    dateInvalid: "Sanani tekshir",
    urlInvalid: "Havola https:// bilan boshlanishi kerak"
  },
  appNav: {
    myProjects: "Mening loyihalarim",
    submit: "Loyiha yuborish",
    projects: "Barcha loyihalar",
    opportunities: "Tanlov va stipendiyalar",
    admin: "Moderatsiya",
    soonGroup: "Tayyorlanmoqda"
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
    lead: "Tekshiruvni kuzatib bor va koordinator izohlariga qayt",
    submittedTitle: "Loyiha tekshiruvga yuborildi.",
    submittedText: "Koordinator qaror qabul qilganda holat shu yerda oʻzgaradi.",
    emptyTitle: "Hali loyihalar yoʻq",
    emptyText: "Maktab yoki mahallangda koʻrgan muammoni va uni qanday hal qilishni yoz. Koordinator shu yerda javob beradi.",
    emptyCta: "Birinchi loyihani yuborish",
    submittedOn: "{category} · {date} da yuborilgan",
    pendingHint: "Loyiha hali koʻrib chiqilmoqda",
    approvedLink: "Eʼlon qilingan sahifani ochish",
    note: "Tekshiruvchi izohi"
  },
  projects: {
    title: "Oʻquvchilar loyihalari",
    lead: "Koordinator tekshiruvidan oʻtgan tashabbuslar",
    count: "Eʼlon qilingan: {n}",
    submit: "Loyiha yuborish",
    emptyTitle: "Hozircha boʻsh",
    emptyText: "Birinchi loyihalar koordinator tekshiruvidan soʻng shu yerda paydo boʻladi."
  },
  project: {
    back: "Barcha loyihalar",
    contents: "Mundarija",
    summary: "Qisqacha",
    problem: "Muammo",
    solution: "Yechim",
    author: "{name} · {grade}-sinf",
    submitted: "{date} da yuborilgan",
    note: "Tekshiruvchi izohi",
    private: "Bu loyihani tasdiqlanmaguncha faqat sen va tekshiruvchilar koʻrasiz.",
    decisionTitle: "Loyiha boʻyicha qaror",
    decisionHint: "Izohni loyiha muallifi koʻradi.",
    noteLabel: "Muallif uchun izoh",
    noteHint: "Qayta ishlashga qaytarishda majburiy",
    approve: "Tasdiqlash",
    reject: "Qayta ishlashga qaytarish"
  },
  newProject: {
    title: "Gʻoyang haqida gapirib ber",
    lead: "Haqiqatan payqagan muammodan boshla. Mukammal yozish shart emas — fikringni tushuntirish muhim.",
    titleLabel: "Loyiha nomi",
    titlePh: "Mahalla uchun toza suv datchiklari",
    category: "Toifa",
    categoryPh: "Tanla",
    summary: "Qisqacha",
    summaryHint: "20–500 ta belgi. Buni loyihalar roʻyxatida koʻrishadi.",
    problem: "Muammo",
    problemHint: "Nima notoʻgʻri va bu kimga taalluqli",
    solution: "Yechim",
    solutionHint: "Nima qilasan va natijani qanday bilasan",
    optional: "ixtiyoriy",
    submit: "Tekshiruvga yuborish",
    submitting: "Yuborilmoqda…",
    after: "Yuborganingdan soʻng koordinator loyihani tekshiradi. Qayta ishlash kerak boʻlsa, izohni shaxsiy kabinetingda koʻrasan.",
    previewLabel: "Oldindan koʻrish",
    previewNote: "Koordinator varaqni shunday koʻradi. Loyiha hali yuborilmagan.",
    previewTitle: "Loyiha nomi"
  },
  opportunities: {
    title: "Tanlov va stipendiyalar",
    lead: "Maktab oʻquvchilari uchun olimpiadalar, grantlar va dasturlar. Har bir imkoniyatni koordinator qoʻshadi.",
    emptyTitle: "Ochiq imkoniyatlar shu yerda paydo boʻladi",
    emptyText: "Koordinatorlar tekshirilgan tanlov va dasturlarni qoʻshib boradi.",
    official: "Tashkilotchi sayti",
    deadline: "{date} gacha qabul",
    open: "Muddatsiz"
  },
  soon: {
    badge: "Tez orada",
    what: "Bu yerda nima boʻladi",
    why: "Nega hozircha yopiq",
    back: "Mening loyihalarimga",
    talentMap: {
      title: "Talent Map",
      description: "Oʻquvchiga oʻz kuchli tomonlarini yaxshiroq koʻrishga yordam beradigan vosita tayyorlayapmiz. Boʻlim metodika tasdiqlangach ochiladi.",
      features: [
        "Sakkiz yoʻnalish boʻyicha qisqa soʻrovnoma: yetakchilik, tanqidiy fikrlash, ijodkorlik, muloqot, tadbirkorlik, texnologiya, tadqiqot, ijtimoiy taʼsir",
        "Eng kuchli tomonlar koʻrsatilgan profil",
        "Shu profilga mos loyiha va tanlovlar"
      ],
      blocker: "Savollar va hisoblashni avval dasturning metodik jamoasi tasdiqlashi kerak. Oʻylab topilgan ballarni koʻrsatmaymiz."
    },
    community: {
      title: "Knowledge Bridge",
      description: "Bu yerda oʻquvchilar bir-biri bilan ulasha oladigan mashgʻulotlar paydo boʻladi. Avval moderatsiya va materiallarni tekshirish qoidalarini tayyorlayapmiz.",
      features: [
        "Viloyat tumanlari boʻyicha oʻquvchilar hamjamiyatlari",
        "«Oʻquvchidan oʻquvchiga» mashgʻulotlari",
        "Moderatorlar tekshirgan materiallar kutubxonasi"
      ],
      blocker: "Postlar va fayl yuklash uchun moderatsiya va xavfsizlik tekshiruvi kerak."
    },
    mentorship: {
      title: "Mentorlik",
      description: "Kelajakda oʻquvchilar oliygoh va kompaniyalardagi ustozlardan yordam ola oladi. Boʻlim ustozlar tekshirilib, voyaga yetmaganlar bilan xavfsiz muloqot qoidalari tayyorlangach ochiladi.",
      features: [
        "Faqat tekshirilgan ustozlar",
        "Qiziqish va loyihalar boʻyicha moslashtirish",
        "Moderatorlar nazoratidagi yozishmalar"
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
    viewOnly: "Koʻrish rejimi. Qarorlarni administratorlar qabul qiladi.",
    usersTitle: "Akkaunt arizalari",
    usersEmpty: "Yangi arizalar yoʻq",
    userMeta: "{school} · {grade}-sinf · {date}",
    noSchool: "maktab koʻrsatilmagan",
    projectsTitle: "Tekshiruvdagi loyihalar",
    projectsEmpty: "Barcha loyihalar tekshirilgan",
    pick: "Toʻliq oʻqish uchun roʻyxatdan loyihani tanla",
    open: "Ochish",
    approve: "Tasdiqlash",
    reject: "Rad etish",
    oppTitle: "Tanlov qoʻshish",
    oppLead: "Saqlangandan soʻng darhol «Tanlov va stipendiyalar» boʻlimida paydo boʻladi",
    oppMain: "Asosiy",
    oppDates: "Muddat va havola",
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
    logCols: { date: "Sana", who: "Kim", action: "Harakat", object: "Obyekt" },
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
  },
  states: {
    notFoundTitle: "Sahifa topilmadi",
    notFoundText: "Havola eskirgan boʻlishi yoki loyiha hali eʼlon qilinmagan boʻlishi mumkin.",
    errorTitle: "Nimadir xato ketdi",
    errorText: "Sahifani yangilab koʻr yoki birozdan soʻng qayt.",
    retry: "Qayta urinish"
  }
};

export default uz;
