import React, { FC } from 'react';

interface InfoColumnProps {
    child: React.FC
}

const InfoColumn: FC<InfoColumnProps> = ({ child: ChildComponent }) => {
    return (
        <div className='info-page__info-column'>
            <ChildComponent />
        </div>
    );
};

export default InfoColumn;