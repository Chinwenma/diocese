// export interface PiousOrganization {

//   id: number;
//   title: string;
//   image: string;
//   description: string;
//   chaplain: string;
// }

// export const piousOrganizations: PiousOrganization[] = [
//   {
//     id: 1,
//     title: "Catholic Men Organisation (CMO)",
//     image: "/assets/CMO LOGO.jpg",
//     description:
//       "Men of faith dedicated to leadership, service, and the spiritual development of the family and parish.",
//     chaplain: "Fr. Ajiboh Festus",
//   },
//   {
//     id: 2,
//     title: "Catholic Women Organisation (CWO) / Zumuntar Mata",
//     image: "/assets/CWO LOGO.jpg",
//     description:
//       "A vibrant group of Catholic women committed to spiritual growth, family life, and community service.",
//     chaplain: "Fr. Kelvin Obineche / Fr. Reuben Amodu",
//   },
//   {
//     id: 3,
//     title: "Catholic Youth Organisation of Nigeria (CYON) / NACC",
//     image: "/assets/WhatsApp Image 2025-09-07 at 11.16.24_62da7da3.jpg",
//     description:
//       "Dynamic youth fostering Christian values through evangelization, community, and peer mentorship.",
//     chaplain: "Fr. Lemark Peter",
//   },
//   {
//     id: 4,
//     title: "Biblical Apostolate (CBIU)",
//     image: "/assets/CBIU.jpeg",
//     description:
//       "A lay apostolic association focused on promoting Scripture study, evangelization, and deepening faith.",
//     chaplain: "Fr. Casmir Obi",
//   },
//   {
//     id: 5,
//     title: "Choir",
//     image: "/assets/choir.png",
//     description:
//       "A dedicated group that enriches liturgy and worship through sacred music and singing.",
//     chaplain: "Fr. Chibi Samaila",
//   },
//   {
//     id: 6,
//     title: "Zumuncin Maza",
//     image: "/assets/pic1.jpg",
//     description:
//       "A fellowship of Catholic men strengthening one another in faith, service, and community bonding.",
//     chaplain: "Msgr. Atado Joseph",
//   },
//   {
//     id: 7,
//     title: "Sabon Rai",
//     image: "/assets/pic21.jpg",
//     description:
//       "A group dedicated to evangelization and nurturing new members in the Catholic faith.",
//     chaplain: "Fr. Reuben Amodu",
//   },
//   {
//     id: 8,
//     title: "Knights",
//     image: "/assets/nit.jpg",
//     description:
//       "Catholic knights committed to charity, unity, fraternity, and defense of the Church.",
//     chaplain: "Fr. Barde",
//   },
//   {
//     id: 9,
//     title: "Charismatic / Holy Name",
//     image: "/assets/ccrn.jpeg",
//     description:
//       "A renewal movement promoting prayer, praise, healing, and devotion to the Holy Name of Jesus.",
//     chaplain: "Fr. Bahywa John",
//   },
//   {
//     id: 10,
//     title: "NFCS / YCS",
//     image: "/assets/nfcs.jpeg",
//     description:
//       "National Federation of Catholic Students and Young Catholic Students committed to academic, social, and spiritual growth.",
//     chaplain: "Fr. Ajiboh Festus",
//   },
//   {
//     id: 11,
//     title: "Marian Devotees / Block Rosary",
//     image: "/assets/blockk.jpeg",
//     description:
//       "A prayer group dedicated to Marian devotion through the daily recitation of the Rosary.",
//     chaplain: "Fr. Bakoshi Mathais",
//   },
//   {
//     id: 12,
//     title: "St. Vincent De Paul",
//     image: "/assets/ST VINCENT.jpg",
//     description:
//       "Lay Catholics serving the poor, sick, and marginalized through charity and works of mercy.",
//     chaplain: "Fr. Ochekwu John",
//   },
//   {
//     id: 13,
//     title: "Holy Childhood Association (HCA)",
//     image: "/assets/HCA.png",
//     description:
//       "Children helping children in mission through prayer, sacrifice, and small works of charity.",
//     chaplain: "Fr. Abubakar Musa",
//   },
//   {
//     id: 14,
//     title: "Altar Knight",
//     image: "/assets/altar.jpeg",
//     description:
//       "An association of altar servers dedicated to assisting at Mass and fostering devotion to the Eucharist.",
//     chaplain: "Fr. Izuala John",
//   },
//   {
//     id: 15,
//     title: "Catholic Cadet",
//     image: "/assets/cadet.jpeg",
//     description:
//       "Young Catholics instilled with discipline, service, and leadership in the spirit of faith.",
//     chaplain: "Fr. Shidi Stephen",
//   },
//   {
//     id: 16,
//     title: "Sacred Heart / Divine Mercy / Precious Blood",
//     image: "/assets/SACRED HEART OF JESUS.jpg",
//     description:
//       "Members promote devotion to the Sacred Heart of Jesus, Divine Mercy, and the Precious Blood through prayer and service.",
//     chaplain: "Fr. Asheji Duniya Pius",
//   },
//   {
//     id: 17,
//     title: "Family and Human Life",
//     image: "/assets/pic5.jpg",
//     description:
//       "An apostolate dedicated to strengthening Christian marriage, family values, and the dignity of human life.",
//     chaplain: "Fr. Bakoshi Mathais",
//   },
//   {
//     id: 18,
//     title: "Catholic Bankers",
//     image: "/assets/pic30.jpg",
//     description: "",
//     chaplain: "Fr. Bakoshi Mathais",
//   },
// ];




export interface PiousOrganization {
  id: number;
  title: string;
  image: string;
  description: string;
  chaplain: string;
  founded?: string;
  origin?: string;
  mission?: string;
}

export const piousOrganizations: PiousOrganization[] = [
  {
    id: 1,
    title: "Catholic Men Organisation (CMO)",
    image: "/assets/CMO LOGO.jpg",
    description:
      "Men of faith dedicated to leadership, service, and the spiritual development of the family and parish.",
    chaplain: "Fr. Ajiboh Festus",
    founded: "Mid-20th century",
    origin: "Created to unite Catholic men in faith, family leadership, and parish development.",
    mission: "Promote spiritual growth, support Church projects, and mentor younger men.",
  },
  {
    id: 2,
    title: "Catholic Women Organisation (CWO) / Zumuntar Mata",
    image: "/assets/CWO LOGO.jpg",
    description:
      "A vibrant group of Catholic women committed to spiritual growth, family life, and community service.",
    chaplain: "Fr. Kelvin Obineche / Fr. Reuben Amodu",
    founded: "1960s–70s in Nigeria",
    origin: "Emerged to empower Catholic women in family, Church, and society.",
    mission: "Support catechesis, charity, and moral education.",
  },
  {
    id: 3,
    title: "Catholic Youth Organisation of Nigeria (CYON) / NACC",
    image: "/assets/WhatsApp Image 2025-09-07 at 11.16.24_62da7da3.jpg",
    description:
      "Dynamic youth fostering Christian values through evangelization, community, and peer mentorship.",
    chaplain: "Fr. Lemark Peter",
    founded: "1985 by the Catholic Bishops’ Conference of Nigeria",
    origin: "Formed to engage youth in evangelization and leadership.",
    mission: "Foster Catholic identity, social responsibility, and community service.",
  },
  {
    id: 4,
    title: "Biblical Apostolate (CBIU)",
    image: "/assets/CBIU.jpeg",
    description:
      "A lay apostolic association focused on promoting Scripture study, evangelization, and deepening faith.",
    chaplain: "Fr. Casmir Obi",
    founded: "Post-Vatican II (1960s)",
    origin: "Inspired by Vatican II’s call for Scripture literacy.",
    mission: "Promote Bible study, translation, and integration into daily life.",
  },
  {
    id: 5,
    title: "Choir",
    image: "/assets/choir.png",
    description:
      "A dedicated group that enriches liturgy and worship through sacred music and singing.",
    chaplain: "Fr. Chibi Samaila",
    founded: "Since early Christianity",
    origin: "Liturgical music has always been central to worship.",
    mission: "Lead congregational singing and enhance liturgical celebrations.",
  },
  {
    id: 6,
    title: "Zumuncin Maza",
    image: "/assets/pic1.jpg",
    description:
      "A fellowship of Catholic men strengthening one another in faith, service, and community bonding.",
    chaplain: "Msgr. Atado Joseph",
  },
  {
    id: 7,
    title: "Sabon Rai",
    image: "/assets/pic21.jpg",
    description:
      "A group dedicated to evangelization and nurturing new members in the Catholic faith.",
    chaplain: "Fr. Reuben Amodu",
  },
  {
    id: 8,
    title: "Knights of St. John International (KSJI)",
    image: "/assets/nit.jpg",
    description:
      "Catholic knights committed to charity, unity, fraternity, and defense of the Church.",
    chaplain: "Fr. Barde",
    founded: "1886 in the U.S.",
    origin: "A Catholic fraternal order for men, modeled after medieval knights.",
    mission: "Promote discipline, charity, and Church service.",
  },
  {
    id: 9,
    title: "Catholic Charismatic Renewal / Holy Name Society",
    image: "/assets/ccrn.jpeg",
    description:
      "A renewal movement promoting prayer, praise, healing, and devotion to the Holy Name of Jesus.",
    chaplain: "Fr. Bahywa John",
    founded: "1967 at Duquesne University, USA / 1274 by the Dominican Order",
    origin: "Inspired by Pentecostal spirituality and reverence for the Name of Jesus.",
    mission:
      "Deepen personal relationship with Christ through prayer, healing, and moral living.",
  },
  {
    id: 10,
    title: "NFCS / YCS",
    image: "/assets/nfcs.jpeg",
    description:
      "National Federation of Catholic Students and Young Catholic Students committed to academic, social, and spiritual growth.",
    chaplain: "Fr. Ajiboh Festus",
    founded: "1950s (NFCS) / 1929 in France (YCS, introduced to Nigeria in the 1950s)",
    origin:
      "Formed to support Catholic students in schools and tertiary institutions.",
    mission: "Promote leadership, academic excellence, and faith formation.",
  },
  {
    id: 11,
    title: "Marian Devotees / Block Rosary",
    image: "/assets/blockk.jpeg",
    description:
      "A prayer group dedicated to Marian devotion through the daily recitation of the Rosary.",
    chaplain: "Fr. Bakoshi Mathais",
    founded: "1921 (Legion of Mary) / 1950s (Block Rosary Crusade)",
    origin: "Lay apostolate under Mary’s patronage and grassroots Marian devotion.",
    mission: "Promote communal prayer, visitation, and evangelization.",
  },
  {
    id: 12,
    title: "St. Vincent De Paul Society",
    image: "/assets/ST VINCENT.jpg",
    description:
      "Lay Catholics serving the poor, sick, and marginalized through charity and works of mercy.",
    chaplain: "Fr. Ochekwu John",
    founded: "1833 in Paris by Blessed Frédéric Ozanam",
    origin: "Lay Catholic group for charitable outreach.",
    mission: "Serve the poor through home visits and social justice.",
  },
  {
    id: 13,
    title: "Holy Childhood Association (HCA)",
    image: "/assets/HCA.png",
    description:
      "Children helping children in mission through prayer, sacrifice, and small works of charity.",
    chaplain: "Fr. Abubakar Musa",
    founded: "1843 in France by Bishop Charles de Forbin-Janson",
    origin: "Missionary awareness for children.",
    mission: "Encourage prayer and support for global missions.",
  },
  {
    id: 14,
    title: "Altar Knights / Servers",
    image: "/assets/altar.jpeg",
    description:
      "An association of altar servers dedicated to assisting at Mass and fostering devotion to the Eucharist.",
    chaplain: "Fr. Izuala John",
    founded: "Centuries ago",
    origin: "Assist priests during Mass and liturgical functions.",
    mission: "Foster discipline, reverence, and early vocation awareness.",
  },
  {
    id: 15,
    title: "Catholic Cadet Organization",
    image: "/assets/cadet.jpeg",
    description:
      "Young Catholics instilled with discipline, service, and leadership in the spirit of faith.",
    chaplain: "Fr. Shidi Stephen",
    founded: "20th century (varies by parish)",
    origin: "Combines military-style discipline with Catholic values.",
    mission: "Promote patriotism, service, and moral leadership.",
  },
  {
    id: 16,
    title: "Sacred Heart / Divine Mercy / Precious Blood Devotions",
    image: "/assets/SACRED HEART OF JESUS.jpg",
    description:
      "Members promote devotion to the Sacred Heart of Jesus, Divine Mercy, and the Precious Blood through prayer and service.",
    chaplain: "Fr. Asheji Duniya Pius",
    founded: "1675 (Sacred Heart), 1930s (Divine Mercy), 1990s (Precious Blood)",
    origin:
      "Devotions centered on the love, mercy, and redemptive power of Jesus Christ.",
    mission: "Reparation for sin, trust in God’s mercy, and prayer for healing and protection.",
  },
  {
    id: 17,
    title: "Family and Human Life Apostolate",
    image: "/assets/pic5.jpg",
    description:
      "An apostolate dedicated to strengthening Christian marriage, family values, and the dignity of human life.",
    chaplain: "Fr. Bakoshi Mathais",
    founded: "Post-Vatican II era",
    origin: "Church response to modern challenges in family life.",
    mission: "Promote marriage, parenting, and pro-life values.",
  },
  {
    id: 18,
    title: "Catholic Bankers Association",
    image: "/assets/pic30.jpg",
    description:
      "Professional body of Catholic bankers promoting ethics, faith, and fellowship in the financial sector.",
    chaplain: "Fr. Bakoshi Mathais",
    founded: "Late 20th century in Nigeria",
    origin: "Professional group for Catholic finance workers.",
    mission: "Promote ethical banking, fellowship, and Church support.",
  },
];
