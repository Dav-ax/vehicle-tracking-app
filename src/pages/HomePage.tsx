import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { vehicleService } from '../services/vehicleService';
import MapSection from '../components/MapSection';
import VehicleList from '../components/VehicleList';
import VehicleCard from '../components/VehicleCard';

interface HomePageProps {
  onError: (error: Error) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onError }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await vehicleService.getAllVehicles();
        setVehicles(data);
        if (data.length > 0) {
          setSelectedVehicle(data[0]);
        }
      } catch (error) {
        onError(error instanceof Error ? error : new Error('Error loading vehicles'));
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [onError]);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleMarkerClose = () => {
    // Keep the vehicle selected but close the info window
    // This is handled by the MapSection component
  };

  return (
    <div className="w-full h-screen bg-neutral-50">
      <div className="flex h-full gap-4 p-4">
        {/* Left Section - Map */}
        <div className="flex-1 min-w-0">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
            {selectedVehicle ? (
              <MapSection
                selectedVehicle={selectedVehicle}
                vehicles={vehicles}
                onVehicleSelect={handleVehicleSelect}
                onMarkerClose={handleMarkerClose}
              />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                <p className="text-neutral-600">Selecciona un vehículo para ver su ubicación</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Vehicle Selection & List */}
        <div className="w-96 flex flex-col gap-4 min-w-0">
          {/* Selected Vehicle Card */}
          {selectedVehicle && (
            <div className="flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-4 border-2 border-primary-600">
                <h3 className="text-sm font-semibold text-neutral-600 mb-3 uppercase tracking-wide">
                  Vehículo en seguimiento
                </h3>
                <div className="relative">
                  <VehicleCard
                    vehicle={selectedVehicle}
                    isSelected={true}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Vehicle List */}
          <div className="flex-1 min-h-0">
            <VehicleList
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              onVehicleSelect={handleVehicleSelect}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
