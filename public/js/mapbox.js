import { showAlert } from './alerts';

const displayMap = (locations) => {
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    return;
  }

  if (!locations || locations.length === 0) {
    return;
  }

  // Check if Leaflet is available, if not wait for it
  const initializeMap = () => {
    if (typeof L === 'undefined') {
      setTimeout(initializeMap, 100);
      return;
    }

    try {
      const map = L.map('map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const group = new L.featureGroup();

      locations.forEach((loc) => {
        // Create marker with reversed coordinates [lat, lng] because GeoJSON uses [lng, lat]
        const marker = L.marker([loc.coordinates[1], loc.coordinates[0]]).addTo(
          map,
        );
        marker.bindPopup(
          `<p><strong>Day ${loc.day}:</strong> ${loc.description}</p>`,
          {
            maxWidth: 250,
          },
        );
        group.addLayer(marker);
      });

      if (group.getLayers().length > 0) {
        map.fitBounds(group.getBounds(), {
          padding: [100, 100],
        });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  initializeMap();
};

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    try {
      const locations = JSON.parse(mapElement.dataset.locations);
      displayMap(locations);
    } catch (error) {
      console.error('Error parsing locations:', error);
    }
  }
});

export { displayMap };
