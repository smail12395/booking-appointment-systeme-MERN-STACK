import React from "react";
import { FaStethoscope } from "react-icons/fa";
import { MdOutlineAdminPanelSettings, MdOutlineEmail, MdTranslate } from "react-icons/md";

const FeaturesCards = () => {
  const cards = [
    {
      title: "Admin Panel",
      desc: "Easily add new doctors, view and manage all reservations, cancellations, completed reports, and users.",
      icon: <MdOutlineAdminPanelSettings className="text-4xl text-primary" />,
    },
    {
      title: "Email Reminder",
      desc: "Automatically notify users via email 3 hours before their appointment.",
      icon: <MdOutlineEmail className="text-4xl text-primary" />,
    },
    {
      title: "Translations",
      desc: "Supports multiple languages, making the platform accessible to a wider audience.",
      icon: <MdTranslate className="text-4xl text-primary" />,
    },
    {
      title: "Doctor Panel",
      desc: "Doctors can manage reservations, cancellations, completed reports, and patient data efficiently.",
      icon: <FaStethoscope className="text-4xl text-primary" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Platform Features
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Explore the main features that make our booking platform seamless and user-friendly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-1"
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesCards;
