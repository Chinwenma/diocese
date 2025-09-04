interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: 1,
    role: "Procurator",
    name: "Fr. Ibeh Cyril",
    image: "/assets/ibe.jpg",
  },
  {
    id: 2,
    role: "Vocation Director",
    name: "Fr. Nura Emmanuel",
    image: "/assets/nura.jpg",
  },
  {
    id: 3,
    role: "Marriage Tribunal",
    name: "Msgr. Atado Joseph",
    image: "/assets/i.jpg",
  },
  {
    id: 4,
    role: "Justice, Development & Peace Commission (JDPC)",
    name: "Fr. Chibi Samaila",
    image: "/assets/samaila.jpg",
  },
  {
    id: 5,
    role: "Communications",
    name: "Fr. Chibuzor Victor",
    image: "/assets/chibuzor.jpg",
  },
  {
    id: 6,
    role: "Education",
    name: "Msgr. Atado Joseph",
    image: "/assets/offices/education.jpg",
  },
  {
    id: 7,
    role: "Catechists",
    name: "Fr. Kelvin Obineche",
    image: "/assets/obineche.jpg",
  },
  {
    id: 8,
    role: "Diocesan Liturgies",
    name: "Fr. Ochekwu John",
    image: "/assets/john.jpg",
  },
  {
    id: 9,
    role: "Pontifical Mission Societies (P.M.S.)",
    name: "Fr. Abubakar Musa",
    image: "/assets/musa.jpg",
  },
  {
    id: 10,
    role: "Diocesan Auditor",
    name: "Mr. Sylvester Dogo",
    image: "/assets/offices/auditor.jpg",
  },
];
