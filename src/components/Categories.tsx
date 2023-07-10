import React from 'react';
import { CategoriesList } from '../consts';

// TODO - add types
export const Categories = ({value, onClickCategoryHandler}: any) => {
  // const [activeCat, setActiveCat] = useState(0);

  const onClickCategoryHandlerLoc = (idx: React.SetStateAction<number>) => {
    onClickCategoryHandler(idx);
  };

  return (
      <div className='categories'>
        <ul>
          {
            CategoriesList.map((category, idx) => (
                <li key={idx} onClick={() => onClickCategoryHandlerLoc(idx)} className={value === idx ? 'active' : ''}>
                  {category}
                </li>
            ))
          }
        </ul>
      </div>
  )
};
