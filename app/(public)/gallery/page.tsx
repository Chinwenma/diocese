import GalleryClient from '@/app/components/gallery/Gallery'
import prisma from '@/lib/prisma'

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <GalleryClient images={images} />
}
