
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const cafeterias = [
  {
    id: 1,
    name: 'Hut Cafeteria',
    capacity: 100,
    currentOccupancy: 95,
    location: 'Near IT Block',
    alternativeSuggestion: 'REC Café'
  },
  {
    id: 2,
    name: 'REC Café',
    capacity: 80,
    currentOccupancy: 45,
    location: 'Near Civil Block',
    alternativeSuggestion: 'Juice Point'
  },
  {
    id: 3,
    name: 'Juice Point',
    capacity: 50,
    currentOccupancy: 20,
    location: 'Near MBA Block',
    alternativeSuggestion: 'Hut Cafeteria'
  }
];

const SeatArrangements = () => {
  const navigate = useNavigate();
  const [selectedCafeteria, setSelectedCafeteria] = useState<typeof cafeterias[0] | null>(null);

  const getOccupancyColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-500';
    if (percentage > 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getOccupancyText = (cafeteria: typeof cafeterias[0]) => {
    const percentage = (cafeteria.currentOccupancy / cafeteria.capacity) * 100;
    if (percentage > 90) return 'Almost Full';
    if (percentage > 70) return 'Moderately Busy';
    return 'Available';
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-background to-background/90">
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Smart Cafeteria Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cafeterias.map((cafeteria) => (
            <motion.button
              key={cafeteria.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCafeteria(cafeteria)}
              className="glass-card p-6 rounded-xl flex flex-col items-center gap-4 hover:bg-white/5 transition-colors"
            >
              <Coffee className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">{cafeteria.name}</h3>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className={getOccupancyColor((cafeteria.currentOccupancy / cafeteria.capacity) * 100)}>
                  {getOccupancyText(cafeteria)}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{cafeteria.location}</p>
            </motion.button>
          ))}
        </div>

        {selectedCafeteria && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-xl mt-8"
          >
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold">{selectedCafeteria.name} Status</h2>
              
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg">
                  Current Occupancy: {selectedCafeteria.currentOccupancy} / {selectedCafeteria.capacity}
                </p>
                <div className="w-64 h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: `${(selectedCafeteria.currentOccupancy / selectedCafeteria.capacity) * 100}%`
                    }}
                  />
                </div>
              </div>

              {selectedCafeteria.currentOccupancy / selectedCafeteria.capacity > 0.9 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4 text-primary"
                >
                  <p className="text-lg">Suggested Alternative:</p>
                  <ArrowRight className="w-5 h-5" />
                  <p className="text-lg font-semibold">{selectedCafeteria.alternativeSuggestion}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SeatArrangements;
