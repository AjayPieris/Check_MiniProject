// Shape reference (use this when wiring your API):
// {
//   id: string|number,
//   slug: string,
//   title: string,
//   category: string,
//   image: string,
//   rating: { value: number, count: number },
//   excerpt: string,
//   guide: { name: string, avatar: string, verified: boolean },
//   location: string,
//   durationHours: number,
//   groupSize: number,
//   price: number,
//   currency: string // symbol (e.g., "Rs. ")
// }

export const EXPERIENCES_MOCK = [
  {
    id: 1,
    slug: "colombo-city-tour",
    title: "Colombo City Tour",
    category: "cultural",
    image: "/tours/1.jpeg",
    images: ["/tours/1.jpeg"],
    rating: { value: 4.8, count: 124 },
    excerpt:
      "Explore the bustling streets of Colombo, visiting historical landmarks and vibrant markets.",
    guide: {
      name: "Sumith",
      avatar: "/user/Guide1.jpg",
      verified: true,
    },
    location: "Colombo",
    durationHours: 4,
    groupSize: 10,
    price: 3500,
    currency: "Rs. ",
  },
  {
    id: 2,
    slug: "sigiriya-rock-fortress",
    title: "Sigiriya Rock Fortress",
    category: "historical",
    image: "/tours/2.jpeg",
    images: ["/tours/2.jpeg"],
    rating: { value: 4.9, count: 312 },
    excerpt:
      "Climb the ancient rock fortress of Sigiriya, a UNESCO World Heritage site.",
    guide: {
      name: "Anura",
      avatar: "/user/Guide2.jpg",
      verified: true,
    },
    location: "Sigiriya",
    durationHours: 3,
    groupSize: 15,
    price: 5000,
    currency: "Rs. ",
  },
  {
    id: 3,
    slug: "yala-national-park-safari",
    title: "Yala National Park Safari",
    category: "nature",
    image: "/tours/3.jpeg",
    images: ["/tours/3.jpeg"],
    rating: { value: 4.7, count: 89 },
    excerpt:
      "Experience the wildlife of Sri Lanka on a thrilling safari in Yala National Park.",
    guide: {
      name: "Nuwan",
      avatar: "/user/tourist1.jpg",
      verified: true,
    },
    location: "Yala",
    durationHours: 6,
    groupSize: 6,
    price: 12000,
    currency: "Rs. ",
  },
];
