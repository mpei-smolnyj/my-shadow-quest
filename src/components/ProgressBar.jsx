 export default function ProgressBar({ label, value, max, color }) {
  const percentage = (value / max) * 100;
  return (
    <div style={styles.container}>
      <div style={styles.labelRow}>
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div style={styles.track}>
        <div style={{
          ...styles.fill,
          width: ${percentage}%,
          backgroundColor: color,
          boxShadow: 0 0 10px ${color} // Эффект свечения
        }} />
      </div>
    </div>
  );
}

const styles = {
  container: { marginBottom: '10px', flex: 1, padding: '0 5px' },
  labelRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' },
  track: { height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' },
  fill: { height: '100%', transition: 'width 0.3s ease-in-out' }
};