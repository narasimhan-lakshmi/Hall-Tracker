
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Grid, CalendarDays } from 'lucide-react';

const departments = ['IT', 'CSE', 'ECE'];
const years = [1, 2, 3, 4];

const Home = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleYearSelect = (year: number) => {
    if (selectedDept) {
      navigate(`/department/${selectedDept}/${year}`);
    }
  };

  const renderMainMenu = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-button"
          onClick={() => setSelectedDept(null)}
        >
          <Grid className="w-6 h-6 mb-2" />
          Hall Allocation
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-button"
          onClick={() => navigate('/seat-arrangements')}
        >
          <CalendarDays className="w-6 h-6 mb-2" />
          Seat Arrangements
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-button"
          onClick={() => navigate('/map-tracking')}
        >
          <Map className="w-6 h-6 mb-2" />
          Map Tracking
        </motion.button>
      </div>
    </motion.div>
  );

  const renderDepartmentSelection = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-4 items-center"
    >
      <p className="text-lg mb-6 text-foreground/80">Select Department</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <motion.button
            key={dept}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="department-button"
            onClick={() => setSelectedDept(dept)}
          >
            {dept}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 text-sm text-foreground/60 hover:text-foreground"
        onClick={() => setSelectedDept(null)}
      >
        ← Back to Features
      </motion.button>
    </motion.div>
  );

  const renderYearSelection = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-4 items-center"
    >
      <p className="text-lg mb-6 text-foreground/80">Select Year</p>
      <div className="grid grid-cols-2 gap-4">
        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="year-button"
            onClick={() => handleYearSelect(year)}
          >
            Year {year}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 text-sm text-foreground/60 hover:text-foreground"
        onClick={() => setSelectedDept(null)}
      >
        ← Back to Departments
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        Exam Management System
      </motion.h1>

      {!selectedDept && renderMainMenu()}
      {selectedDept === null && renderDepartmentSelection()}
      {selectedDept && renderYearSelection()}
    </div>
  );
};

export default Home;
