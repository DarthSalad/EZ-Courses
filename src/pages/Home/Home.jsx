import React, { useContext, useEffect, useState } from "react";
import { AuthContext, token } from "../../api/auth.api";
import Load from "../../components/Load/Load";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';
import CourseList from "../../components/CourseList/CourseList";
import {Text} from "@mantine/core";
import { useStyle } from "../../components/CourseList/courseList.styles";

const Home = () => {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const { classes } = useStyle(true);
  
  useEffect(() => {
    async function fetchCourses() {
      await axios({
        method: 'get',
        url: 'http://localhost:5000/api/courses',
        withCredentials: true,
        headers: {authorization: token}
      }).then((props) => {
        // console.log(props.data.courses);
        setCourses(props.data.courses)
      }).catch((e) => {
        console.log(e);
      })
    }

    fetchCourses();
  }, [courses]);
  
  if(!auth || !courses) return <Load />;

  return (
    <div>
      <Navbar></Navbar>
      <div
        style={{
          paddingTop: "50px",
        }}
      >
        <Text className={classes.text}>List of Courses</Text>
        {courses.map((item) => {
            return(
              <CourseList
                id={item.course_id}
                cname={item.course_name}
                inst={item.course_instructor}
              />
            )
          })}
        {/* <CourseList
          id={item.id}
          cname={item.} 
        /> */}
      </div>
    </div>
  );
};

export default Home;
