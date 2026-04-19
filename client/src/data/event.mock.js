// Event data shape reference:
// {
//   id: string|number,
//   slug: string,
//   title: string,
//   description: string,
//   location: string,
//   startDate: string (ISO),
//   endDate?: string (ISO),
//   image?: string,
//   type?: string,
//   time?: string // optional, e.g. "19:00"
// }
export const EVENTS_MOCK = [
  {
    id: 1,
    slug: "kandy-esala-perahera-festival",
    title: "Kandy Esala Perahera Festival",
    description:
      "Experience Sri Lanka's most spectacular cultural festival featuring traditional dancers, drummers, and decorated elephants in a grand procession.",
    location: "Kandy",
    startDate: "2025-08-15",
    type: "Cultural Festival",
    time: "19:00",
    image: "/events/event1.jpg",
  },
  {
    id: 2,
    slug: "galle-literary-festival",
    title: "Galle Literary Festival",
    description:
      "Annual gathering of international authors, poets, and literary enthusiasts in the historic Galle Fort.",
    location: "Galle Fort",
    startDate: "2025-01-20",
    type: "Cultural Festival",
    time: "10:00",
    image: "/events/event2.webp",
  },
  {
    id: 3,
    slug: "trincomalee-kannaki-temple-celebration",
    title: "Trincomalee Kannaki Temple Celebration",
    description:
      "Colorful rituals, devotional music, and coastal processions honoring age‑old traditions.",
    location: "Trincomalee",
    startDate: "2025-04-10",
    type: "Cultural Festival",
    time: "08:30",
    image: "/events/event1.jpg",
  },
  {
    id: 4,
    slug: "colombo-food-culture-week",
    title: "Colombo Food & Culture Week",
    description:
      "A week of fusion street food, artisan crafts, and live performances spotlighting local creators.",
    location: "Colombo",
    startDate: "2025-07-05",
    type: "Cultural Festival",
    time: "18:00",
    image: "/events/event2.webp",
  },
];
