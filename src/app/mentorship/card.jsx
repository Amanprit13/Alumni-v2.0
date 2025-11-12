import Link from 'next/link';

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          {/* Placeholder for Mentor Image */}
          <div className="h-16 w-16 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
            {mentor.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-indigo-600 font-medium">
              {mentor.industry} ({mentor.gradYear})
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <Link href={`/mentors/${mentor.id}`}>
          <button className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold py-2 rounded-lg transition duration-150 bottom-0 ">
            View Profile & Connect
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;