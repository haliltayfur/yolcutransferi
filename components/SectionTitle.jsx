// components/SectionTitle.jsx
export default function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gold text-center drop-shadow">
      {children}
    </h2>
  );
}
