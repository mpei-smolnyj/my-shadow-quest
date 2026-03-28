// src/components/StatsBar.jsx
import ProgressBar from './ProgressBar';

export default function StatsBar({ hero, heroAvatar }) {
  return (
    <div className="card stats-header-rpg">
      
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="avatar-side">
        <div className="avatar-container">
          <img 
            src={heroAvatar} 
            alt="Hero Avatar" 
            className="hero-avatar" 
          />
        </div>
        <div className="rpg-level-badge">
          LVL {hero.lvl}
        </div>
      </div>
      
      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="stats-bars-container">
        <ProgressBar label="❤️ HP" value={hero.hp} max={100} color="#ff4444" />
        <ProgressBar label="✨ XP" value={hero.xp % 200} max={200} color="#00ff00" />
        <div className="gold-stat">💰 {hero.gold} Gold</div>
      </div>

    </div>
  );
}