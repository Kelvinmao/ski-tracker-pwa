import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function TrackMap({ track, allTracks }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !track) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current).setView([track.coordinates[0][0], track.coordinates[0][1]], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    allTracks.forEach(t => {
      if (t.coordinates.length > 1) {
        const color = t.type === 'run' ? (t.id === track.id ? '#2563eb' : '#93c5fd') : '#9ca3af';
        const weight = t.id === track.id ? 4 : 2;
        
        L.polyline(t.coordinates, {
          color,
          weight,
          opacity: t.id === track.id ? 1 : 0.5
        }).addTo(map);
      }
    });

    if (track.coordinates.length > 0) {
      const bounds = L.latLngBounds(track.coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [track, allTracks]);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" />
      <div className="map-overlay">
        <h3>{track.name}</h3>
        <p className="track-type">
          {track.type === 'run' ? '🏂 Ski Run' : '🚡 Lift'}
        </p>
        {track.statistics && (
          <div className="quick-stats">
            <span>{(track.statistics.distance / 1000).toFixed(2)} km</span>
            <span>•</span>
            <span>{Math.floor(track.statistics.duration / 60)} min</span>
          </div>
        )}
      </div>
    </div>
  );
}