import { galleryImages } from '../lib/gallery'
import prisma from './prisma'

async function main() {
  console.log('🌱 Seeding gallery images...')

  // Seed gallery
  await prisma.galleryImage.createMany({
    data: galleryImages,
  })

  console.log(`✅ Seeded ${galleryImages.length} gallery images`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
