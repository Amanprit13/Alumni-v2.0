export default function RecommendedSection({ data }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 my-8">

      <div>
        <h3 className="font-bold mb-2">Recommended Mentors</h3>
        {data.recommendedMentors.map(m => <p key={m.id}>{m.name}</p>)}
      </div>

      <div>
        <h3 className="font-bold mb-2">Recommended Jobs</h3>
        {data.recommendedJobs.map(j => <p key={j.id}>{j.title}</p>)}
      </div>

      <div>
        <h3 className="font-bold mb-2">Recommended Events</h3>
        {data.recommendedEvents.map(e => <p key={e.id}>{e.title}</p>)}
      </div>

    </div>
  );
}
