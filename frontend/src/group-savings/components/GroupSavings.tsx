import React, { useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import QuickStats from './QuickStats';
// import GroupRadio from './GroupRadio';
import CreateGroupCard from './CreateGroupCard';
import SavingsTips from './SavingsTips';
// import RecentActivity from './RecentActivity';

const GroupSavings = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [groups, setGroups] = useState([]); // Fetch this data from your API
    const [totalSavings, growthRate, totalGroups] = [10000, 5.2, 3]; // Fetch these from your API
    const recentActivities = [
        { type: 'deposit', amount: 500, group: 'Vacation Fund', date: '2023-10-05' },
        { type: 'withdrawal', amount: 200, group: 'Emergency Fund', date: '2023-10-03' },
        // Add more activities...
    ];

    return (
        <div className="container mx-auto px-4 py-8">

            <h2 className="text-2xl font-bold mb-4">Your Saving Groups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* {groups.map((group) => (
          <GroupRadio
            key={group.id}
            id={group.id}
            isHovered={hoveredId === group.id}
            onMouseEnter={() => setHoveredId(group.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))} */}
                <CreateGroupCard />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SavingsTips />
                {/* <RecentActivity activities={recentActivities} /> */}
            </div>
        </div>
    );
};

export default GroupSavings;