
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation2 } from 'lucide-react';
import { useState } from 'react';

const locations = [
  { id: 1, name: 'MBA Block', directions: ['Exit main gate', 'Turn right', 'Walk 200m', 'MBA Block on your left'] },
  { id: 2, name: 'IT Block', directions: ['Exit main gate', 'Turn left', 'Walk 150m', 'IT Block on your right'] },
  { id: 3, name: 'Civil Block', directions: ['From main gate', 'Go straight', 'Walk 300m', 'Civil Block ahead'] },
  { id: 4, name: 'Mechanical Block', directions: ['From main gate', 'Go straight', 'Turn right at junction', 'Walk 200m'] },
  { id: 5, name: 'R&D Block', directions: ['Exit main gate', 'Turn right', 'Walk 400m', 'R&D Block on right'] },
  { id: 6, name: 'Auditorium', directions: ['From main gate', 'Turn left', 'Walk 250m', 'Auditorium on left'] },
];

const MapTracking = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

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
          Smart Maps & Navigation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {locations.map((location) => (
            <motion.button
              key={location.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLocation(location)}
              className="glass-card p-6 rounded-xl flex flex-col items-center gap-4 hover:bg-white/5 transition-colors"
            >
              <MapPin className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">{location.name}</h3>
              <p className="text-sm text-foreground/60">Click for directions</p>
            </motion.button>
          ))}
        </div>

        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-xl mt-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Navigation2 className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold">Directions to {selectedLocation.name}</h2>
            </div>
            <ol className="list-decimal list-inside space-y-4">
              {selectedLocation.directions.map((direction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg text-foreground/80"
                >
                  {direction}
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MapTracking;
