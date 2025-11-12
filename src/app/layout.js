// // // "use client";

// // // import { createContext, useState, useEffect, useContext } from 'react';
// // // import { Inter } from 'next/font/google';
// // // import NavBar from './components/NavBar';
// // // import footer from './components/footer';
// // // import './globals.css';

// // // // Initialize Inter font
// // // const inter = Inter({ subsets: ['latin'] });

// // // // Create Contexts for sharing data.
// // // // We'll use AuthContext for authentication-related data.
// // // export const AuthContext = createContext();

// // // // AppContext is still here for non-auth data like leaderboard, as originally planned.
// // // export const AppContext = createContext();

// // // // Custom hook to access the auth context.
// // // // Components will use this hook to get user information.
// // // export const useAuth = () => {
// // //   return useContext(AuthContext);
// // // };

// // // // AuthProvider component to wrap the entire app.
// // // const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // Here you would add real authentication logic, like Firebase signIn.
// // //   // For this example, we'll just set a dummy user after a short delay.
// // //   useEffect(() => {
// // //     // Simulate fetching user from a session or token.
// // //     setTimeout(() => {
// // //       setUser({ id: 'dummy-user-123', name: 'Guest User' });
// // //       setLoading(false);
// // //     }, 1000);
// // //   }, []);

// // //   const value = {
// // //     user,
// // //     loading
// // //   };

// // //   return (
// // //       <AuthContext.Provider value={value}>
// // //           {children}
// // //       </AuthContext.Provider>
// // //   );
// // // };

// // // export default function RootLayout({ children }) {
// // //   const [userId, setUserId] = useState('');
// // //   const [leaderboardData, setLeaderboardData] = useState([]);

// // //   // Generate userId on mount
// // //   useEffect(() => {
// // //     if (typeof crypto !== 'undefined' && crypto.randomUUID) {
// // //       setUserId(crypto.randomUUID());
// // //     } else {
// // //       setUserId(Math.random().toString(36).substring(2));
// // //     }
// // //   }, []);

// // //   return (
// // //     <html lang="en">
// // //       <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen text-gray-800`}>
// // //         {/* Wrap everything in AuthProvider to make auth data available to all child components */}
// // //         <AuthProvider>
// // //           <AppContext.Provider value={{ userId, leaderboardData, setLeaderboardData }}>
// // //             <NavBar />
// // //             <main className="">{children}</main>
// // //           </AppContext.Provider>
// // //         </AuthProvider>
// // //       </body>
// // //     </html>
// // //   );
// // // }


// // "use client";

// // import { createContext, useState, useEffect, useContext } from 'react';
// // import { Inter } from 'next/font/google';
// // import NavBar from './components/NavBar';
// // import { usePathname } from 'next/navigation';
// // // CORRECTED: Import using the capitalized component name and assumed path
// // import Footer from './components/footer'; 
// // import AIChatbot from './components/AIChatbot'
// // import './globals.css';

// // // Initialize Inter font
// // const inter = Inter({ subsets: ['latin'] });

// // // Create Contexts for sharing data.
// // export const AuthContext = createContext();
// // export const AppContext = createContext();

// // // Custom hook to access the auth context.
// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // // AuthProvider component to wrap the entire app.
// // const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Here you would add real authentication logic, like Firebase signIn.
// //   useEffect(() => {
// //     // Simulate fetching user from a session or token.
// //     setTimeout(() => {
// //       setUser({ id: 'dummy-user-123', name: 'Guest User' });
// //       setLoading(false);
// //     }, 1000);
// //   }, []);

// //   const value = {
// //     user,
// //     loading
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export default function RootLayout({ children }) {
// //   const [userId, setUserId] = useState('');
// //   const [leaderboardData, setLeaderboardData] = useState([]);

// //   // Get the current path
// //   const pathname = usePathname();
// //   // Check if the path starts with '/chat' (adjust this if your chat path is different)
// //   const isChatPage = pathname.startsWith('/chat');

// //   // Generate userId on mount
// //   useEffect(() => {
// //     if (typeof crypto !== 'undefined' && crypto.randomUUID) {
// //       setUserId(crypto.randomUUID());
// //     } else {
// //       setUserId(Math.random().toString(36).substring(2));
// //     }
// //   }, []);

// //   return (
// //     <html lang="en">
// //       <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen text-gray-800 flex flex-col`}>
// //         {/* Wrap everything in AuthProvider to make auth data available to all child components */}
// //         <AuthProvider>
// //           <AppContext.Provider value={{ userId, leaderboardData, setLeaderboardData }}>
// //             <NavBar />
            
// //             {/* The main content area should expand to push the footer down */}
// //             <main className="flex-grow">{children}</main>
            
// //             {/* CONDITIONAL RENDERING: Only render the Footer if it is NOT the chat page */}
// //             {!isChatPage && <Footer />}
// //           </AppContext.Provider>
// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }

// "use client";

// import { createContext, useState, useEffect, useContext } from 'react';
// import { Inter } from 'next/font/google';
// import NavBar from './components/NavBar';
// import SubscribeSection from './components/SubscribeSection';
// import { usePathname } from 'next/navigation';
// // CORRECTED: Import using the capitalized component name and assumed path
// import Footer from './components/footer'; 
// // ⭐ ADDED: Import the AIChatbot component
// import AIChatbot from './components/AIChatbot'
// import './globals.css';

// // Initialize Inter font
// const inter = Inter({ subsets: ['latin'] });

// // Create Contexts for sharing data.
// export const AuthContext = createContext();
// export const AppContext = createContext();

// // Custom hook to access the auth context.
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // AuthProvider component to wrap the entire app.
// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Here you would add real authentication logic, like Firebase signIn.
//     useEffect(() => {
//         // Simulate fetching user from a session or token.
//         setTimeout(() => {
//             setUser({ id: 'dummy-user-123', name: 'Guest User' });
//             setLoading(false);
//         }, 1000);
//     }, []);

//     const value = {
//         user,
//         loading
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default function RootLayout({ children }) {
//     const [userId, setUserId] = useState('');
//     const [leaderboardData, setLeaderboardData] = useState([]);

//     // Get the current path
//     const pathname = usePathname();
//     // Check if the path starts with '/chat' (adjust this if your chat path is different)
//     const isChatPage = pathname.startsWith('/chat');

//     // Generate userId on mount
//     useEffect(() => {
//         if (typeof crypto !== 'undefined' && crypto.randomUUID) {
//             setUserId(crypto.randomUUID());
//         } else {
//             setUserId(Math.random().toString(36).substring(2));
//         }
//     }, []);

//     return (
//         <html lang="en">
//             <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen text-gray-800 flex flex-col`}>
//                 {/* Wrap everything in AuthProvider to make auth data available to all child components */}
//                 <AuthProvider>
//                     <AppContext.Provider value={{ userId, leaderboardData, setLeaderboardData }}>
//                         <NavBar />
                    
//                         {/* The main content area should expand to push the footer down */}
//                         <main className="flex-grow">{children}</main>
                        
//                         {/* ⭐ ADDED: Render the AIChatbot component */}
//                         <AIChatbot />
                    
//                         {/* CONDITIONAL RENDERING: Only render the Footer if it is NOT the chat page */}
//                         {!isChatPage && <Footer />}
//                         {!isChatPage && <SubscribeSection />}
//                     </AppContext.Provider>
//                 </AuthProvider>
//             </body>
//         </html>
//     );
// }


"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { Inter } from 'next/font/google';
import NavBar from './components/NavBar';
import SubscribeSection from './components/SubscribeSection';
import { usePathname } from 'next/navigation';
import Footer from './components/footer';
import AIChatbot from './components/AIChatbot';
import './globals.css';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

// Create Contexts for sharing data.
export const AuthContext = createContext();
export const AppContext = createContext();

// Custom hook to access the auth context.
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap the entire app.
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUser({ id: 'dummy-user-123', name: 'Guest User' });
            setLoading(false);
        }, 1000);
    }, []);

    const value = {
        user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default function RootLayout({ children }) {
    const [userId, setUserId] = useState('');
    const [leaderboardData, setLeaderboardData] = useState([]);

    // Get the current path
    const pathname = usePathname();
    const isChatPage = pathname.startsWith('/chat');

    // Generate userId on mount
    useEffect(() => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            setUserId(crypto.randomUUID());
        } else {
            setUserId(Math.random().toString(36).substring(2));
        }
    }, []);

    return (
        <html lang="en">
            <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen text-gray-800 flex flex-col`}>
                <AuthProvider>
                    <AppContext.Provider value={{ userId, leaderboardData, setLeaderboardData }}>
                        <NavBar />
                        <main className="flex-grow">{children}</main>
                        <AIChatbot />
                        {/* Render SubscribeSection before Footer */}
                        {!isChatPage && <SubscribeSection />}
                        {!isChatPage && <Footer />}
                    </AppContext.Provider>
                </AuthProvider>
            </body>
        </html>
    );
}