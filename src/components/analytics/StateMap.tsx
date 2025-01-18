import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import indiaStates from '/india-states.json';

interface StateData {
  name: string;
  activeUsers: number;
  activeCompanions: number;
}

interface StateMapProps {
  stateData: { [state: string]: StateData };
  onSelectState: (state: StateData) => void;
}

const StateMap: React.FC<StateMapProps> = ({ stateData, onSelectState }) => {
  const [tooltipContent, setTooltipContent] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleGeographyClick = (feature: any) => {
    const stateName = feature.properties.name;
    const stateInfo = stateData[stateName];
    if (stateInfo) {
      setSelectedState(stateName);
      onSelectState(stateInfo);
    }
  };

  const handleGeographyHover = (geo: any, event: React.MouseEvent) => {
    const stateName = geo.properties.name;
    const stateInfo = stateData[stateName];
    if (stateInfo) {
      setTooltipContent({
        x: event.clientX,
        y: event.clientY,
        content: `${stateName}: Users: ${stateInfo.activeUsers}, Companions: ${stateInfo.activeCompanions}`,
      });
    }
  };

  const handleGeographyLeave = () => {
    setTooltipContent(null);
  };

  const getFillColor = (feature: any) => {
    const stateName = feature.properties.name;
    const stateInfo = stateData[stateName];
    if (selectedState === stateName) return '#4f46e5';
    if (stateInfo && stateInfo.activeUsers > 15) return '#4f46e5';
    if (stateInfo && stateInfo.activeUsers > 5) return '#6b7280';
    return '#d1d5db';
  };

  const totalUsers = Object.values(stateData).reduce(
    (sum, state) => sum + state.activeUsers,
    0
  );
  const totalCompanions = Object.values(stateData).reduce(
    (sum, state) => sum + state.activeCompanions,
    0
  );

  const selectedStateInfo = selectedState ? stateData[selectedState] : null;

  return (
    <div className="flex" style={{ width: '100%', height: '500px' }}>
      {/* Map Section */}
      <div className="relative" style={{ flex: 2, touchAction: 'none' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [80, 23],
            scale: 600,
          }}
          width={800}
          height={400}
        >
          <Geographies geography={indiaStates}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleGeographyClick(geo)}
                  onMouseEnter={(event) => handleGeographyHover(geo, event)}
                  onMouseLeave={handleGeographyLeave}
                  style={{
                    default: {
                      fill: getFillColor(geo),
                      stroke: '#fff',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#4f46e5',
                      stroke: '#fff',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#4f46e5',
                      stroke: '#fff',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
        {tooltipContent && (
          <div
            style={{
              position: 'absolute',
              left: tooltipContent.x,
              top: tooltipContent.y,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div className="bg-white border border-gray-200 rounded-md p-2 text-sm shadow-md">
              {tooltipContent.content}
            </div>
          </div>
        )}
      </div>

      {/* Analytics Section */}
      <div
  className="bg-gray-50 p-6 flex flex-col items-start shadow-lg rounded-lg"
  style={{
    flex: 1,
    borderLeft: '2px solid #e5e7eb',
    overflowY: 'auto',
  }}
>
  <h2 className="text-2xl font-extrabold text-gray-700 mb-6">
    📊 Total Active Clients 
  </h2>
  {selectedStateInfo ? (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-lg  p-4 flex items-center space-x-4">
        <div className="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm0 0c0 1.104.896 2 2 2s2-.896 2-2-.896-2-2-2-2 .896-2 2zm-6 8h12M6 19V9m12 10v-6M6 5h12"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedStateInfo.name}
          </h3>
          <p className="text-sm text-gray-500">
            Insights and performance of {selectedStateInfo.name}.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-indigo-50 rounded-lg p-4 shadow">
        <h4 className="text-indigo-800 font-bold text-lg">
          Active Users
        </h4>
        <span className="text-indigo-600 font-semibold text-2xl">
          {selectedStateInfo.activeUsers}
        </span>
      </div>
      <div className="flex justify-between items-center bg-green-50 rounded-lg p-4 shadow">
        <h4 className="text-green-800 font-bold text-lg">
          Active Companions
        </h4>
        <span className="text-green-600 font-semibold text-2xl">
          {selectedStateInfo.activeCompanions}
        </span>
      </div>
    </div>
  ) : (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
        <div className="text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM12 14c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zM6 19h12M6 9v10m12-10v6"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Overall Stats
          </h3>
          <p className="text-sm text-gray-500">
            Insights and metrics across all states.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-indigo-50 rounded-lg p-4 shadow">
        <h4 className="text-indigo-800 font-bold text-lg">
          Total Users
        </h4>
        <span className="text-indigo-600 font-semibold text-2xl">
          {totalUsers}
        </span>
      </div>
      <div className="flex justify-between items-center bg-green-50 rounded-lg p-4 shadow">
        <h4 className="text-green-800 font-bold text-lg">
          Total Companions
        </h4>
        <span className="text-green-600 font-semibold text-2xl">
          {totalCompanions}
        </span>
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export { StateMap };
