import React from 'react';
import LoggedInNav from '../components/LoggedInNav';
import DownFooter from '../components/DownFooter';

const InsideHome = () => {
    return (
        <div className="bg-gradient-to-tr from-black to-gray-800 min-h-screen cursor-default">
            <LoggedInNav />
            <div className="p-8">
                {/* Hero Section */}
                <div className="welcome-section mb-8 p-8 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h2 className="text-3xl font-bold mb-2">Welcome to Cubing Kerala!</h2>
                    <h3 className="text-xl font-semibold mb-4">Ah, You’ve Logged In!</h3>
                    <p>Congratulations! You’ve entered the sacred halls of Cubing Kerala, where mere mortals transcend into cube-solving legends. We promise not to overwhelm you with algorithms… or do we?</p>
                </div>

                {/* Events Section */}
                <div className="events-section mb-8 p-6 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">What’s Happening?</h3>
                    <ul className="list-disc pl-5">
                        <li className="mb-4">
                            <strong>Competitions:</strong> Because nothing says “fun” like a room full of people staring intensely at colored squares. <a href="/competitions" className="text-blue-700 underline ml-1">Competitions</a>
                        </li>
                        <li className="mb-4">
                            <strong>Leaderboard:</strong> Here’s where you find out just how far behind you are. Kidding! (But really, check out who’s on top). <a href="/rankings" className="text-blue-700 underline ml-1">Rankings</a>
                        </li>
                        <li className="mb-4">
                            <strong>Forum:</strong> Engage in deep, philosophical debates about cube theory. Or just ask how to solve the cube! 
                            <a href="https://chat.whatsapp.com/BQmcKIG0eKjLlDQYsPLHdS" className="text-blue-700 underline ml-1">Whatsapp</a>
                        </li>
                    </ul>
                </div>

                {/* Member Spotlight Section */}
                <div className="member-spotlight-section mb-8 p-6 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Member Spotlight: Meet John “The Juggler” Doe</h3>
                    <p>John once solved a 3x3 while riding a unicycle. He’s the hero we didn’t ask for but definitely need. Want to challenge him? Good luck, you’ll need it.</p>
                </div>

                {/* Tips & Tricks Section */}
                <div className="tips-tricks-section mb-8 p-6 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Tips & Tricks</h3>
                    <ul className="list-disc pl-5">
                        <li className="mb-2"><strong>F2L? OLL? PLL?</strong> If these acronyms mean nothing to you, welcome to the club. We’ll get you there… eventually.</li>
                        <li className="mb-2"><strong>Finger Tricks:</strong> Impress your friends and confound your enemies with these moves. Or just use them to solve cubes faster. Your call.</li>
                    </ul>
                </div>

                {/* Merchandise Section */}
                <div className="merchandise-section mb-8 p-6 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Merchandise: Because You Need More Cube Stuff</h3>
                    <ul className="list-disc pl-5">
                        <li className="mb-2"><strong>T-Shirts:</strong> Show the world your love for cubing. Warning: may attract fellow nerds.</li>
                        <li className="mb-2"><strong>Stickers:</strong> Slap them on your cube, your laptop, or your little brother.</li>
                        <li className="mb-2"><strong>Cubes:</strong> Obviously. Like, why are you even here if you don’t want more cubes?</li>
                    </ul>
                </div>

                {/* Discussion Section */}
                <div className="discussion-section mb-8 p-6 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Join the Discussion!</h3>
                    <p>Hop onto our forums and social media. Share your times, your tips, your existential crises about the meaning of life and cubing. We're here for all of it.</p>
                </div>

                {/* Help Section */}
                <div className="help-section mb-8 p-6 bg-gray-100 text-gray-900 rounded shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Need Help?</h3>
                    <p>Our support team is here to answer your questions, calm your nerves, and possibly solve your cube for you. They’re basically superheroes, but without the capes. (We’re working on that.)</p>
                </div>

                {/* Footer Section */}
                <div className="footer-section p-6 text-gray-100 rounded shadow-md text-center">
                    <p>Happy Cubing!<br />The Cubing Kerala Team</p>
                </div>
            </div>
            <DownFooter/>
        </div>
    );
};

export default InsideHome;

