// /data/scholarshipsData.js

export const scholarships = [
  {
    id: 1,
    name: "Alumni Legacy Scholarship",
    amount: "₹1,00,000",
    type: "Merit-Based",
    field: "All Fields",
    deadline: "October 30, 2025",
    description: "Awarded to students with outstanding academic records who demonstrate leadership potential and a commitment to their community."
  },
  {
    id: 2,
    name: "Future Innovators Fund",
    amount: "₹75,000",
    type: "Merit-Based",
    field: "STEM",
    deadline: "November 15, 2025",
    description: "Supports students pursuing degrees in Science, Technology, Engineering, or Mathematics who have a passion for innovation."
  },
  {
    id: 3,
    name: "Community Service Grant",
    amount: "₹50,000",
    type: "Need-Based",
    field: "Social Sciences",
    deadline: "October 20, 2025",
    description: "A grant for students actively involved in community service and volunteer work, demonstrating a strong sense of social responsibility."
  },
  {
    id: 4,
    name: "Arts & Culture Scholarship",
    amount: "₹60,000",
    type: "Merit-Based",
    field: "Arts & Humanities",
    deadline: "November 1, 2025",
    description: "For creative students in arts, music, and humanities fields who show exceptional talent and dedication."
  },
  {
    id: 5,
    name: "Entrepreneurship Fund",
    amount: "₹90,000",
    type: "Merit-Based",
    field: "Business",
    deadline: "December 5, 2025",
    description: "This scholarship supports aspiring entrepreneurs with a clear business vision and an innovative spirit."
  },
];

export const testimonials = [
  {
    id: 1,
    quote: "This scholarship was a game-changer. It allowed me to pursue my passion for biomedical engineering without the constant worry of tuition fees.",
    author: "Alex R., Current Student",
    field: "Biomedical Engineering"
  },
  {
    id: 2,
    quote: "The alumni support is incredible. I'm so grateful for the opportunity to achieve my academic goals thanks to this program.",
    author: "Maya S., Scholarship Recipient",
    field: "Computer Science"
  },
  {
    id: 3,
    quote: "Contributing to the scholarship fund has been one of the most rewarding experiences of my life. It's a direct way to give back and support the next generation.",
    author: "Dr. Ananya P., Alumni Donor",
    field: "Alumni"
  }
];

export const donorSpotlight = {
  name: "Dr. Rahul Sharma",
  bio: "Dr. Sharma, a proud alumnus from the class of '95, is a leading cardiologist and a passionate advocate for education. He has single-handedly funded five full scholarships, transforming the lives of aspiring medical students.",
  image: "https://images.unsplash.com/photo-1552058544-a022b78144b6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  quote: "I believe that every student, regardless of their financial background, deserves the chance to pursue their dreams. It's an honor to give back to the institution that gave me so much."
}

export const donationCampaign = {
  goal: 5000000, // ₹50 Lakh
  raised: 3750000, // Example raised amount
  tiers: [
    { amount: 5000, description: "One-year of textbooks for a student" },
    { amount: 15000, description: "A month's living expenses for a student" },
    { amount: 50000, description: "One semester's tuition" },
    { amount: 100000, description: "A full scholarship for one student" }
  ]
};