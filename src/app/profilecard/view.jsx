// /src/app/profilecard/view.jsx

// FIX: The path should be './page' because ProfileCard is exported from page.jsx 
// and they are in the same directory.
import ProfileCard from './page'; 

const ALUMNI_SPOTLIGHT_DATA = [
    { 
        id: 7, 
        name: "Amanprit Kaur", 
        title: "Head of AI Strategy", 
        company: "Tech Mahindra", 
        year: 2009, 
        location: "Mumbai, India", 
        industry: "Tech", 
        mentor: true, 
        avatar: "https://placehold.co/100x100/d97706/ffffff?text=AK" 
    },
    { 
        id: 8, 
        name: "Ravi Shankar", 
        title: "Venture Capital Partner", 
        company: "Nexus Ventures", 
        year: 1995, 
        location: "Bangalore, India", 
        industry: "Venture Capital", 
        mentor: true, 
        avatar: "https://placehold.co/100x100/10b981/ffffff?text=RS" 
    }
];

const AlumniSpotlightView = () => { // Renamed for clarity in the file
    return (
        <section className="py-12 bg-gray-50">
            <div className="p-10 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800">
                    Featured Alumni Spotlight
                </h2>
                <div className="space-y-6">
                    {ALUMNI_SPOTLIGHT_DATA.map((alumnus, index) => (
                        <ProfileCard 
                            key={alumnus.id} 
                            alumni={alumnus} 
                            delay={index * 150} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlumniSpotlightView;