export default function TesekkurPopup({ open, onClose, ...props }) {
  if (!open) return null;
  return (
    <div className="popup-bg">
      <div className="popup-content">
        <button onClick={onClose}>Kapat</button>
        <div>Teşekkürler Popup</div>
      </div>
    </div>
  );
}
