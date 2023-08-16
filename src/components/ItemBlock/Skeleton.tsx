import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
    <ContentLoader
        className='product-block'
        speed={2}
        width={280}
        height={425.2}
        viewBox='0 0 280 425.2'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
      <rect x='0' y='0' rx='15' ry='15' width='260' height='260' />
      <rect x='0' y='275' rx='15' ry='15' width='260' height='27' />
      <rect x='0' y='316' rx='15' ry='15' width='260' height='47' />
      <rect x='0' y='376' rx='15' ry='15' width='77' height='27' />
      <rect x='94' y='376' rx='15' ry='15' width='167' height='27' />
    </ContentLoader>
);