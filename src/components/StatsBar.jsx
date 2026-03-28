import ProgressBar from './ProgressBar';

export default function StatsBar({ hero }) {
  return (
    <div className="card stats-header" style={{ padding: '15px', background: '#1a1a1a', borderRadius: '12px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <ProgressBar label="❤️ HP" value={hero.hp} max={100} color="#ff4444" />
        <ProgressBar label="✨ XP" value={hero.xp % 200} max={200} color="#00ff00" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', color: '#ffd700' }}>
        <span>💰 {hero.gold} Gold</span>
        <span>📊 Level {hero.lvl}</span>
      </div>
    </div>
  );
}