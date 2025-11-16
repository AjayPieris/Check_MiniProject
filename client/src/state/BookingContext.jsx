import React, { createContext, useContext, useMemo, useState } from "react";

const BookingContext = createContext(null);

// Booking shape
// {
//   id, tour: { id, slug, title, image, location, durationHours, price, currency },
//   guide: { id, name, avatar, verified },
//   date, guests, total,
//   status: "pending" | "confirmed" | "cancelled",
//   createdAt
// }
// Messages stored per guideId:
// { [guideId]: [{ id, guideId, sender: 'user' | 'guide', text, createdAt }] }

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState({});

  const createBooking = ({ tour, guide, date, guests }) => {
    const total = Number(tour.price || 0) * Math.max(1, Number(guests || 1));
    const booking = {
      id: `b_${Date.now()}`,
      tour: {
        id: tour.id ?? tour.slug ?? String(Date.now()),
        slug: tour.slug,
        title: tour.title,
        image: tour.image,
        location: tour.location,
        durationHours: tour.durationHours,
        price: tour.price,
        currency: tour.currency || "$",
      },
      guide,
      date,
      guests,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [booking, ...prev]);

    // Seed a system-style message thread with the guide for this booking
    setMessages((prev) => {
      const thread = prev[guide.id] ?? [];
      return {
        ...prev,
        [guide.id]: [
          ...thread,
          {
            id: `m_${Date.now()}`,
            guideId: guide.id,
            sender: "guide",
            text:
              "Thanks for your request! I’ll review and approve shortly. Feel free to send any questions here.",
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });

    return booking;
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const sendMessage = ({ guideId, sender, text }) => {
    setMessages((prev) => {
      const thread = prev[guideId] ?? [];
      return {
        ...prev,
        [guideId]: [
          ...thread,
          {
            id: `m_${Date.now()}`,
            guideId,
            sender,
            text,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
  };

  const value = useMemo(
    () => ({
      bookings,
      messages,
      createBooking,
      updateBookingStatus,
      sendMessage,
    }),
    [bookings, messages]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}