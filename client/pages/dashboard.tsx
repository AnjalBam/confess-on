import React from 'react';

import DashboardContent from 'components/Dashboard';
import IsLoggedIn from 'components/IsLoggedIn';

const Dashboard: React.FC<any> = () => {
    return (
        <>
            <IsLoggedIn />
            <div className="md:container mx-auto">
                <div className="grid grid-flow-row grid-cols-4 gap-2">
                    <div className="hidden md:block">
                        <h2>ProfileSection</h2>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <DashboardContent />
                    </div>
                    <div className="hidden md:block">
                        <h2>Recommended section</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
