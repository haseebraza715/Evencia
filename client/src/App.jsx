import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import About from './pages/About';

const App = () => {
  return (
    <div className="w-full min-h-screen bg-blue-50 text-gray-800">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-24 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<AddEvent />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/about" element={<About />} />
          {/* Optional fallback route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
