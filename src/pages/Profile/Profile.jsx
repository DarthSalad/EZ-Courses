import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./Profile.styles";
import { Text, Button } from "@mantine/core";
import { AuthContext, token } from "../../api/auth.api";
import Load from "../../components/Load/Load";
import axios from "axios";
import CourseList from "../../components/CourseList/CourseList";
import Notifications from "../../components/Notifications/Notifications";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { classes } = useStyles();
  const date = new Date(auth.data.iat).toLocaleDateString();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  useEffect(() => {
    const getCourse = async (course_id) => {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/courses/course_details",
        headers: { "Content-Type": "application/json" },
        data: { course_id: course_id },
        withCredentials: true,
      })
        .then((res) => {
          // console.log(res.data.course);
          setSubscribedCourses(subscribedCourses.concat(
            {
              course_name: res.data.course.course_name,
              course_id: res.data.course.course_id,
              course_instructor: res.data.course.course_instructor,
              course_link: res.data.course.course_link,
            }
          ));
        })
        .catch((err) => {
          console.log(err);
          Notifications("Error", err);
        });

      // return (
      // <CourseList
      //   key={courseDetails.course_id}
      //   id={courseDetails.course_id}
      //   cname={courseDetails.course_name}
      //   inst={courseDetails.course_instructor}
      //   link={courseDetails.course_link}
      // />
      // );
    };

    const fetchCourses = async () => {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/courses",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        data: { user_id: auth.data.user_id },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.courses.length === 0) setCourses([]);
          else {
            setCourses(
              res.data?.courses.map((course) => ({
                course_id: course,
              }))
            );
          }
          // console.log(res.data.courses);
        })
        .catch((error) => {
          console.log(error);
          Notifications("There was an error", error.message);
        });
    };

    auth &&
      fetchCourses() &&
      courses.forEach((course) => getCourse(course.course_id));
    setLoading(false);
  }, [auth, courses, subscribedCourses]);

  if (!auth || loading) return <Load />;

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.main}>
        <Text className={classes.text}>Profile</Text>
        <Text>Name: {auth.data.user_name}</Text>
        <Text>Email: {auth.data.user_email}</Text>
        <Text>Created On: {date}</Text>

        <Text
          className={classes.text}
          style={{
            paddingTop: "50px",
          }}
        >
          Subscribed Courses
        </Text>
        {courses.length !== 0 ? (
          courses.map((item) => {
            // getCourse(item.course_id);
            return (
              <>
                {item.course_id}
                <br />
                {/* <Button onClick={() => getCourse(item.course_id)}>
                  Get Details
                </Button> */}
                <br />
              </>
            );
          })
        ) : (
          <>No courses subscribed</>
        )}
      </div>
    </div>
  );
};

export default Profile;
