import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Grid, Title, UnstyledButton } from "@mantine/core";
import VideoList from "../../components/VideoList/VideoList";
import { useEffect } from "react";
import axios from "axios";
import Load from "../../components/Load/Load";
import { useStyle } from "../../components/VideoList/videoList.styles";
import { AuthContext, token } from "../../api/auth.api";
import { useContext } from "react";
import Notifications from "../../components/Notifications/Notifications";

const CoursePage = () => {
  const auth = useContext(AuthContext);
  var { id } = useParams();
  var { uuid } = useParams();
  const [playlistItems, setItems] = useState(null);
  const [currentVideo, setCurrentVideo] = useState();
  const { classes } = useStyle();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      await axios({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        params: {
          part: "snippet",
          playlistId: id,
          key: "AIzaSyCUcs5GwTKjLFqC_erL0wTusgS9uCvSVQc",
          maxResults: 50,
        },
      })
        .then((res) => {
          // console.log(res.data);
          setItems(
            res.data.items.map((item) => ({
              videoID: item.snippet.resourceId.videoId,
              thumbnail: item.snippet.thumbnails.default.url,
              title: item.snippet.title,
            }))
          );
          setCurrentVideo(playlistItems[0].videoID);
          // console.log(playlistItems, currentVideo);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const checkSubscribed = async () => {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/courses",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        data: { user_id: auth.data.user_id },
      })
        .then((res) => {
          if (res.data.courses.includes(uuid)) setSubscribed(true);
          console.log(res.data.courses, subscribed);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    checkSubscribed();
    getItems();
    //eslint-disable-next-line
  }, []);

  const subscribe = async () => {
    await axios({
      method: "PUT",
      url: "http://localhost:5000/api/courses/add_course",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      data: {
        user_id: auth.data.user_id,
        course_id: uuid,
      },
    }).then((res) => {
      console.log(res.data);
      Notifications("Subscribed", res.data);
      setSubscribed(true);
    }).catch((err) => {
      console.log(err);
      Notifications("An error occurred", err.messsage);
    });
  };

  if (!playlistItems && !currentVideo) return <Load />;

  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: "50px",
        }}
      >
        <Grid>
          <Grid.Col md={7} lg={6}>
            <div
              style={{
                height: "400px",
              }}
            >
              <iframe
                title="main-video"
                id="ytplayer"
                type="text/html"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&origin=http://example.com`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6} sx={{ paddingLeft: "30px" }}>
            <div>
              <Title order={3} size="h1">
                Course Page
              </Title>
              Course ID: {uuid}
              {subscribed ? (
                playlistItems.map((item) => {
                  return (
                    <UnstyledButton
                      key={item.videoID}
                      className={[
                        classes.user,
                        currentVideo === item.videoID ? classes.selected : null,
                      ]}
                      onClick={() => {
                        setCurrentVideo(item.videoID);
                      }}
                    >
                      <VideoList
                        key={item.videoId}
                        id={item.videoId}
                        cname={item.title}
                        thumb={item.thumbnail}
                      />
                    </UnstyledButton>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={subscribe} mt="md">
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

export default CoursePage;
