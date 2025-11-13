interface ManifestoCardProps {
  title: string;
  content: string;
}

export default function ManifestoCard({ title, content }: ManifestoCardProps) {
  return (
    <div style={{ width: '580px' }}>
      <h3 className="typography-h3">{title}</h3>
      <div style={{ marginTop: '24px' }}>
        <p className="text-lg leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
