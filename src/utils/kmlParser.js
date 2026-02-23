export function parseKML(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(e.target.result, 'text/xml');
        const tracks = [];

        const placemarks = xmlDoc.getElementsByTagName('Placemark');
        
        for (let i = 0; i < placemarks.length; i++) {
          const placemark = placemarks[i];
          const name = placemark.getElementsByTagName('name')[0]?.textContent;
          const styleUrl = placemark.getElementsByTagName('styleUrl')[0]?.textContent;
          
          if (!name) continue;
          
          const type = styleUrl?.includes('LiftLine') ? 'lift' : 'run';
          
          const coords = [];
          const timestamps = [];
          const coordElements = placemark.getElementsByTagName('gx:coord');
          const whenElements = placemark.getElementsByTagName('when');
          
          for (let j = 0; j < coordElements.length; j++) {
            const coordText = coordElements[j].textContent.trim();
            const [lon, lat] = coordText.split(' ').map(Number);
            
            if (!isNaN(lon) && !isNaN(lat)) {
              coords.push([lat, lon]);
              
              if (whenElements[j]) {
                const timeText = whenElements[j].textContent.trim();
                const date = new Date(timeText);
                if (!isNaN(date.getTime())) {
                  timestamps.push(date);
                }
              }
            }
          }
          
          if (coords.length > 0) {
            const distance = calculateDistance(coords);
            const duration = timestamps.length > 1 ? 
              (timestamps[timestamps.length - 1] - timestamps[0]) / 1000 : 0;
            
            const speeds = calculateSpeeds(coords, timestamps);
            const avgSpeed = speeds.length > 0 ? 
              speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
            const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;
            
            tracks.push({
              id: i,
              name,
              type,
              coordinates: coords,
              timestamps,
              statistics: type === 'run' ? {
                distance,
                duration,
                avgSpeed,
                maxSpeed,
                dataPoints: coords.length
              } : null
            });
          }
        }
        
        resolve(tracks);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function calculateDistance(coords) {
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    total += haversineDistance(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1]);
  }
  return total;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateSpeeds(coords, timestamps) {
  const speeds = [];
  for (let i = 0; i < coords.length - 1 && i < timestamps.length - 1; i++) {
    const dist = haversineDistance(
      coords[i][0], coords[i][1],
      coords[i + 1][0], coords[i + 1][1]
    );
    const time = (timestamps[i + 1] - timestamps[i]) / 1000;
    if (time > 0) {
      speeds.push(dist / time);
    }
  }
  return speeds;
}