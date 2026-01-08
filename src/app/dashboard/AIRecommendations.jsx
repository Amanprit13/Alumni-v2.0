export default function AIRecommendations({ data }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">AI-Powered Recommendations</h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-5 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">Suggested Mentors</h3>
          {data.mentors.map(m => (
            <p key={m.id}>{m.name} – {m.role}</p>
          ))}
        </div>

        <div className="p-5 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">Recommended Jobs</h3>
          {data.jobs.map(j => (
            <p key={j.id}>{j.title} @ {j.company}</p>
          ))}
        </div>

        <div className="p-5 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">Upcoming Events</h3>
          {data.events.map(e => (
            <p key={e.id}>{e.title}</p>
          ))}
        </div>

      </div>
    </section>
  );
}
