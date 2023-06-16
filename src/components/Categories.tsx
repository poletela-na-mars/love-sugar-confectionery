import React, { useState } from 'react';
import { CategoriesList } from '../consts';

export const Categories = () => {
  const [activeCat, setActiveCat] = useState(0);

  const onClickCategoryHandler = (idx: React.SetStateAction<number>) => {
    setActiveCat(idx);
  };

  return (
      <div className='categories'>
        <ul>
          {
            CategoriesList.map((value, idx) => (
                <li key={idx} onClick={() => onClickCategoryHandler(idx)} className={activeCat === idx ? 'active' : ''}>
                  {value}
                </li>
            ))
          }
        </ul>
      </div>
  )
};
