/**
 * Demo content for the pilot showcase + a one-time cleanup of test data.
 *
 * Runs on every server start (see `start:prod`) but is safe to repeat:
 * - CLEANUP runs only once, ever: it deletes student accounts and their projects that existed before
 *   the reset (test junk), then writes a marker to the audit log. Later starts see the marker and skip it,
 *   so real students who register afterwards are never touched.
 * - DEMO rows are upserted by email / title, so restarts don't duplicate them.
 *
 * Demo accounts use @demo.talenttoimpact.uz and a random unknown password: nobody can sign in as them.
 * To remove the demo later: delete users whose email ends with DEMO_DOMAIN (their projects go with them).
 */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { randomBytes } from "node:crypto";

const prisma = new PrismaClient();
const RESET_MARKER = "maintenance.reset-test-data-2026-11";
export const DEMO_DOMAIN = "@demo.talenttoimpact.uz";

type Demo = { name: string; slug: string; school: string; grade: number; daysAgo: number; project: { title: string; category: string; summary: string; problem: string; solution: string } };

const DEMO: Demo[] = [
  { name: "Dilnoza Rashidova", slug: "dilnoza.r", school: "7-maktab, Karmana", grade: 9, daysAgo: 3, project: {
    title: "Ariqdagi suv sifatini kuzatuvchi datchiklar", category: "Ecology",
    summary: "Maktab yonidagi ariqqa uchta loyqalik datchigini oʻrnatib, koʻrsatkichlarni mahallaning telegram kanaliga yuboramiz.",
    problem: "Yomgʻirdan keyin ariqdagi suv loyqalanadi, lekin mahalla bu haqda faqat ekinlar zarar koʻrgandan keyin biladi.",
    solution: "Arduino va arzon loyqalik datchiklari har soatda oʻlchov oladi. Chegara oshsa, kanalga avtomatik xabar boradi. Fizika toʻgaragi qurilmalarni yigʻadi." } },
  { name: "Jasur Toshmatov", slug: "jasur.t", school: "Школа № 32, Навои", grade: 10, daysAgo: 5, project: {
    title: "Расписание школьного автобуса в Telegram-боте", category: "Technology",
    summary: "Бот показывает, где сейчас школьный автобус и через сколько минут он будет на остановке.",
    problem: "Ученики из дальних кварталов по 20–30 минут ждут автобус на улице, особенно зимой, потому что не знают, когда он приедет.",
    solution: "Водитель включает геолокацию в телефоне, бот считает примерное время до каждой остановки. Ученики подписываются на свою остановку и получают уведомление за 5 минут." } },
  { name: "Madina Yusupova", slug: "madina.y", school: "3-maktab, Zarafshon", grade: 8, daysAgo: 7, project: {
    title: "Maktab kutubxonasi uchun kitob almashinuvi", category: "Education",
    summary: "Uyda oʻqilgan kitoblarni maktabga olib kelib, boshqa kitobga almashtirish mumkin boʻlgan javon.",
    problem: "Kutubxonada yangi badiiy kitoblar kam, oʻquvchilar esa uyda oʻqib boʻlgan kitoblarini saqlab qoʻyadi.",
    solution: "Koridorda «kitob ber — kitob ol» javoni va oddiy roʻyxat. Har oy eng koʻp oʻqilgan kitob haqida sinf soatida qisqa suhbat." } },
  { name: "Sardor Karimov", slug: "sardor.k", school: "Школа № 5, Кызылтепа", grade: 11, daysAgo: 9, project: {
    title: "Капельный полив для школьного сада", category: "Engineering",
    summary: "Система капельного полива из пластиковых бутылок и шлангов для 40 деревьев во дворе школы.",
    problem: "Летом деревья во дворе поливают раз в неделю из шланга, половина воды уходит в песок, молодые саженцы засыхают.",
    solution: "Собираем капельные линии из переработанных бутылок и дешёвых шлангов, подключаем к баку на крыше. Расход воды измерим до и после — цель сократить его вдвое." } },
  { name: "Shahzoda Ergasheva", slug: "shahzoda.e", school: "12-maktab, Navoiy", grade: 7, daysAgo: 11, project: {
    title: "Batareyalarni yigʻish qutisi", category: "Ecology",
    summary: "Har bir sinfda ishlatilgan batareyalar uchun quti va ularni qayta ishlashga topshirish tartibi.",
    problem: "Batareyalar oddiy chiqindi bilan tashlanadi va tuproqni zaharlaydi, lekin ularni qayerga topshirish kerakligini hech kim bilmaydi.",
    solution: "Har sinfda belgilangan quti, oyiga bir marta yigʻib, shahardagi qabul punktiga topshiramiz. Necha kilogramm yigʻilganini maktab devoriy gazetasida eʼlon qilamiz." } },
  { name: "Bekzod Nurmatov", slug: "bekzod.n", school: "Школа № 2, Учкудук", grade: 10, daysAgo: 13, project: {
    title: "Солнечная зарядка для телефонов во дворе школы", category: "Engineering",
    summary: "Скамейка с солнечной панелью и USB-портами, где ученики могут зарядить телефон на перемене.",
    problem: "В Учкудуке почти круглый год солнце, но в школе нет мест для зарядки, и розетки в классах заняты.",
    solution: "Панель 100 Вт, контроллер и аккумулятор крепим к скамейке. Покажем на табличке, сколько энергии выработано за день — заодно это наглядный урок физики." } },
  { name: "Nilufar Saidova", slug: "nilufar.s", school: "1-maktab, Nurota", grade: 9, daysAgo: 16, project: {
    title: "Nurota hunarmandlari haqida onlayn xarita", category: "Social Innovation",
    summary: "Tumandagi kashtachilar, kulollar va toʻquvchilarni xaritaga joylashtirib, ularning ishlarini sayyohlarga koʻrsatish.",
    problem: "Nurotaga sayyohlar keladi, lekin mahalliy hunarmandlarni topa olmaydi, hunarmandlar esa oʻz ishini sotishga qiynaladi.",
    solution: "Oʻquvchilar hunarmandlar bilan suhbat qilib, rasm va manzillarni yigʻadi, bepul xarita xizmatida ochiq xarita yaratadi. Xaritaga QR kod mehmonxonalarga tarqatiladi." } },
  { name: "Otabek Xolmirzayev", slug: "otabek.x", school: "Школа № 9, Кармана", grade: 11, daysAgo: 18, project: {
    title: "Подготовка к олимпиадам: ученики учат учеников", category: "Education",
    summary: "Старшеклассники-призёры олимпиад раз в неделю разбирают задачи с учениками 7–8 классов.",
    problem: "Репетиторы дорогие, а у младших классов нет никого, кто объяснил бы олимпиадные задачи простым языком.",
    solution: "Кабинет после уроков по средам, расписание тем на четверть, задачи из прошлых олимпиад. Отслеживаем, сколько участников дойдёт до районного тура." } },
  { name: "Zarina Abdullayeva", slug: "zarina.a", school: "4-maktab, Xatirchi", grade: 8, daysAgo: 21, project: {
    title: "Maktab oshxonasida ortiqcha ovqatni kamaytirish", category: "Social Innovation",
    summary: "Har kuni qancha ovqat tashlanayotganini oʻlchab, menyuni oʻquvchilar fikriga qarab oʻzgartirish.",
    problem: "Oshxonada har kuni koʻp ovqat tashlanadi, chunki baʼzi taomlarni oʻquvchilar yemaydi.",
    solution: "Bir oy davomida qoldiqlarni tarozida oʻlchaymiz, qisqa soʻrovnoma oʻtkazamiz va natijalarni maktab maʼmuriyatiga taklif sifatida beramiz." } },
  { name: "Jahongir Rustamov", slug: "jahongir.r", school: "Школа № 14, Навои", grade: 9, daysAgo: 24, project: {
    title: "Датчик CO₂ для проветривания классов", category: "Technology",
    summary: "Недорогой датчик в каждом классе загорается жёлтым, когда пора открыть окно.",
    problem: "К третьему уроку в классах душно, ученики устают и хуже концентрируются, но никто не замечает, когда пора проветрить.",
    solution: "Датчик CO₂ и светодиод на плате ESP32. Порог — 1000 ppm. Сравним показатели и самочувствие учеников за две недели до и после." } },
  { name: "Malika Hamidova", slug: "malika.h", school: "6-maktab, Zarafshon", grade: 10, daysAgo: 27, project: {
    title: "Oʻquvchilar uchun moliyaviy savodxonlik kursi", category: "Business",
    summary: "Toʻqqiz qisqa darsdan iborat kurs: byudjet, jamgʻarma, firibgarlikdan saqlanish.",
    problem: "Koʻp oʻquvchilarning bank kartasi bor, lekin ular foiz, kredit va onlayn firibgarlik haqida deyarli hech narsa bilmaydi.",
    solution: "Iqtisodiyot oʻqituvchisi bilan birga darslar tayyorlaymiz, har dars oxirida amaliy topshiriq. Kurs oldidan va keyin test oʻtkazib, natijani solishtiramiz." } },
  { name: "Doniyor Qodirov", slug: "doniyor.q", school: "Школа № 21, Навои", grade: 7, daysAgo: 30, project: {
    title: "Безопасный переход у школы", category: "Social Innovation",
    summary: "Подсчитать поток машин у школы утром и предложить хокимияту разметку и знак «Осторожно, дети».",
    problem: "У ворот школы нет пешеходного перехода, утром ученики перебегают дорогу между машинами.",
    solution: "Две недели ведём подсчёт машин и учеников в 7:30–8:15, делаем схему и фото. С данными идём в махаллинский комитет и пишем обращение в хокимият." } }
];

async function cleanupOnce() {
  const done = await prisma.auditLog.findFirst({ where: { action: RESET_MARKER } });
  if (done) return;
  await prisma.$transaction(async (tx) => {
    const students = await tx.user.findMany({ where: { role: "STUDENT", NOT: { email: { endsWith: DEMO_DOMAIN } } }, select: { id: true } });
    const ids = students.map((s) => s.id);
    const projects = await tx.project.deleteMany({ where: { ownerId: { in: ids } } });
    const users = await tx.user.deleteMany({ where: { id: { in: ids } } });
    await tx.auditLog.create({ data: { action: RESET_MARKER, entityType: "System", entityId: "test-data", newValue: { deletedUsers: users.count, deletedProjects: projects.count } } });
    console.log(`cleanup: removed ${users.count} test students and ${projects.count} projects`);
  });
}

async function seedDemo() {
  const region = await prisma.region.findUnique({ where: { id: "navoi-region" }, select: { id: true } });
  for (const d of DEMO) {
    const email = `${d.slug}${DEMO_DOMAIN}`;
    const created = new Date(Date.now() - d.daysAgo * 86_400_000);
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: d.name, email, schoolName: d.school, grade: d.grade, role: "STUDENT", status: "ACTIVE",
        // Random password nobody knows: demo accounts cannot be used to sign in.
        passwordHash: await hash(randomBytes(32).toString("hex"), 10),
        preferredLang: /[а-я]/i.test(d.school) ? "ru" : "uz", regionId: region?.id, createdAt: created
      }
    });
    const exists = await prisma.project.findFirst({ where: { ownerId: user.id, title: d.project.title }, select: { id: true } });
    const { problem, solution, ...rest } = d.project;
    if (!exists)
      await prisma.project.create({
        data: { ...rest, problemStatement: problem, proposedSolution: solution, ownerId: user.id, status: "APPROVED", createdAt: created }
      });
  }
}

async function main() {
  await cleanupOnce();
  await seedDemo();
}

main()
  .catch((e) => { console.error("demo seed failed:", e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
