import React from 'react';

import Section from '../components/atoms/Section';
import BackButton from '../components/molecules/BackButton';
import Activities from '../components/organisms/Activities';
import ProfileInfo from '../components/organisms/ProfileInfo';
import { Imports } from '../components/templates/Imports';

const Profile = () => {
    const imports = Imports();
    return (
        <Section>
            <div className='flex flex-row w-full lg:w-3/4 mx-auto mt-5'>
                <BackButton />
            </div>
            <div className='flex flex-col w-full lg:w-3/4 lg:flex-row mx-auto my-10 gap-10'>
                <div className='w-full flex flex-col lg:w-1/4 gap-3'>
                    <ProfileInfo id={imports.params.id} />
                </div>
                <Activities id={imports.params.id} />
            </div>
        </Section>
    );
}

export default Profile;
