
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MapTracking = () => {
  const navigate = useNavigate();

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
          Map Tracking
        </h1>
        {/* Add your existing Map Tracking code here */}
      </motion.div>
    </div>
  );
};

export default MapTracking;
