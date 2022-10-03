import React from 'react';
import {useParams} from 'react-router-dom';

const CoursePage = () => {
  let {id} = useParams();
  return (
    <>
        <div>CoursePage</div>
        <div> Course ID: {id}</div>
    </>
  )
}

export default CoursePage