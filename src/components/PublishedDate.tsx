interface PublishedDateProps {
  date: string;
}

export default function PublishedDate({ date }: PublishedDateProps) {
  return (
    <time 
      className="link-mono" 
      style={{ color: 'var(--color-text-lighter)' }} 
      dateTime={date}
    >
      Published {new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
  );
}
