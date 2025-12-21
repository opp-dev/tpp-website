import ManifestoCard from '@/components/ManifestoCard';

export default function ManifestoPage() {
  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="pt-32 pb-16">
        <div style={{ maxWidth: '720px' }}>
          <div className="pb-16" >
            <p style={{ fontWeight: '600', maxWidth: '500px' }}>
              These are the three main principles that I live by in my professional and personal life. They help me a lot to orient and conduct myself. Maybe they help you too!
            </p>

          </div>
          <div className="pb-8" >
            <ManifestoCard
              title="Be On Time"
              content="That actually means a being there a few minutes earlier. This gives me the opportunity to arrive, settle into the situation and collect my thoughts. By doing this I am giving serendiptiy a chance."
            />
          </div>

          <div className="border-t border-gray-200 pt-8 pb-8">
            <ManifestoCard
              title="Know Whats Going On"
              content="Just gathering a little context of what is the situation I am walking into. Who is there, what are their needs, where was the last thread of the conversation. Just general stuff."
            />
          </div>

          <div className="border-t border-gray-200 pt-8">
            <ManifestoCard
              title="Have Some Ideas"
              content="Bring some ideas to the table, take some initiative, listen, respond."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
