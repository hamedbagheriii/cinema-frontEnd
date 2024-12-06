import React, { FC } from 'react';

interface chipsDataProps {
    data : any
}
const ChipsData : FC<chipsDataProps> = ({data}) => {
    return (
        <div className='w-full h-full flex flex-wrap justify-evenly gap-1'>
            {data.map((t : any) => (
                <div key={t.id} className='bg-red-500 px-3 rounded-full py-1'>
                    {t.hallName}
                </div>
            ))}
        </div>
    );
}

export default ChipsData;
