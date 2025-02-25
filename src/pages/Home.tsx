
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Grid, Coffee } from 'lucide-react';

const departments = ['IT', 'CSE', 'ECE'];
const years = [1, 2, 3, 4];

const Home = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [showDepartments, setShowDepartments] = useState(false);
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
          onClick={() => setShowDepartments(true)}
        >
          <Grid className="w-8 h-8 mb-2 icon-3d text-primary" />
          Hall Allocation
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-button"
          onClick={() => navigate('/seat-arrangements')}
        >
          <Coffee className="w-8 h-8 mb-2 icon-3d text-primary" />
          Smart Cafeteria
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-button"
          onClick={() => navigate('/map-tracking')}
        >
          <Map className="w-8 h-8 mb-2 icon-3d text-primary" />
          Smart Navigation
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
      <p className="text-lg mb-6 text-gradient">Select Department</p>
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
        className="mt-8 text-sm text-gradient hover:opacity-80"
        onClick={() => setShowDepartments(false)}
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
      <p className="text-lg mb-6 text-gradient">Select Year</p>
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
        className="mt-8 text-sm text-gradient hover:opacity-80"
        onClick={() => setSelectedDept(null)}
      >
        ← Back to Departments
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient"
      >
        REC Tracker
      </motion.h1>

      {!showDepartments && !selectedDept && renderMainMenu()}
      {showDepartments && !selectedDept && renderDepartmentSelection()}
      {selectedDept && renderYearSelection()}
    </div>
  );
};

export default Home;
