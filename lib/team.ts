interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  history: string;
  function: string;
}

export const team: TeamMember[] = [
  {
    id: 1,
    role: "Diocesan Chancellor",
    name: "Fr. Luka Yohanna",
    image: "/assets/Yohanna.jpg",
    history:
      "Originates from medieval Church administration; the term comes from Latin cancellarius, a legal secretary.",
    function:
      "Custodian of diocesan archives and official documents. Prepares, authenticates, and preserves records of decrees, appointments, and canonical acts.",
  },
  {
    id: 2,
    role: "Bishop’s Secretary",
    name: "Fr. Chibuzor Victor",
    image: "/assets/Victor.jpg",
    history:
      "Evolved as bishops required personal aides for correspondence and scheduling.",
    function:
      "Manages the bishop’s calendar, communications, and confidential matters. Often serves as a liaison between the bishop and diocesan departments.",
  },
  {
    id: 3,
    role: "Diocesan Procurator",
    name: "Fr. Cyril Ibeh",
    image: "/assets/ibe.jpg",
    history:
      "Rooted in canon law’s management of Church temporal goods.",
    function:
      "Oversees financial and administrative affairs. Manages diocesan assets, budgets, and legal contracts under the bishop’s authority.",
  },
  {
    id: 4,
    role: "Director, Marriage Tribunal",
    name: "Msgr. Atado Joseph",
    image: "/assets/Atado.jpg",
    history:
      "Based on the Church’s judicial system for marriage nullity cases.",
    function:
      "Leads the diocesan tribunal that investigates annulments. Ensures canonical procedures are followed and justice is served.",
  },
  {
    id: 5,
    role: "Director, Justice, Development & Peace Commission (JDPC)",
    name: "Fr. Chibi Samaila",
    image: "/assets/samaila.jpg",
    history:
      "Emerged post-Vatican II to promote social justice.",
    function:
      "Advocates for human rights, peace, and development. Coordinates outreach, civic education, and poverty alleviation.",
  },
  {
    id: 6,
    role: "Education Board Director",
    name: "Msgr. Atado Joseph",
    image: "/assets/Atado.jpg",
    history:
      "Created to oversee Catholic schools and religious education.",
    function:
      "Supervises Catholic educational institutions. Sets curriculum standards, teacher formation, and school policies.",
  },
  {
    id: 7,
    role: "Director, Catechetical Centre",
    name: "Fr. Kelvin Obineche",
    image: "/assets/obineche.jpg",
    history:
      "Rooted in the Church’s mission to teach the faith.",
    function:
      "Coordinates catechism programs and materials. Trains catechists and supports parish-level religious education.",
  },
  {
    id: 8,
    role: "Diocesan Liturgist",
    name: "Fr. Ochekwu John",
    image: "/assets/john.jpg",
    history:
      "Developed as liturgical norms became more complex post-Vatican II.",
    function:
      "Ensures proper celebration of liturgy. Trains clergy and laity in liturgical practices and coordinates diocesan worship events.",
  },
  {
    id: 9,
    role: "Director, Pontifical Mission Societies (PMS)",
    name: "Fr. Abubakar Musa",
    image: "/assets/musa.jpg",
    history:
      "Founded in the 19th century to support global missions.",
    function:
      "Promotes missionary awareness and fundraising. Encourages prayer and support for evangelization worldwide.",
  },
  {
    id: 10,
    role: "Director, Refugees and Migrants",
    name: "Fr. Kelvin Bello",
    image: "/assets/Bello.jpg",
    history:
      "Emerged in response to global migration and humanitarian crises.",
    function:
      "Provides pastoral care and advocacy for displaced persons. Collaborates with NGOs and Church agencies for relief and integration.",
  },
  {
    id: 11,
    role: "Director, School of Faith",
    name: "Fr. Casmir Obi",
    image: "/assets/Casmir.jpg",
    history:
      "Inspired by adult faith formation movements.",
    function:
      "Leads programs for deepening theological understanding. Offers courses, retreats, and seminars for lay and clergy.",
  },
  {
    id: 12,
    role: "Director, Social Communications",
    name: "Fr. Chibuzor Victor",
    image: "/assets/chibuzor.jpg",
    history:
      "Formalized after Vatican II’s Inter Mirifica document on media.",
    function:
      "Manages diocesan media and public relations. Oversees publications, broadcasts, and digital evangelization.",
  },
];
