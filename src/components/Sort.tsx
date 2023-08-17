import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSort } from '../redux/filter/slice';

import { sortList } from '../consts';
import { SortType } from '../types';

type PopupClick = MouseEvent;

export const Sort = React.memo(({ sort }: { sort: SortType }) => {
      const dispatch = useDispatch();
      const sortRef = useRef<HTMLDivElement | null>(null);

      const [openPopup, setOpenPopup] = useState(false);

      const onClickSortHandler = (sort: SortType) => {
        dispatch(setSort(sort));
        setOpenPopup(false);
      };

      useEffect(() => {
        const clickOutsideHandler = (event: PopupClick) => {
          if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
            setOpenPopup(false);
          }
        };

        document.body.addEventListener('click', clickOutsideHandler);
        return () => {
          document.body.removeEventListener('click', clickOutsideHandler);
        }
      }, []);

      return (
          <div ref={sortRef} className='sort'>
            <div className='sort__label'>
              <b>Сортировка по:</b>
              <span onClick={() => setOpenPopup(!openPopup)}>{sort.name}</span>
            </div>
            {
                openPopup && (
                    <div className='sort__popup'>
                      <ul>
                        {
                          sortList.map((sortEl, idx) => (
                              <li key={idx} onClick={() => onClickSortHandler(sortEl)}
                                  className={sort.sortProperty === sortEl.sortProperty ? 'active' : ''}>{sortEl.name}</li>
                          ))
                        }
                      </ul>
                    </div>
                )
            }
          </div>
      );
    }
);
