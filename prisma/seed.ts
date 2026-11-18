import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function main(){
  const region=await prisma.region.upsert({where:{id:"navoi-region"},update:{},create:{id:"navoi-region",nameUz:"Navoiy viloyati",nameRu:"Навоийская область",nameEn:"Navoi Region"}});
  const email=(process.env.SEED_ADMIN_EMAIL||"admin@talenttoimpact.uz").toLowerCase();
  const password=process.env.SEED_ADMIN_PASSWORD;
  if(!password) throw new Error("Set SEED_ADMIN_PASSWORD before seeding.");
  await prisma.user.upsert({where:{email},update:{},create:{name:"Platform Administrator",email,passwordHash:await hash(password,12),role:"SUPER_ADMIN",status:"ACTIVE",verification:"VERIFIED",preferredLang:"en",regionId:region.id}});
  const comps=[["leadership","Leadership"],["critical-thinking","Critical Thinking"],["creativity","Creativity"],["communication","Communication"],["entrepreneurship","Entrepreneurship"],["technology","Technology"],["research","Research"],["social-impact","Social Impact"]];
  for(const [key,name] of comps) await prisma.competency.upsert({where:{key},update:{},create:{key,nameUz:name,nameRu:name,nameEn:name}});
}
main().finally(()=>prisma.$disconnect());
