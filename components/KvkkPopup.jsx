export default function KvkkPopup({ open, onClose, ...props }) {
  if (!open) return null;
  return (
    <div className="popup-bg">
      <div className="popup-content">
        <button onClick={onClose}>Kapat</button>
        <div>KVKK Popup</div>
      </div>
    </div>
  );
}
