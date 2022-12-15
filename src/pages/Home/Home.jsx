import React, { useContext, useEffect, useState } from "react";
import { AuthContext, token } from "../../api/auth.api";
import Load from "../../components/Load/Load";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import CourseList from "../../components/CourseList/CourseList";
import { Container, Text, Button, TextInput, Paper } from "@mantine/core";
import { useStyle } from "../../components/CourseList/courseList.styles";
import Notifications from "../../components/Notifications/Notifications";

const Home = () => {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const { classes } = useStyle(true);

  const [visible, setVisible] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [courseLink, setCourseLink] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      await axios({
        method: "get",
        url: "http://localhost:5000/api/courses",
        withCredentials: true,
        headers: { authorization: token },
      })
        .then((props) => {
          // console.log(props.data.courses);
          setCourses(props.data.courses);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if(!token)  window.location.href="/register";
    auth && fetchCourses();
  }, [auth, courses, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(courseInstructor, courseLink, courseName, coursePrice);
    await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/courses',
      withCredentials: true,
      headers: {authorization: token, 'Content-Type': 'application/json'},
      data: {
        course_name: courseName,
        course_price: coursePrice,
        course_instructor: courseInstructor,
        course_link: courseLink
      }
    }).then((res) => {
      console.log(res.data);
      Notifications("Course Update", res.data);
      setVisible(false);
      window.location.href="/";
    }).catch((err) => {
      console.error(err);
      Notifications("There was an error", err.message);
    });
  };

  if (loading) return <Load />;

  return (
    <>
      {token ? (
        <div style={{ margin: 0 }}>
          <Navbar />
          <div
            style={{
              paddingTop: "50px",
            }}
          >
            <Text className={classes.text}>List of Courses</Text>
            <Button
              onClick={() => setVisible(true)}
              style={{ marginLeft: "45%" }}
              radius="xl"
            >
              Add Course
            </Button>
            {visible ? (
              <Container size={420} my={40}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      label="Course Name"
                      placeholder="Name of the course"
                      value={courseName}
                      onChange={(e) => setCourseName(e.currentTarget.value)}
                      required
                      data-autofocus
                    />
                    <TextInput
                      label="Course Price"
                      placeholder="Price of the course"
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.currentTarget.value)}
                      required
                      mt="md"
                    />
                    <TextInput
                      label="Course Instructor"
                      placeholder="Instructor"
                      value={courseInstructor}
                      onChange={(e) =>
                        setCourseInstructor(e.currentTarget.value)
                      }
                      required
                      mt="md"
                    />
                    <TextInput
                      label="Course Link"
                      placeholder="Link of the playlist"
                      value={courseLink}
                      onChange={(e) => setCourseLink(e.currentTarget.value)}
                      required
                      mt="md"
                    />
                    <Button fullWidth type="submit" mt="md">
                      Submit
                    </Button>
                  </form>
                </Paper>
              </Container>
            ) : null}
            {courses.map((item) => {
              return (
                <CourseList
                  key={item.course_id}
                  id={item.course_id}
                  cname={item.course_name}
                  inst={item.course_instructor}
                  link={item.course_link}
                />
              );
            })}
          </div>
        </div>
      ) : (
        (window.location.href = "/register")
      )}
    </>
  );
};

export default Home;
