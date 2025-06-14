import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    location: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMsg('');
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await api.post('/events', formData);
      navigate('/events');
    } catch (err: any) {
      console.error('Add event failed:', err);
      if (err.response?.data?.errors) {
        const firstKey = Object.keys(err.response.data.errors)[0];
        setErrorMsg(err.response.data.errors[firstKey][0]);
      } else {
        setErrorMsg('Failed to save. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/events');
  };

  const isDisabled = !formData.date || !formData.title || !formData.location || loading;

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      {/* Decorative Teal Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -mt-20 -mr-20 w-60 h-60 bg-teal-400/20 rounded-full blur-3xl z-0"
      />

      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-10 z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-teal-500 mb-6 drop-shadow-sm">
          Add New Event
        </h2>

        {errorMsg && (
          <div className="mb-6 bg-red-100 text-red-800 px-5 py-3 rounded-lg border border-red-200 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-red-600 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.937-.93 1.937-2.078V6.078C20 4.93 19.117 4 18.063 4H5.063C4.009 4 3.126 4.93 3.126 6.078v11.844C3.126 19.07 4.009 20 5.063 20z" />
            </svg>
            <p className="text-md">{errorMsg}</p>
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
              className="mt-2 block w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm 
                         focus:ring-teal-500 focus:border-teal-500 transition duration-200"
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
              className="mt-2 block w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm 
                         focus:ring-teal-500 focus:border-teal-500 transition duration-200"
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
              className="mt-2 block w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm 
                         focus:ring-teal-500 focus:border-teal-500 transition duration-200"
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
              className="mt-2 block w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm 
                         focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 text-gray-700 bg-gray-200 px-5 py-3 rounded-xl 
                         hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDisabled}
              className={`flex items-center gap-3 bg-teal-500 text-white px-6 py-3 rounded-xl 
                          hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 
                          transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              )}
              {loading ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddEvent;
