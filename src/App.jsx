import React, { useState, useCallback } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import TrackList from './components/TrackList';
import TrackMap from './components/TrackMap';
import TrackStats from './components/TrackStats';
import { parseKML } from './utils/kmlParser';

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = useCallback(async (file) => {
    setIsLoading(true);
    try {
      const parsedTracks = await parseKML(file);
      setTracks(parsedTracks);
      if (parsedTracks.length > 0) {
        const firstRun = parsedTracks.find(t => t.type === 'run') || parsedTracks[0];
        setSelectedTrack(firstRun);
      }
    } catch (error) {
      console.error('Error parsing KML:', error);
      alert('Failed to parse KML file. Please make sure it\'s a valid file from Slopes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    setActiveTab('map');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎿 Ski Tracker</h1>
        <p>Analyze your skiing data from Slopes</p>
      </header>

      <main className="App-main">
        {tracks.length === 0 ? (
          <div className="empty-state">
            <FileUpload onFileUpload={handleFileUpload} />
            <div className="sample-download">
              <p>Or try with a sample file:</p>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  fetch('/sample.kmz')
                    .then(res => {
                      if (!res.ok) throw new Error('File not found');
                      return res.blob();
                    })
                    .then(blob => {
                      const file = new File([blob], 'sample.kmz', { type: 'application/vnd.google-earth.kmz' });
                      handleFileUpload(file);
                    })
                    .catch(err => {
                      console.error('Error loading sample:', err);
                      alert('Sample file not available. Please upload your own KML/KMZ file.');
                    });
                }}
              >
                Load Sample Data (KMZ)
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
              >
                📋 Tracks ({tracks.filter(t => t.type === 'run').length})
              </button>
              <button 
                className={`tab ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
                disabled={!selectedTrack}
              >
                🗺️ Map
              </button>
              <button 
                className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
                disabled={!selectedTrack}
              >
                📊 Stats
              </button>
            </div>

            {activeTab === 'list' && (
              <div className="tab-content">
                <div className="action-bar">
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
                <TrackList 
                  tracks={tracks} 
                  selectedTrack={selectedTrack}
                  onTrackSelect={handleTrackSelect}
                />
              </div>
            )}

            {activeTab === 'map' && selectedTrack && (
              <div className="tab-content">
                <TrackMap track={selectedTrack} allTracks={tracks} />
              </div>
            )}

            {activeTab === 'stats' && selectedTrack && (
              <div className="tab-content">
                <TrackStats track={selectedTrack} />
              </div>
            )}
          </>
        )}
      </main>

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default App;
