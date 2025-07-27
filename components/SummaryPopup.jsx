export default function SummaryPopup({ visible, onClose, ...props }) {
  if (!visible) return null;
  return (
    <div className="popup-bg">
      <div className="popup-content">
        <button onClick={onClose}>Kapat</button>
        <div>Sipariş Özeti Popup</div>
      </div>
    </div>
  );
}
