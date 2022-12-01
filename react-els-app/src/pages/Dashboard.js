import React from 'react';

import Section from '../components/atoms/Section';
import ProfileInfo from '../components/organisms/ProfileInfo';
import { Imports } from '../components/templates/Imports';

const Dashboard = () => {
    const imports = Imports();
    return (
        <Section>
            <div className='flex flex-col w-full lg:w-3/5 lg:flex-row mx-auto mt-10 gap-10'>
                <div className='w-full flex flex-col lg:w-1/4 gap-3'>
                    <div className='font-semibold text-lg w-full'>Dashboard</div>
                    <ProfileInfo id={imports.user.id} />
                </div>
                <div className='w-3/4 border border-blue-300 rounded-sm p-5 divide-y-2 divide-blue-200'>
                    <div className='font-semibold text-lg pb-2'>Activities</div>
                    <div className='pt-2'>
                        <div>Activity 1</div>
                        <div>Activity 2</div>
                        <div>Activity 3</div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Dashboard;
