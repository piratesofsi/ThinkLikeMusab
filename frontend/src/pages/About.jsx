import React from 'react';

function About() {
    return (
        <div className="min-h-screen bg-black text-white px-4 py-16 md:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">About ThinkLikeMusab</h1>
                <p className="text-base md:text-lg text-gray-400 leading-7 md:leading-8 mb-6">
                    A platform dedicated to teaching algorithmic thinking through real-world problem-solving approaches.
                </p>
                <p className="text-sm md:text-base text-gray-500">
                    From confusion to clarity, one problem at a time.
                </p>
            </div>
        </div>
    );
}

export default About;