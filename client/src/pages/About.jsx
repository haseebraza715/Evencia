import React from 'react';

const About = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white pt-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Decorative Teal Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 -mt-20 -ml-20 w-60 h-60 bg-teal-400/20 rounded-full blur-3xl z-0"
      />

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-10 text-center z-10 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-500 mb-6 drop-shadow-sm">
          About the Author
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Name:</span> Haseeb Raza
          </p>
          <p>
            <span className="font-semibold">Neptun ID:</span> OT7DEE
          </p>
          <p>
            <span className="font-semibold">Email:</span> haseeb.javed715@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
