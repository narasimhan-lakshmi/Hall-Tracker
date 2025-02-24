
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const DepartmentPage = () => {
  const { department, year } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [examData, setExamData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchExamDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('exam_halls')
        .select('*')
        .eq('dept', department)
        .eq('year', parseInt(year || '0'));

      if (error) throw error;

      if (data && data.length > 0) {
        setExamData(data);
      } else {
        setExamData([]);
      }
      setDataFetched(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch exam details"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderExamData = () => {
    if (!dataFetched) {
      return (
        <div className="text-center text-foreground/80">
          Click "Fetch Details" to view exam hall allocation
        </div>
      );
    }

    if (department === 'IT' && year === '3') {
      return (
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">Admin Block Allocations</h3>
          <div className="grid gap-6">
            {examData.map((hall) => (
              <div key={hall.room_number} className="border border-white/10 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-2">Room {hall.room_number}</h4>
                <div className="grid grid-cols-6 gap-2">
                  {hall.students?.map((student: string) => (
                    <span key={student} className="text-sm text-foreground/80">
                      {student}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center text-xl text-foreground/80">
        Exams Not Scheduled
      </div>
    );
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
        className="max-w-6xl w-full mt-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          {department} Department
        </h1>
        <p className="text-lg text-foreground/80 mb-8 text-center">
          Year {year} Exam Hall Allocation
        </p>

        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="department-button"
            onClick={fetchExamDetails}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Details"}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderExamData()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DepartmentPage;
