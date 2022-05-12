// import React, {useState, useMemo} from 'react';

// export const columns = useMemo(clickHandler => [
//   {
//     name: 'ID',
//     selector: row => row.id,
//   },
//   {
//     name: 'Name',
//     selector: row => row.name,
//   },
//   {
//     name: 'Post Code',
//     selector: row => row.post_code,
//   },
//   {
//     name: 'Price',
//     selector: row => row.price,
//   },
//   {
//     name: 'Action',
//     cell: (row) => (
//       <div key={row.id}>
//         <button key="update" className='btn action-button btn-warning me-1' onClick={clickHandler} data-action="update" id={row.id}>VIEW DETAIL</button>
//         <button key="delete" className='btn action-button btn-danger' onClick={clickHandler} data-action="delete" id={row.id}>DELETE</button>
//       </div>
//     ),
//     width: 289
//   },
// ]);

export const customStyles = {
  // rows: {
  //     style: {
  //         minHeight: '72px', // override the row height
  //     },
  // },
  headCells: {
    style: {
      justifyContent: 'center',
      fontFamily: 'Prompt',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '27px',
      color: '#000000',
      border: '1px solid #E0E0E0'
    },
  },
  cells: {
    style: {
      justifyContent: 'center',
      fontFamily: 'Prompt',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      color: '#000000',
      border: '1px solid #E0E0E0'
    },
  },
};