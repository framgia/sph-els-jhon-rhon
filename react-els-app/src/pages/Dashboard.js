import React from 'react';

import Section from '../components/atoms/Section';
import Activities from '../components/organisms/Activities';
import ProfileInfo from '../components/organisms/ProfileInfo';
import { Imports } from '../components/templates/Imports';
import EditProfile from '../components/organisms/EditProfile';

const Dashboard = () => {
    const imports = Imports();
    return (
        <Section>
            <div className='flex flex-row w-full lg:w-3/4 mx-auto mt-5'>
                <div className='font-semibold text-lg w-full'>Dashboard</div>
            </div>
            <div className='flex flex-col w-full lg:w-3/4 lg:flex-row mx-auto my-10 gap-10'>
                <div className='relative w-full flex flex-col lg:w-1/4 gap-3'>
                    <EditProfile id={imports.user.id} />
                    <ProfileInfo id={imports.user.id} />
                </div>
                <Activities id={imports.user.id} />
            </div>
        </Section>
    );
}

export default Dashboard;
