import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, Users, ArrowRight, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

const WEBCAM_URL = "http://192.168.75.70:8080/video";
const PEOPLE_LIMIT = 10;

const cafeterias = [
  {
    id: 1,
    name: 'Hut Cafeteria',
    capacity: PEOPLE_LIMIT,
    currentOccupancy: 0,
    location: 'Near IT Block',
    alternativeSuggestion: 'REC Café',
    hasLiveStream: true
  },
  {
    id: 2,
    name: 'REC Café',
    capacity: 80,
    currentOccupancy: 45,
    location: 'Near Civil Block',
    alternativeSuggestion: 'Juice Point',
    hasLiveStream: false
  },
  {
    id: 3,
    name: 'Juice Point',
    capacity: 50,
    currentOccupancy: 20,
    location: 'Near MBA Block',
    alternativeSuggestion: 'Hut Cafeteria',
    hasLiveStream: false
  }
];

const SeatArrangements = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCafeteria, setSelectedCafeteria] = useState<typeof cafeterias[0] | null>(null);
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCafeteria?.hasLiveStream) {
      const interval = setInterval(() => {
        fetch("http://192.168.75.70:8080/get_people_count")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setPeopleCount(data.count);
            setIsLimitExceeded(data.count > PEOPLE_LIMIT);
            setStreamError(false);
            
            const updatedCafeterias = cafeterias.map(cafe => {
              if (cafe.id === 1) {
                return { ...cafe, currentOccupancy: data.count };
              }
              return cafe;
            });
            // Update cafeterias with new data
          })
          .catch(error => {
            console.error("Error fetching count:", error);
            setStreamError(true);
            toast({
              variant: "destructive",
              title: "Connection Error",
              description: "Unable to connect to the camera feed. Please try again later."
            });
          });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [selectedCafeteria, toast]);

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
    <div className="min-h-screen flex flex-col items-center p-6 bg-black">
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
          Smart Cafeteria Management
        </h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <span className="text-lg text-primary animate-flow inline-block">
            Stay updated with live people count at Hut Cafe 🔥
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cafeterias.map((cafeteria) => (
            <motion.button
              key={cafeteria.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCafeteria(cafeteria)}
              className="glass-card p-6 rounded-xl flex flex-col items-center gap-4 hover:bg-white/5 transition-colors"
            >
              <Coffee className="w-8 h-8 text-primary icon-3d" />
              <h3 className="text-xl font-semibold">{cafeteria.name}</h3>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className={getOccupancyColor((cafeteria.currentOccupancy / cafeteria.capacity) * 100)}>
                  {getOccupancyText(cafeteria)}
                </span>
              </div>
              {cafeteria.hasLiveStream && (
                <div className="flex items-center gap-2 text-primary">
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Live Feed Available</span>
                </div>
              )}
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
              
              {selectedCafeteria.hasLiveStream && (
                <div className="video-box w-full max-w-2xl mx-auto">
                  {!streamError ? (
                    <>
                      <img
                        src={WEBCAM_URL}
                        alt="Live Feed"
                        className="w-full rounded-lg border-2 border-primary shadow-lg shadow-primary/20"
                        onError={() => setStreamError(true)}
                      />
                      <div className="mt-4 text-xl">
                        People Count: <span className="text-primary font-bold">{peopleCount}</span>
                      </div>
                      {isLimitExceeded && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-red-500 font-bold mt-2"
                        >
                          Hut Cafe is full! Look for another location.
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <div className="p-8 text-red-500 text-center">
                      Unable to connect to camera feed. Please try again later.
                    </div>
                  )}
                </div>
              )}

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
