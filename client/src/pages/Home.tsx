import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  note?: string;
};

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setErrorMsg('');
      setLoading(true);

      try {
        const response = await api.get<Event[]>('/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setErrorMsg('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const { total, minDate, maxDate, rangeText } = useMemo(() => {
    const validDates = events
      .map(e => e.date)
      .filter((date): date is string => typeof date === 'string' && date.trim() !== '')
      .sort();

    if (validDates.length === 0) {
      return { total: 0, minDate: '-', maxDate: '-', rangeText: 'No events yet' };
    }

    const min = validDates[0];
    const max = validDates[validDates.length - 1];
    return {
      total: validDates.length,
      minDate: min,
      maxDate: max,
      rangeText: `between ${min} and ${max}`,
    };
  }, [events]);

  return (
    <main className="relative pt-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      {/* Decorative gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 80% 15%, #5eead4 0%, transparent 70%), radial-gradient(circle at 0% 100%, #2dd4bf22 0%, transparent 80%)',
          opacity: 0.18,
        }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 z-10">
        <div className="flex-1 space-y-8 max-w-xl">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-800 leading-tight drop-shadow-sm">
            Welcome to <span className="text-teal-500">EventTracker</span>
          </h1>
          <p className="text-gray-700 text-xl sm:text-2xl font-medium max-w-2xl">
            Organize, manage, and celebrate your important moments.  
            <span className="block mt-2 text-teal-500 font-semibold">All in one place.</span>
          </p>
          {loading ? (
            <p className="text-gray-400 italic">Loading event statistics...</p>
          ) : (
            <p className="text-gray-700 text-lg sm:text-xl">
              You have <strong>{total}</strong> event{total !== 1 && 's'} {total > 0 && rangeText}.
            </p>
          )}

          <div className="flex flex-wrap gap-5 mt-6">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-xl hover:bg-teal-600 hover:scale-105 active:scale-95 transition duration-200 focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label="View all events"
            >
              <span role="img" aria-label="Calendar">📅</span> View Events
            </Link>
            <Link
              to="/events/new"
              className="inline-flex items-center gap-2 bg-white text-teal-500 border border-teal-200 px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:bg-teal-50 hover:scale-105 active:scale-95 transition duration-200 focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label="Add a new event"
            >
              <span role="img" aria-label="Add">✨</span> Add New Event
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative">
          <div className="relative">
            <img
              src="/event-logo1.png"
              alt="EventTracker Illustration"
              className="max-w-xs sm:max-w-sm w-full rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500"
            />
            {/* Accent floating shape */}
            <div className="absolute -top-8 -right-8 bg-teal-400/20 rounded-full w-24 h-24 blur-xl z-[-1]" />
          </div>
        </div>
      </section>

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-8 bg-red-100 text-red-800 px-6 py-4 rounded-xl shadow animate-fade-in text-lg font-semibold text-center">
          {errorMsg}
        </div>
      )}

      {/* Stats Overview */}
      {!loading && (
        <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 z-10">
          {[
            { icon: '📊', title: 'Total Events', value: total },
            { icon: '🗓️', title: 'Earliest Event', value: minDate },
            { icon: '📌', title: 'Latest Event', value: maxDate },
          ].map(({ icon, title, value }) => (
            <div
              key={title}
              className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-8 text-center border-t-4 border-teal-400 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-5xl mb-2">{icon}</div>
              <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
              <p className="text-gray-500 text-lg mt-1">{title}</p>
            </div>
          ))}
        </section>
      )}

      {/* Key Features */}
      <section className="mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-12 text-center drop-shadow">
          Key Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: '📝',
              title: 'Quick Event Creation',
              desc: 'Add events in seconds with a streamlined, user-friendly form.',
            },
            {
              icon: '✏️',
              title: 'Flexible Editing',
              desc: 'Easily update event details anytime, anywhere.',
            },
            {
              icon: '📱',
              title: 'Responsive Design',
              desc: 'Access EventTracker seamlessly on any device.',
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-white to-gray-100 shadow-xl p-8 rounded-2xl text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-6xl mb-4">{icon}</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">{title}</h4>
              <p className="text-gray-600 text-lg">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Quick Access
        </h2>
        <div className="flex flex-wrap justify-center gap-7">
          {[
            { to: '/events', label: 'All Events' },
            { to: '/events/new', label: 'Add New' },
            { to: '/about', label: 'About' },
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="text-teal-500 hover:text-teal-700 text-xl font-semibold px-6 py-2 transition duration-200 hover:underline bg-teal-100/30 rounded-lg"
              aria-label={label}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
