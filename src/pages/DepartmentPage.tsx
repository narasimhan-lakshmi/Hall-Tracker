
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DepartmentPage = () => {
  const { department, year } = useParams();
  const navigate = useNavigate();

  // This is where we'll fetch data from Supabase later
  const mockData = {
    hall: 'Main Block',
    roomNumber: 'MB-301',
    students: ['20IT001', '20IT002', '20IT003', '20IT004', '20IT005']
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-6 left-6 text-sm text-foreground/60 hover:text-foreground"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full mt-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          {department} Department
        </h1>
        <p className="text-lg text-foreground/80 mb-8 text-center">
          Year {year} Exam Hall Allocation
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Hall Details</h3>
              <p className="text-foreground/80">Hall: {mockData.hall}</p>
              <p className="text-foreground/80">Room: {mockData.roomNumber}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Allocated Students</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockData.students.map((student) => (
                  <p key={student} className="text-foreground/80">
                    {student}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DepartmentPage;
