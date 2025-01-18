// import React, { useState } from 'react';
//     import { MapContainer, TileLayer, GeoJSON, Tooltip, useMap } from 'react-leaflet';
//     import 'leaflet/dist/leaflet.css';
//     import { Card, CardContent } from '@/components/ui/card';
//     import indiaStates from '/india-states.json';

//     interface MapChartProps {
//       stateData: {
//         [state: string]: {
//           name: string;
//           activeUsers: number;
//           activeCompanions: number;
//         };
//       };
//       onSelectState: (state: any) => void;
//     }

//     export function MapChart({ stateData, onSelectState }: MapChartProps) {
//       const [tooltipContent, setTooltipContent] = useState<{
//         x: number;
//         y: number;
//         content: string;
//       } | null>(null);
//       const [selectedState, setSelectedState] = useState<string | null>(null);

//       const handleGeographyClick = (feature: any) => {
//         const stateName = feature.properties.name;
//         const stateInfo = stateData[stateName];
//         if (stateInfo) {
//           setSelectedState(stateName);
//           onSelectState(stateInfo);
//         }
//       };

//       const handleGeographyHover = (geo: any, event: React.MouseEvent) => {
//         const stateName = geo.properties.name;
//         const stateInfo = stateData[stateName];
//         if (stateInfo) {
//           setTooltipContent({
//             x: event.clientX,
//             y: event.clientY,
//             content: `${stateName}: Users: ${stateInfo.activeUsers}, Companions: ${stateInfo.activeCompanions}`,
//           });
//         }
//       };

//       const handleGeographyLeave = () => {
//         setTooltipContent(null);
//       };

//       const getFillColor = (feature: any) => {
//         const stateName = feature.properties.name;
//         const stateInfo = stateData[stateName];
//         if (selectedState === stateName) return '#4f46e5';
//         if (stateInfo && stateInfo.activeUsers > 15) return '#4f46e5';
//         if (stateInfo && stateInfo.activeUsers > 5) return '#6b7280';
//         return '#d1d5db';
//       };

//       const onEachFeature = (feature: any, layer: any) => {
//         layer.on({
//           click: () => handleGeographyClick(feature),
//           mouseover: (event: any) => {
//             const stateName = feature.properties.name;
//             const stateInfo = stateData[stateName];
//             if (stateInfo) {
//               layer.bindTooltip(`${stateName}: Users: ${stateInfo.activeUsers}, Companions: ${stateInfo.activeCompanions}`).openTooltip(event.latlng);
//             }
//           },
//           mouseout: () => layer.closeTooltip(),
//         });
//       };

//       return (
//         <div className="relative">
//           <MapContainer
//             center={[23, 80]}
//             zoom={4}
//             style={{ height: '400px', width: '100%' }}
//             scrollWheelZoom={false}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <GeoJSON
//               data={indiaStates}
//               style={(feature) => ({
//                 fillColor: getFillColor(feature),
//                 weight: 1,
//                 color: '#fff',
//                 fillOpacity: 1,
//               })}
//               onEachFeature={onEachFeature}
//             />
//           </MapContainer>
//           {tooltipContent && (
//             <div
//               style={{
//                 position: 'absolute',
//                 left: tooltipContent.x,
//                 top: tooltipContent.y,
//                 transform: 'translate(-50%, -100%)',
//                 pointerEvents: 'none',
//                 zIndex: 10,
//               }}
//             >
//               <div className="bg-white border border-gray-200 rounded-md p-2 text-sm shadow-md">
//                 {tooltipContent.content}
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     }
