export type GalleryImage = {
    slug:string;
  src: string;
  title: string;
  description: string;
};


export const galleryImages: GalleryImage[] = [
  {
    src: '/assets/building1.jpg',
    title: 'arish Office Building',
    description: 'The newly completed parish office complex.',
    slug:'parish-office-building'
  },
  {
    src: '/assets/building2.jpg',
    title: 'Main Cathedral',
    description: 'Front view of the Cathedral in evening light.',
    slug:'main-cathedral'
  },
  {
    src: '/assets/building3.jpg',
    title: 'Youth Formation Centre',
    description: 'Training ground for youth and catechists.',
    slug: "Youth-formation-centre"
  },
  {
    src: '/assets/building4.jpg',
    title: 'Bishop’s Residence',
    description: 'The serene home of the diocesan bishop.',
    slug:"residence"
  },

];
