import type { Dict } from "./ru";

// Oʻzbekcha lugʻat (lotin yozuvi). Kalitlar ru.ts bilan bir xil boʻlishi shart — TypeScript tekshiradi.

const uz: Dict = {
  meta: {
    title: "Talent to Impact — har bir isteʼdod imkoniyatga loyiq",
    description: "Kuchli tomonlaringni kashf et, real muammolarni hal qiladigan loyihalar yarat va boshqalarga yoʻl och. Oʻzbekiston maktab oʻquvchilari uchun yoshlar innovatsion ekotizimi.",
    login: "Kirish",
    register: "Roʻyxatdan oʻtish",
    dashboard: "Kabinet",
    projects: "Oʻquvchilar loyihalari",
    newProject: "Loyiha yuborish",
    opportunities: "Imkoniyatlar",
    admin: "Boshqaruv",
    talentMap: "Talent Map",
    community: "Knowledge Bridge",
    mentorship: "Mentorlik"
  },
  common: {
    skip: "Asosiy qismga oʻtish",
    home: "Talent to Impact — bosh sahifa",
    signIn: "Kirish",
    signOut: "Chiqish",
    join: "Qoʻshilish",
    goDashboard: "Mening kabinetim",
    openMenu: "Menyuni ochish",
    backHome: "Bosh sahifaga",
    comingSoon: "Tez orada",
    open: "Ochiq",
    language: "Til",
    region: "Oʻzbekiston · Pilot: Navoiy viloyati",
    newTab: "(yangi oynada ochiladi)"
  },
  nav: { mechanisms: "Mexanizmlar", how: "Qanday ishlaydi", projects: "Loyihalar", opportunities: "Imkoniyatlar" },
  footer: { createAccount: "Akkaunt yaratish" },
  home: {
    pill: "Milliy yoshlar innovatsion ekotizimi",
    titleA: "Har bir isteʼdod",
    titleB: "imkoniyatga loyiq.",
    lead: "Nimada kuchli ekaningni bil, haqiqiy muammolarni hal qiladigan loyihalar yarat va keyingi avlod oʻquvchilari uchun eshiklarni och.",
    ctaPrimary: "Bepul akkaunt yaratish",
    ctaSecondary: "Oʻquvchilar loyihalari",
    facts: [
      { v: "7–11-sinf", l: "Kimlar uchun" },
      { v: "4 mexanizm", l: "Bitta yoʻl" },
      { v: "Navoiy", l: "Pilot hudud" }
    ],
    journeyTitle: "Sening yoʻling",
    youAreHere: "Sen shu yerdasan",
    step: "{n}-qadam",
    mechEyebrow: "Ekotizim",
    mechTitle: "Toʻrt mexanizm. Bitta yoʻl.",
    mechLead: "Har bir mexanizm — salohiyatdan real natijagacha boʻlgan yoʻlning bir bosqichi. Birgalikda ular oʻz surʼatingda bosib oʻtish mumkin boʻlgan yoʻnalishni tashkil qiladi.",
    mechanisms: [
      { tag: "Kashf et", name: "Talent Map", desc: "Qiziqishlaringni oʻrgan, kuchli tomonlaringni tushun va shaxsiy rivojlanish rejangni tuz." },
      { tag: "Yarat", name: "School Hack 72", desc: "Haqiqiy muammoni jamoa, mentorlar va 72 soatlik sprint bilan ishlaydigan loyihaga aylantir." },
      { tag: "Bogʻlan", name: "Knowledge Bridge", desc: "Tengdoshlaringdan oʻrgan, bilim ulash va barcha hududlardagi oʻquvchilar bilan tanish." },
      { tag: "Davom ettir", name: "Opportunity Relay", desc: "Tanlovlar, stipendiyalar va mentorlarni top — soʻng tajribangni boshqalarga ulash." }
    ],
    howEyebrow: "Qanday ishlaydi",
    howTitle: "Keyingi qadaming mazmunli boʻlsin.",
    steps: [
      { t: "Kashf et", d: "Nimani eng yaxshi qila olishingni va senga nima chindan qiziqligini bil." },
      { t: "Rivojlan", d: "Tengdoshlar, mentorlar va amaliyot orqali koʻnikmalaringni oshir." },
      { t: "Yarat", d: "Jamoa tuz va haqiqiy muammoni haqiqiy loyihaga aylantir." },
      { t: "Ulash", d: "Bilim, tajriba va imkoniyatlarni ortingdan kelayotganlarga yetkaz." }
    ],
    principlesEyebrow: "Tamoyillarimiz",
    principlesTitle: "Oʻquvchilar uchun — gʻamxoʻrlik bilan.",
    principles: [
      { t: "Xavfsiz", d: "Oʻquvchi profillari sukut boʻyicha yopiq. Har bir akkaunt va loyihani inson tekshiradi." },
      { t: "Halol", d: "Oʻylab topilgan ballar va soxta statistika yoʻq. Funksiya tayyor boʻlmasa — shuni yozamiz." },
      { t: "Bepul", d: "Oʻzbekiston maktablari uchun. Navoiy viloyatidagi pilotdan boshlaymiz." }
    ],
    ctaEyebrow: "Yoʻling shu yerdan boshlanadi",
    ctaTitle: "Isteʼdoding muhim boʻlsin.",
    ctaText: "Bir daqiqada akkaunt yarat. Koordinator uni faollashtiradi va sen birinchi loyihangni yubora olasan.",
    ctaButton: "Akkaunt yaratish"
  },
  auth: {
    asideA: "Salohiyatdan",
    asideB: "real natijagacha.",
    points: [
      { t: "Kuchli tomonlaringni kashf et", d: "Nimada yaxshi ekaningni va qayerga oʻsishni xohlashingni bil." },
      { t: "Haqiqiy loyihalar yarat", d: "Gʻoyangni yubor, tekshiruvdan oʻt va hamjamiyatga koʻrsat." },
      { t: "Imkoniyatlarni top", d: "Tanlovlar, stipendiyalar va dasturlar — bir joyda." }
    ]
  },
  login: {
    eyebrow: "Xush kelibsiz",
    title: "Shaxsiy kabinetga kirish",
    lead: "Salohiyatdan natijaga boʻlgan yoʻlingni davom ettir.",
    email: "Email",
    password: "Parol",
    submit: "Kirish",
    pending: "Kirilmoqda…",
    newHere: "Bu yerda birinchi martami?",
    createLink: "Akkaunt yaratish",
    invalid: "Email yoki parol notoʻgʻri.",
    inactive: "Akkauntingiz hali faollashtirilmagan. Avval uni administrator tasdiqlashi kerak.",
    inactiveQuery: "Akkaunt faol emas. Agar hozirgina roʻyxatdan oʻtgan boʻlsangiz — administrator tasdiqlashini kuting."
  },
  register: {
    eyebrow: "Yoʻlingni boshla",
    title: "Akkaunt yaratish",
    lead: "7–11-sinf oʻquvchilari uchun. Yangi akkauntlar qisqa tekshiruvdan soʻng faollashtiriladi.",
    name: "Ism va familiya",
    namePh: "masalan, Aziza Karimova",
    email: "Email",
    emailPh: "you@example.com",
    password: "Parol",
    passwordHint: "Kamida 10 ta belgi.",
    grade: "Sinf",
    gradeSelect: "Tanlang",
    gradeN: "{n}-sinf",
    language: "Til",
    submit: "Oʻquvchi akkauntini yaratish",
    pending: "Akkaunt yaratilmoqda…",
    already: "Roʻyxatdan oʻtganmisiz?",
    signInLink: "Kirish",
    successEyebrow: "Ariza yuborildi",
    successTitle: "Siz roʻyxatdasiz!",
    successText: "Akkaunt yaratildi va tasdiqlashni kutmoqda. Koordinator har bir yangi oʻquvchi akkauntini tekshiradi — shu tufayli platforma xavfsiz qoladi. Tasdiqlangach, kira olasiz.",
    successButton: "Kirish sahifasiga"
  },
  errors: {
    generic: "Nimadir xato ketdi. Qaytadan urinib koʻring.",
    nameRequired: "Ism va familiyani kiriting.",
    nameMin: "Ism kamida 2 ta belgidan iborat boʻlishi kerak.",
    nameMax: "Ism 80 ta belgidan oshmasligi kerak.",
    emailRequired: "Emailni kiriting.",
    emailInvalid: "Toʻgʻri email kiriting.",
    emailTaken: "Bu email allaqachon roʻyxatdan oʻtgan.",
    passwordRequired: "Parolni kiriting.",
    passwordMin: "Parol kamida 10 ta belgidan iborat boʻlishi kerak.",
    passwordMax: "Parol 100 ta belgidan oshmasligi kerak.",
    gradeRequired: "Sinfni tanlang (7–11).",
    langRequired: "Tilni tanlang.",
    unknownRegion: "Nomaʼlum hudud yoki maktab.",
    titleRequired: "Loyiha nomini kiriting.",
    titleMin: "Nom kamida 4 ta belgidan iborat boʻlishi kerak.",
    titleMax: "Nom 100 ta belgidan oshmasligi kerak.",
    summaryRequired: "Qisqa tavsif yozing.",
    summaryMin: "Tavsif kamida 20 ta belgidan iborat boʻlishi kerak.",
    summaryMax: "Tavsif 500 ta belgidan oshmasligi kerak.",
    categoryRequired: "Toifani tanlang.",
    textMax: "Matn 3000 ta belgidan oshmasligi kerak.",
    signInRequired: "Loyiha yuborish uchun tizimga kiring.",
    forbidden: "Huquqlar yetarli emas."
  },
  appNav: {
    overview: "Umumiy",
    submit: "Loyiha yuborish",
    projects: "Loyihalar",
    opportunities: "Imkoniyatlar",
    talentMap: "Talent Map",
    community: "Knowledge Bridge",
    mentorship: "Mentorlik",
    admin: "Boshqaruv paneli"
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
    PENDING: "Tasdiqlash kutilmoqda",
    ACTIVE: "Faol",
    SUSPENDED: "Bloklangan",
    DEACTIVATED: "Oʻchirilgan",
    UNVERIFIED: "Tasdiqlanmagan",
    VERIFIED: "Tasdiqlangan",
    REJECTED: "Rad etilgan",
    DRAFT: "Qoralama",
    PENDING_REVIEW: "Tekshiruvda",
    APPROVED: "Eʼlon qilingan",
    ACTIVE_PROJECT: "Jarayonda",
    COMPLETED: "Yakunlangan",
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
  dashboard: {
    eyebrow: "Shaxsiy maydoning",
    greeting: "Xush kelibsan, {name}!",
    lead: "Yoʻling — oʻz qoʻlingda. Bu yerda hozir qayerdaliging va keyin nima qilish mumkinligi koʻrinadi.",
    submittedTitle: "Loyiha yuborildi.",
    submittedText: "Moderator uni tekshiradi. Tasdiqlangach, u loyihalar sahifasida paydo boʻladi.",
    statProjects: "Loyihalar",
    statXp: "Tasdiqlangan XP",
    statTeams: "Jamoalar",
    statProfile: "Profil",
    myProjects: "Mening loyihalarim",
    myProjectsHint: "Har bir loyiha eʼlon qilinishidan oldin tekshiriladi.",
    emptyTitle: "Hali loyihang yoʻq",
    emptyText: "Maktabing, shahring yoki mahallangni yaxshilash gʻoyang bormi? Muammoni va uni qanday hal qilishingni yoz.",
    emptyCta: "Birinchi loyihani yuborish",
    submittedOn: "{category} · {date} da yuborilgan",
    explore: "Yana nimalarni koʻrish mumkin",
    exploreOpp: { t: "Imkoniyatlar", d: "Platforma tekshirgan tanlovlar, stipendiyalar va dasturlar.", cta: "Koʻrish" },
    exploreProjects: { t: "Oʻquvchilar loyihalari", d: "Boshqalar nima yaratayotganini koʻr va ilhomlan.", cta: "Ochish" },
    exploreTalent: { t: "Talent Map", d: "Sakkiz yoʻnalishda kuchli tomonlaringni bil. Tez orada.", cta: "Batafsil" }
  },
  projects: {
    eyebrow: "Muhim narsa yarat",
    title: "Oʻquvchilar loyihalari",
    lead: "Butun Oʻzbekiston maktab oʻquvchilarining gʻoya va tashabbuslari. Bu yerdagi har bir loyiha moderator tomonidan tekshirilgan.",
    submit: "Loyiha yuborish",
    emptyTitle: "Hali eʼlon qilingan loyihalar yoʻq",
    emptyText: "Tasdiqlangan loyihalar shu yerda paydo boʻladi. Birinchi boʻl — loyihangni yubor, moderator uni tekshiradi.",
    emptyCta: "Birinchi loyihani yuborish"
  },
  newProject: {
    eyebrow: "School Hack · Yarat",
    title: "Loyiha yuborish",
    lead: "Haqiqiy muammoni va uni qanday hal qilishingni tasvirla. Moderator har bir loyihani eʼlon qilishdan oldin tekshiradi.",
    titleLabel: "Loyiha nomi",
    titlePh: "masalan, Mahallamiz uchun toza suv datchiklari",
    category: "Toifa",
    categoryPh: "Toifani tanlang",
    summary: "Qisqa tavsif",
    summaryHint: "20–500 ta belgi. Buni loyihalar sahifasida koʻrishadi.",
    problem: "Qaysi muammoni hal qilyapsan? (ixtiyoriy)",
    solution: "Uni qanday hal qilasan? (ixtiyoriy)",
    submit: "Tekshiruvga yuborish",
    pending: "Yuborilmoqda…"
  },
  opportunities: {
    eyebrow: "Opportunity Relay",
    title: "Imkoniyatlar",
    lead: "Tanlovlar, stipendiyalar, grantlar va dasturlar — har birini eʼlon qilishdan oldin platforma jamoasi tekshiradi.",
    emptyTitle: "Hozircha ochiq imkoniyatlar yoʻq",
    emptyText: "Yangi imkoniyatlar tekshiruvdan soʻng qoʻshiladi. Keyinroq qayting.",
    official: "Rasmiy sayt"
  },
  soon: {
    whatTitle: "Bu modulda nimalar boʻladi",
    whyTitle: "Nega hali yopiq.",
    meanwhile: "Hozircha mumkin",
    submit: "Loyiha yuborish",
    browse: "Imkoniyatlarni koʻrish",
    talentMap: {
      eyebrow: "Kashf et",
      title: "Talent Map",
      description: "Nimada kuchli ekaningni va qayerga oʻsishni xohlashingni bil.",
      features: [
        "Sakkiz yoʻnalish boʻyicha qisqa soʻrovnoma: yetakchilik, tanqidiy fikrlash, ijodkorlik, muloqot, tadbirkorlik, texnologiya, tadqiqot va ijtimoiy taʼsir.",
        "Eng kuchli tomonlaring koʻrsatilgan shaxsiy profil.",
        "Senga mos loyiha va imkoniyatlar bilan rivojlanish rejasi."
      ],
      blocker: "Savollar, ballarni hisoblash va talqinni avval dasturning metodik jamoasi tasdiqlashi kerak. Oʻylab topilgan ballarni koʻrsatmaymiz."
    },
    community: {
      eyebrow: "Bogʻlan",
      title: "Knowledge Bridge",
      description: "Tengdoshlaringdan oʻrgan va bilimingni ulash.",
      features: [
        "Butun Oʻzbekiston oʻquvchilarini birlashtiradigan hududiy hamjamiyatlar.",
        "Oʻquvchilarning oʻzlari olib boradigan «oʻquvchidan oʻquvchiga» mashgʻulotlari.",
        "Moderatsiya qilinadigan qoʻllanmalar va materiallar kutubxonasi."
      ],
      blocker: "Postlar va fayl yuklashni oʻquvchilarga ochishdan oldin moderatsiya va xavfsizlik tekshiruvi kerak."
    },
    mentorship: {
      eyebrow: "Ustoz bilan oʻrgan",
      title: "Mentorlik",
      description: "Tasdiqlangan mentorlardan maslahat ol.",
      features: [
        "Universitetlar, kompaniyalar va NNTlardan tasdiqlangan mentorlar.",
        "Qiziqish va loyihalar boʻyicha xavfsiz moslashtirish.",
        "18 yoshgacha boʻlgan oʻquvchilarni himoya qiladigan moderatsiya qilinadigan muloqot."
      ],
      blocker: "Avval mentorlarni tekshirish va xavfsiz muloqot qoidalari kerak: oʻquvchilarning aksariyati voyaga yetmagan."
    }
  },
  admin: {
    eyebrow: "Boshqaruv markazi",
    title: "Boshqaruv",
    lead: "Maʼlumotlar bazasidan jonli raqamlar va moderatsiya navbatlari.",
    stats: {
      pendingUsers: "Tasdiqlanadigan akkauntlar",
      pendingProjects: "Tekshiriladigan loyihalar",
      students: "Faol oʻquvchilar",
      projects: "Barcha loyihalar",
      mentors: "Tasdiqlangan mentorlar",
      teachers: "Oʻqituvchilar",
      regions: "Faol hududlar",
      schools: "Maktablar"
    },
    viewOnly: "Navbatlarni koʻrishingiz mumkin. Akkaunt va loyihalarni faqat administrator tasdiqlay oladi.",
    usersTitle: "Tasdiqlashni kutayotgan akkauntlar",
    usersEmpty: "Hammasi koʻrib chiqildi — yangi arizalar yoʻq.",
    gradeN: "{n}-sinf",
    registered: "{date} da roʻyxatdan oʻtgan",
    projectsTitle: "Tekshiruvdagi loyihalar",
    projectsEmpty: "Tekshiruvni kutayotgan loyihalar yoʻq.",
    by: "muallif: {name}",
    logBy: "bajardi: {name}",
    logTitle: "Soʻnggi harakatlar",
    logEmpty: "Hali hech narsa moderatsiya qilinmagan.",
    approve: "Tasdiqlash",
    reject: "Rad etish",
    actions: {
      "user.active": "Akkaunt tasdiqlandi",
      "user.deactivated": "Akkaunt rad etildi",
      "project.approved": "Loyiha eʼlon qilindi",
      "project.rejected": "Loyiha rad etildi"
    },
    deleted: "oʻchirilgan obyekt",
    system: "tizim"
  }
};

export default uz;
