import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios'; 

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    title: '',
    location: '',
    note: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Fetch the existing event data
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setFormData({
          date: response.data.date,
          title: response.data.title,
          location: response.data.location,
          note: response.data.note || '',
        });
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setErrorMsg('Unable to load event. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setErrorMsg('');
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSaving(true);

    try {
      await api.put(`/events/${id}`, formData);
      navigate('/events');
    } catch (err) {
      console.error('Update event failed:', err);
      if (err.response?.data?.errors) {
        const firstKey = Object.keys(err.response.data.errors)[0];
        setErrorMsg(err.response.data.errors[firstKey][0]);
      } else {
        setErrorMsg('Failed to update. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/events');
  };

  const isDisabled = !formData.date || !formData.title || !formData.location || saving;

  return (
    <main className="pt-20 bg-gray-50 min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 sm:p-10 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Edit Event</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading event details...</p>
        ) : (
          <>
            {errorMsg && (
              <div className="mb-4 bg-red-100 text-red-800 px-4 py-2 rounded-md">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                             focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                             focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                             focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Note */}
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Additional notes (optional)"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm 
                             focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg 
                              hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 
                              focus-visible:ring-blue-500 disabled:opacity-50`}
                >
                  {saving ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : null}
                  {saving ? 'Updating...' : 'Update Event'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default EditEvent;
