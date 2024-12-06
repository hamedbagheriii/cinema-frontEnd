import React, { FC } from 'react';

interface chipsDataProps {
    data : any;
    target : string;
}
const ChipsData : FC<chipsDataProps> = ({data , target}) => {
    return (
        <div className='w-full h-full flex flex-wrap items-center gap-1'>
            {data.map((t : any) => (
                <div key={t.id} className='bg-red-500 px-3 rounded-full py-1'>
                    {t[target]}
                </div>
            ))}
        </div>
    );
}

export default ChipsData;
