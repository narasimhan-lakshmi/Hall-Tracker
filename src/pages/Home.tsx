
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        Exam Hall Allocation
      </motion.h1>

      {!selectedDept ? (
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
        </motion.div>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
