import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setErrorMsg('');
      setLoading(true);

      try {
        const response = await api.get('/events');
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((evt) => evt.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
      setErrorMsg('Delete failed. Please try again.');
    }
  };

  return (
    <main className="w-full pt-20 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Important Events
          </h2>
          <Link
            to="/events/new"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-teal-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Event
          </Link>
        </div>

        {errorMsg && (
          <div className="mb-6 bg-red-100 text-red-800 px-4 py-2 rounded-lg">
            {errorMsg}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No events found. <Link to="/events/new" className="text-teal-500 hover:underline">Add one now.</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-semibold">Date:</span> {event.date}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-semibold">Location:</span> {event.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Note:</span> {event.note || '-'}
                  </p>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  {confirmDeleteId === event.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/events/edit/${event.id}`}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setConfirmDeleteId(event.id)}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Events;
