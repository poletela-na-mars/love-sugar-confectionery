import React from 'react';
import { CategoriesList } from '../consts';

export const Categories = React.memo(
    ({ value, onClickCategoryHandler }: { value: number, onClickCategoryHandler: (idx: number) => void }) => {
      const onClickCategoryHandlerLoc = (idx: number) => {
        onClickCategoryHandler(idx);
      };

      return (
          <div className='categories'>
            <ul>
              {
                CategoriesList.map((category, idx) => (
                    <li key={idx} onClick={() => onClickCategoryHandlerLoc(idx)}
                        className={value === idx ? 'active' : ''}>
                      {category}
                    </li>
                ))
              }
            </ul>
          </div>
      )
    }
);
