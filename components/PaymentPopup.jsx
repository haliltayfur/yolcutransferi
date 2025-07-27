export default function PaymentPopup({ open, onClose, ...props }) {
  if (!open) return null;
  return (
    <div className="popup-bg">
      <div className="popup-content">
        <button onClick={onClose}>Kapat</button>
        <div>Ödeme Popup</div>
      </div>
    </div>
  );
}
