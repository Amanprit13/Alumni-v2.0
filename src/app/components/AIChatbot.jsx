import React, { useState, useRef, useEffect, useCallback } from 'react';

// === ICON SVGS (Defined at the top to prevent "is not defined" errors) ===
const SendIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
);

const XIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18" /><path d="M6 6l12 12" />
    </svg>
);

const MessageCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);

// ---

// === LOCAL KNOWLEDGE BASE (Includes the new Student Union/Building keywords) ===
const KNOWLEDGE_BASE = [

    // 0. --- IDEA/SUGGESTION FALLBACK ---
    {
        keywords: ["suggest me", "unique start up", "new idea", "deep question", "created", "complex", "knowledge", "recommend me", "tell me about", "unusual"],
        response: "That's a **fantastic, deep question**! Since I'm a simple bot, I can't generate new ideas, but I can share some of the most unique startups *already created* in the world:\n\n1.  **Potato Parcel:** An e-commerce service that sends personalized messages written on potatoes by mail. 🥔\n2.  **Dogue:** A restaurant in San Francisco that offers a $75 tasting menu and 'pawtisserie' exclusively for dogs. 🐕‍🦺\n3.  **Hire Goats:** A company that rents out goats for eco-friendly, natural lawn care and brush removal. 🐐\n4.  **Phool:** An Indian startup that recycles temple flower waste to create sustainable incense sticks and biodegradable products.\n\nIf u want to discuss deep ideas like this, u should use the **Global Directory** to find an alumnus who's an expert in your field, or check the **Mentorship Network** for advice on novel concepts!"
    },

    // 1. --- ALUMNI GROUPS, CHAPTERS, AND NETWORKS ---
    {
        keywords: ["groups", "alumni group", "chapters", "network", "club", "interest", "football", "cricket", "sports", "local chapter", "city chapter", "badminton", "basketball", "athletics", "hobbies", "games", "gaming"],
        response: "Ya, we got a ton of different **Alumni Groups and Chapters**! You can join groups based on your **city** (like the Delhi Chapter), your **class year** (like the Class of 2015), or a **special interest** like our Alumni Football Club, Cricket League, or Women in Tech Network. Check the **Groups Page** for all the local and interest-based clubs!"
    },

    // 2. --- STARTUP & INNOVATION DATA (Funding) ---
    {
        keywords: ["startup", "innovation", "seed fund", "funding", "pitch competition", "alumni founders", "what is startup", "who is startup", "strat up", "start up", "fund", "apply"],
        response: "A **Startup** is a new company, usually alumni-led, that uses our **Startup Hub** resources. Ya, we got a **Startup Hub**! U can **Apply for Funding** thru our special **Alumni Seed Fund** an' Pitch Competition. Go get that cash!"
    },
    {
        keywords: ["investor network", "investor", "angel investor", "mentor network", "startup mentor"],
        response: "The **Mentor & Investor Network** links u up with successful alumni. They're like ur personal guides for starting stuff."
    },
    {
        keywords: ["startup talent", "resources for founders", "startup job board", "legal templates"],
        response: "Founders can find good alumni to hire on the **Job Board** and get other stuff like legal doc **templates** and software deals."
    },

    // 5. --- SCHOLARSHIP DATA ---
    {
        keywords: ["scholarship", "scholarship program", "financial aid", "student support", "apply for scholarship", "scholarshp"],
        response: "Our **Alumni Scholarship Program** is big! It's helped **100+ students** with over **₹50 Lakh+**. Look for scholarships by **What U Need** or **What U Study**."
    },
    {
        keywords: ["scholarship eligibility", "who can apply", "required documents", "application deadline", "rules"],
        response: "If ur a full-time student, u can apply. U'll need ur **grades**, **rec' letters**, and a **short story about urself**."
    },

    // 7. --- DONATION DATA (Financial vs. Items) ---
    {
        keywords: ["donate", "donation", "donated items", "get items", "receive items", "how to get", "receive donation", "collection drive", "donated goods", "get donated", "books", "clothes"],
        response: "There are two kinds of donation! For **Financial Support** (like the Scholarship Fund), u can chip in small amounts like **₹5000** or more. For **Donated Items** (like books or clothes), u can get them at our **Bi-Annual Collection Drive** events. We set up collection points for alumni and students to both donate and receive goods. Check the **Events Calendar** for the next date!"
    },

    // 8. --- NEWS & ANNOUNCEMENTS DATA (Events) ---
    {
        keywords: ["news", "announcements", "events", "reunion", "gala", "webinar", "calendar", "upcoming events"],
        response: "**Upcoming highlights** include the **Annual Alumni Gala** (October 15), a **Career Workshop: Scaling Startups** (November 5), and the **Class of 2010 Reunion** (December 1). We have over 50 events planned; check the full calendar for more details."
    },

    // 9. --- MENTORSHIP DATA ---
    {
        keywords: ["mentorship", "find a mentor", "sign up to mentor", "mentorship guidelines"],
        response: "The **Mentorship Network** is where u can find a good guide. U can **filter** 'em by their job and what they're good at, or **u can sign up to teach others**!"
    },

    // 10. --- LEARNING & RESOURCES DATA ---
    {
        keywords: ["lifelong learning", "resources", "career development", "webinars", "toolkit", "library access"],
        response: "We got a ton of stuff: **150+ videos**, a **Career Help Guide**, and cheap **Library Access** so u can keep learning."
    },

    // 11. --- JOB BOARD DATA ---
    {
        keywords: ["job board", "career", "job postings", "hiring", "job opportunities"],
        response: "The **Job Board** has both **Alumni Jobs** and other cool job listings. U can search, save, and even **tell a friend** about a job!"
    },

    // 12. --- GAMES CHALLENGE DATA ---
    {
        keywords: ["games", "quiz", "sudoku", "challenge arena"],
        response: "Try the **Cognitive Challenge Arena** for games like **Sudoku** and the **World Quiz**. Check the **leaderboard** to see who's best!"
    },

    // 13. --- DIRECTORY/ALUMNI PROFILES (General) ---
    {
        keywords: ["alumni directory", "search alumni", "connect with alumni", "find people", "network size", "alumni count"],
        response: "The **Global Directory** has **12,500 people**! U can search for alumni by where they live, what they do, and when they graduated."
    },

    // 14. --- FACULTY/STAFF SEARCH ---
    {
        keywords: ["professor", "faculty", "staff", "teacher", "teaching", "department", "lecturer", "find a person", "search for"],
        response: "Looking for a **Professor** or **Faculty** member? U can use the **Global Directory** to search for them by name or department. If they are listed, their current status or a way to connect will be there. U can also look in the **Mentorship Network** if u want to reach out to an old **teacher** for advice!"
    },

    // 15. --- CONTACT INFORMATION ---
    {
        keywords: ["email address", "contact", "send email", "general contact"],
        response: "Want to talk? Our main email is **hello@example.com**. Send us a note!"
    },

    // 16. --- ARCHIVES & HISTORY DATA (Yearbook, Infrastructure) ---
    {
        keywords: ["yearbook", "archive", "old photos", "history", "class photos", "1998", "digital archive", "find old", "old documents", "student union", "building", "opened", "inauguration", "new building"],
        response: "Historical questions about building openings (like the **Student Union**), key dates, or old campus records can be found in the **Digital Archive** section. U can search the archives by date or project name to find announcements and details about the opening."
    },

    // --- GENERAL CHAT DATA (Starts at Index 17) ---

    // 17. --- GENERAL CHAT DATA (Greeting) ---
    {
        keywords: ["hi", "hello", "hey", "sup", "greetings", "how are you", "how r u", "how u doin"],
        response: "Hey there! I'm just a simple bot, but I'm ready to **help** u find stuff about the Alumni network. What can I do for ya?"
    },
    // 18. --- GENERAL CHAT DATA (Identity) ---
    {
        keywords: ["who are you", "what are you", "ur name", "who r u", "ur job", "what is this"],
        response: "I'm the **AlumniConnect AI**, the simple helper bot! I know everything on the website 'bout the funding, events, and people."
    },
    // 19. --- GENERAL CHAT DATA (Thanks) ---
    {
        keywords: ["thank you", "thanks", "thx", "good job", "awesome", "u r the best", "cheers", "ok", "okay", "got it", "understood", "cool"],
        response: "Got it! No prob! Glad I could **help** u out. Come back if u need more stuff!"
    },
    // 20. --- GENERAL CHAT DATA (Goodbye) ---
    {
        keywords: ["bye", "see ya", "cya", "gotta go", "later", "goodbye"],
        response: "See ya later! Have a good one."
    },
];

const FALLBACK_RESPONSE = "Uh oh, I don't get that. I'm just trained on stuff here on the website like the **Startup Fund**, **Scholarships**, **Events**, or **Mentorship**. If it's a deep or complex question, try searching our **Alumni Directory** for an expert!";

const SUGGESTED_QUESTIONS = [
    "How do i apply for the Fund?",
    "Wut events r next?",
    "Can i find a mentor?",
    "What are the scholarshp rules?",
    "Tell me about alumni groups",
    "Can I search for faculty?",
    "Where is the Job Board?",
];

// ---

// === CUSTOM HOOK FOR CHAT LOGIC (Modularization) ===
const useChatAssistant = (messages, setMessages, setIsLoading) => {

    const callLocalAssistant = useCallback(async (chatHistory) => {
        const lastMessage = chatHistory[chatHistory.length - 1].text.trim().toLowerCase();
        

        // --- LOGIC FOR SPELLING MISTAKE TOLERANCE ---
        // Enhanced normalization to handle typical chat shorthand
        const normalizedMessage = lastMessage
            .replace(/\bhlep\b/g, 'help')
            .replace(/\bwhere\b/g, 'where')
            .replace(/\bapplyin\b/g, 'apply')
            .replace(/\b(wut|wat)\b/g, 'what')
            .replace(/\b(r|ar)\b/g, 'are')
            .replace(/\b(ur)\b/g, 'you are')
            .replace(/\bstrat up\b/g, 'startup')
            .replace(/\bscholarshp\b/g, 'scholarship')
            .replace(/\b(i'm)\b/g, 'i am');

        // Simulate a small delay for better user experience
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

        // --- CORE MATCHING LOGIC (Prioritize Domain-Specific queries) ---
        let matchedResponse = null;

        // 1. Check for Deep Question/Suggestion (Index 0)
        const deepQuestionItem = KNOWLEDGE_BASE[0];
        const hasDeepMatch = deepQuestionItem.keywords.some(keyword =>
            normalizedMessage.includes(keyword.toLowerCase())
        );
        if (hasDeepMatch) {
            matchedResponse = deepQuestionItem.response;
        }

        // 2. Check for other complex, domain-specific keywords (Indices 1 through 16)
        if (!matchedResponse) {
            // The loop checks up to the last complex entry (Index 16)
            for (let i = 1; i < 17; i++) {
                const item = KNOWLEDGE_BASE[i];
                const hasMatch = item.keywords.some(keyword =>
                    normalizedMessage.includes(keyword.toLowerCase())
                );
                if (hasMatch) {
                    matchedResponse = item.response;
                    break;
                }
            }
        }

        // 3. If no complex match, check for General Chat/Simple Acknowledgment (Index 17 onwards)
        if (!matchedResponse) {
            for (let i = 17; i < KNOWLEDGE_BASE.length; i++) {
                const item = KNOWLEDGE_BASE[i];
                // Only match if the *entire* message is a simple keyword or a word in the message is one
                const hasFullWordMatch = item.keywords.some(keyword =>
                    normalizedMessage.split(/\s+/).includes(keyword.toLowerCase())
                );

                const isExactMatch = item.keywords.some(keyword => normalizedMessage === keyword.toLowerCase());

                if (hasFullWordMatch || isExactMatch) {
                    matchedResponse = item.response;
                    break;
                }
            }
        }

        // --- LOGIC FOR INFORMAL RESPONSE OPENER ---
        if (matchedResponse) {
            // Check if the response is a simple chat/greeting/acknowledgment (which are designed to stand alone)
            const isSimpleChat = ["Hey there!", "I'm the **AlumniConnect AI**", "No prob!", "See ya later!", "Got it!"].some(start => matchedResponse.startsWith(start));

            if (isSimpleChat) {
                return matchedResponse; // Return chat/greeting replies as is.
            }

            // For knowledge-based questions (like Events/Funding), add a casual opener
            const firstWord = chatHistory[chatHistory.length - 1].text.trim().split(' ')[0].toLowerCase();
            let opener;

            if (['how', 'can', 'do', 'i', 'tell', 'where', 'wut', 'what', 'r', 'who', 'suggest'].includes(firstWord)) {
                // If it's a deep question, don't use a generic opener since the answer is custom
                if (matchedResponse.startsWith("That's a **fantastic, deep question**!")) {
                    return matchedResponse;
                }
                opener = "Sure, I can **help** with that. Check this out: ";
            } else {
                opener = "Ok, I get what ur asking'. Here's the info: ";
            }
        }
    let finalResponse = matchedResponse || FALLBACK_RESPONSE;
        
        // --- NEW: LOGIC TO SHUFFLE AND ADD THE PROMPT ---
        // Recalculate isSimpleChat *after* the opener logic is applied
        const isSimpleChatAfterOpener = ["Hey there!", "I'm the **AlumniConnect AI**", "No prob!", "See ya later!", "Got it!"].some(start => finalResponse.startsWith(start));

        if (!isSimpleChatAfterOpener) {
            // Shuffle and pick the first three suggestions
            const shuffledSuggestions = shuffleArray(SUGGESTED_QUESTIONS);
            const suggestionsForPrompt = shuffledSuggestions.slice(0, 3);

            // Construct the final prompt text
            const prompt = `\n\n<br/>\n\nNeed to know more? Try asking about: **${suggestionsForPrompt[0]}**, **${suggestionsForPrompt[1]}**, or **${suggestionsForPrompt[2]}**.`;

            finalResponse += prompt;
        }

        return finalResponse; // Return the response with the appended prompt (or the simple chat/fallback)
    }, [shuffleArray]);

    const handleSend = useCallback(async (text) => {
        if (!text.trim()) return;

        const newUserMessage = { role: 'user', text: text.trim() };
        const newHistory = [...messages, newUserMessage];

        setMessages(newHistory);
        setIsLoading(true);

        const responseText = await callLocalAssistant(newHistory);

        setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
        setIsLoading(false);
    }, [messages, setMessages, setIsLoading, callLocalAssistant]);

    return { handleSend };
};

const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// ---

// === CORE CHATBOT COMPONENT (Tailwind CSS structure remains unchanged) ===
const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        // --- INITIAL MESSAGE ---
        { role: 'assistant', text: "Hey! I'm ur simple AI helper. I can **help** u find stuff about the **Startup Fund**, **Scholarships**, **Events**, or **Mentorship Network**. Just ask me whatever u need!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const { handleSend } = useChatAssistant(messages, setMessages, setIsLoading);

    // Scroll to the latest message
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(scrollToBottom, [messages]);

    const submitHandler = (e) => {
        e.preventDefault();
        handleSend(input);
        setInput('');
    };

    const handleSuggestedQuestion = (question) => {
        // Send the suggested question and close the suggested buttons
        handleSend(question);
    }

    // --- Component Rendering ---

    const Message = ({ message, showSuggestions = false }) => {
        const isUser = message.role === 'user';

        // Simple markdown rendering for bold text (**) and links ([title](uri))
        const markdownText = message.text.split('\n').map((line, index) => {
            const lineWithBolds = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // Simple link parsing
            const linkMatch = lineWithBolds.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                const [, title, uri] = linkMatch;
                const linkHtml = `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:text-indigo-600 underline font-semibold">${title}</a>`;
                return (
                    <p key={index} className="text-sm mt-1" dangerouslySetInnerHTML={{
                        __html: lineWithBolds.replace(/\[(.*?)\]\((.*?)\)/, linkHtml)
                    }} />
                );
            }
            // Standard paragraph rendering with bolding
            return <p key={index} className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: lineWithBolds }}></p>;
        });

        return (
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md transition-all duration-200 ${isUser
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-tl-md border border-gray-200 shadow-lg'
                    }`}>
                    {markdownText}

                    {/* Suggested Questions (only for the initial message) */}
                    {showSuggestions && (
                        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestedQuestion(q)}
                                    className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors duration-200 shadow-sm"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="font-sans antialiased">
            {/* --- Sticky Chat Toggle Button (Logo) --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed z-50 bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform 
                    ${isOpen ? 'bg-red-500 hover:bg-red-600 ring-red-300' : 'bg-indigo-500 hover:bg-indigo-600 ring-indigo-300'}
                    focus:outline-none focus:ring-4 active:scale-95`}
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                {/* Visual indicator of the chat state */}
                <div className="relative">
                    <MessageCircleIcon className={`w-7 h-7 text-white transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <XIcon className={`w-7 h-7 text-white absolute top-0 left-0 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </button>

            {/* --- Chat Window --- */}
            <div className={`fixed bottom-0 right-0 z-40 transition-all duration-300 ease-in-out shadow-2xl rounded-t-xl md:rounded-xl 
                bg-gray-50 flex flex-col ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full md:translate-y-0 md:opacity-0 md:pointer-events-none'} 
                w-full h-[85vh] md:w-[400px] md:h-[600px] md:bottom-20 md:right-10 overflow-hidden`}>

                {/* Chat Header */}
                <div className="p-4 bg-indigo-600 text-white rounded-t-xl flex justify-between items-center shadow-lg">
                    <div className="flex items-center space-x-3">
                        <MessageCircleIcon className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">AlumniConnect AI</h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-full hover:bg-indigo-700 transition"
                        aria-label="Close Chat"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Message Area */}
                <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-white/95 backdrop-blur-sm">
                    {messages.map((msg, index) => (
                        <Message
                            key={index}
                            message={msg}
                            // Show suggestions only on the very first message
                            showSuggestions={index === 0 && messages.length === 1}
                        />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-3">
                            <div className="max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl bg-white text-gray-800 rounded-tl-md border border-gray-200 animate-pulse shadow-sm">
                                <div className="h-2 bg-gray-200 rounded w-4/5 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={submitHandler} className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow p-3 border text-blue-950 border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm"
                            placeholder="Ask a question..."
                            disabled={isLoading}
                            autoComplete="nope"
                        />
                        <button
                            type="submit"
                            className={`p-3 rounded-full text-blue-950 transition duration-150 ${isLoading || !input.trim() ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95'}`}
                            disabled={isLoading || !input.trim()}
                            aria-label="Send Message"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AIChatbot;
