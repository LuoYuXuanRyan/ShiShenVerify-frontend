import {
  Image,
  Card,
  CardGroup,
  Space,
  Modal,
  Typography,
  Pagination,
  Toast,
  Button,
  Spin,
} from "@douyinfe/semi-ui";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api/api";
import AudioVisualizer from "../components/AudioVisualizer/AudioVisualizer";

export default function FirstIdentification() {
  const [peoples, setPeoples] = useState([
    {
      id: 1,
      username: "赵文博",
      face_image_url: "zwb_photo.jpg",
      fingerprint_image_url: "zwb_fingerprint.bmp",
      voice_print_url: "zwb_voiceprint.mp3",
      gait_near_url: "cxk.mp4",
      gait_far_url: "cxk.mp4",
    },
    {
      id: 2,
      username: "卢泓睿",
      face_image_url: "lhr_photo.png",
      fingerprint_image_url: "lhr_fingerprint.bmp",
      voice_print_url: "lhr_voiceprint.mp3",
      gait_near_url: "cxk.mp4",
      gait_far_url: "cxk.mp4",
    },
  ]);
  const pageSize = 10;
  const totalPages = useRef(Math.ceil(peoples.length / pageSize));
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const { Title, Text } = Typography;
  const curPeople = useRef({ id: -1 });
  const [showPeoples, setShowPeoples] = useState(
    peoples.slice(
      (page - 1) * pageSize,
      page * pageSize > peoples.length ? peoples.length : page * pageSize
    )
  );
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const isPlaying = useRef(false);
  const navigate = useNavigate();

  const handlePlay = () => {
    if (videoRef1.current && videoRef2.current) {
      if (!isPlaying.current) {
        videoRef1.current.play();
        videoRef2.current.play();
        isPlaying.current = true;
      } else {
        videoRef1.current.pause();
        videoRef2.current.pause();
        isPlaying.current = false;
      }
    }
  };

  const [is_voiceprint_recognizing, setVoiceprintRecognizing] = useState(true);
  const [is_gait_recognizing, setGaitRecognizing] = useState(true);
  const [is_checking, setChecking] = useState(false);
  const [can_close, setClose] = useState(true);

  const token = localStorage.getItem("token");

  const getAllUsers = useCallback(() => {
    if (!token) {
      // navigate("/login");
    } else if (token) {
      console.log("Get All Users!");
      axios
        .get(`/${api}/index`, {
          params: {
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            setPeoples(data.users_info);
            totalPages.current = data.total_valid_users / pageSize;
            setShowPeoples(
              data.users_info.slice(
                (page - 1) * pageSize,
                page * pageSize > data.users_info.length
                  ? data.users_info.length
                  : page * pageSize
              )
            );
          } else if (res.status === 401) {
            Toast.error({ content: "请先登录！", theme: "light" });
            navigate("/login");
          } else if (res.status === 404) {
            Toast.warning({ content: "没有用户数据！", theme: "light" });
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.error({ content: "获取数据失败！", theme: "light" });
        });
    }
  }, [navigate, token]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    setShowPeoples(
      peoples.slice(
        (page - 1) * pageSize,
        page * pageSize > peoples.length ? peoples.length : page * pageSize
      )
    );
  }, [peoples, page]); //更新卡片数据

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setChecking(false);
            setVisible(true);
            curPeople.current = { valid: -1 };
          }}
        >
          添加一条记录
        </Button>
      </div>

      <CardGroup spacing={30} style={{ padding: "1rem", maxWidth: "200rem" }}>
        {showPeoples.map((people, index) => (
          <Card
            style={{ width: "15rem", height: "23rem" }}
            shadows="hover"
            key={index}
            footerLine={true}
            footerStyle={{
              display: "flex",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: "1.2rem",
            }}
            footer={<Text type={people.username==="Unknown"?"danger":"primary"}>{people.username}</Text>}
            onClick={() => {
              curPeople.current = people;
              setVoiceprintRecognizing(false);
              setGaitRecognizing(false);
              setChecking(true);
              setVisible(true);
            }}
          >
            <Image
              src={people.face_image_url}
              alt="photo"
              width={192}
              height={256}
              preview={false}
            />
          </Card>
        ))}
      </CardGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          total={peoples.length}
          pageSize={pageSize}
          onPageChange={(page) => {
            setPage(page);
            console.log(page);
          }}
        />
      </div>

      <Modal
        visible={visible}
        header={
          <>
            <Title heading={4} style={{ margin: "0.2rem" }}>
              姓名：<Text type={curPeople.current.username==="Unknown"?"danger":"primary"}>{curPeople.current.username}</Text>
            </Title>
            <Title heading={4} style={{ margin: "0.2rem" }}>
              编号：<Text type={curPeople.current.id==="Unknown"?"danger":"primary"}>{curPeople.current.id}</Text>
            </Title>
          </>
        }
        style={{ width: "75rem", height: "50rem" }}
        onCancel={() => {
          setVoiceprintRecognizing(true);
          setGaitRecognizing(true);
          setVisible(false);
        }}
        onOk={() => {
          //开始识别
          Toast.success({ content: "开始声纹识别！", theme: "light" });
          setClose(false);
          // curPeople.current = {
          //   face_image_url: "zbl_face.png",
          //   fingerprint_image_url: "zbl_fingerprint.bmp",
          //   voice_print_url: "zbl_voiceprint_recog.mp3",
          //   gait_near_url: "zbl_gait1.mp4",
          //   gait_far_url: "zbl_gait2.mp4",
          //   valid: -1,
          // };
          curPeople.current = {
            face_image_url: "unknown_face.png",
            fingerprint_image_url: "unknown_fingerprint.bmp",
            voice_print_url: "unknown_voiceprint.mp3",
            gait_near_url: "unknown_gait1.mp4",
            gait_far_url: "unknown_gait2.mp4",
            valid: -1,
          };
          setTimeout(() => {
            setVoiceprintRecognizing(false);
            Toast.success({ content: "声纹识别完成！", theme: "light" });
            Toast.success({ content: "开始步态识别！", theme: "light" });
            // curPeople.current = {
            //   id: 3,
            //   username: "郑贝来",
            //   face_image_url: "zbl_face.png",
            //   fingerprint_image_url: "zbl_fingerprint.bmp",
            //   voice_print_url: "zbl_voiceprint_recog.mp3",
            //   gait_near_url: "zbl_gait1.mp4",
            //   gait_far_url: "zbl_gait2.mp4",
            //   valid: 1,
            // };
            curPeople.current = {
              face_image_url: "unknown_face.png",
              fingerprint_image_url: "unknown_fingerprint.bmp",
              voice_print_url: "unknown_voiceprint.mp3",
              gait_near_url: "unknown_gait1.mp4",
              gait_far_url: "unknown_gait2.mp4",
              valid: 1,
            };
            
          }, 42000);
          setTimeout(() => {
            setGaitRecognizing(false);
            Toast.success({ content: "步态识别完成！", theme: "light" });
            setClose(true);
            // curPeople.current = {
            //   id: 3,
            //   username: "郑贝来",
            //   face_image_url: "zbl_face.png",
            //   fingerprint_image_url: "zbl_fingerprint.bmp",
            //   voice_print_url: "zbl_voiceprint_recog.mp3",
            //   gait_near_url: "zbl_gait1.mp4",
            //   gait_far_url: "zbl_gait2.mp4",
            //   valid: 1,
            // };
            curPeople.current = {
              id: "Unknown",
              username: "Unknown",
              face_image_url: "unknown_face.png",
              fingerprint_image_url: "unknown_fingerprint.bmp",
              voice_print_url: "unknown_voiceprint.mp3",
              gait_near_url: "unknown_gait1.mp4",
              gait_far_url: "unknown_gait2.mp4",
              valid: 1,
            };
            // setPeoples([
            //   ...peoples,
            //   {
            //     id: 3,
            //     username: "郑贝来",
            //     face_image_url: "zbl_photo.jpg",
            //     fingerprint_image_url: "zbl_fingerprint.bmp",
            //     voice_print_url: "zbl_voiceprint_recog.mp3",
            //     gait_near_url: "zbl_gait1.mp4",
            //     gait_far_url: "zbl_gait2.mp4",
            //   },
            // ]);
            setPeoples([
              ...peoples,
              {
                id: "Unknown",
                username: "Unknown",
                face_image_url: "unknown_photo.png",
                fingerprint_image_url: "unknown_fingerprint.bmp",
                voice_print_url: "unknown_voiceprint.mp3",
                gait_near_url: "unknown_gait1.mp4",
                gait_far_url: "unknown_gait2.mp4",
              },
            ]);
          }, 47000);
        }}
        okText="开始"
        cancelText="关闭"
        maskClosable={false}
        okButtonProps={{ disabled: is_checking }}
        cancelButtonProps={{
          disabled: !can_close,
        }}
      >
        <CardGroup
          spacing={20}
          style={{
            width: "100%",
            margin: 0,
            height: "100%",
          }}
        >
          <Card
            header={<Title heading={3}>声纹识别</Title>}
            style={{
              flex: 1,
              height: "100%",
            }}
            headerStyle={{
              display: "flex",
              justifyContent: "center",
            }}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          >
            {is_voiceprint_recognizing ? (
              <Spin size="large">等待识别中...</Spin>
            ) : curPeople.current.valid !== -1 ? (
              <AudioVisualizer audioUrl={curPeople.current.voice_print_url} />
            ) : (
              <></>
            )}
          </Card>
          <Card
            header={<Title heading={3}>步态识别</Title>}
            footer={
              <>
                {curPeople.current.valid !== -1 ? (
                  <Button
                    onClick={() => {
                      handlePlay();
                    }}
                  >
                    播放
                  </Button>
                ) : (
                  <></>
                )}
              </>
            }
            style={{
              flex: 1,
              height: "100%",
            }}
            headerStyle={{
              display: "flex",
              justifyContent: "center",
            }}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70%",
            }}
            footerStyle={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {is_gait_recognizing ? (
              <Spin size="large">等待识别中...</Spin>
            ) : curPeople.current.valid !== -1 ? (
              <>
                <video
                  ref={videoRef1}
                  src={curPeople.current.gait_near_url}
                  width="50%"
                  height="auto"
                  loop
                />
                <video
                  ref={videoRef2}
                  src={curPeople.current.gait_far_url}
                  width="50%"
                  height="auto"
                  loop
                />
              </>
            ) : (
              <></>
            )}
          </Card>
        </CardGroup>
      </Modal>
    </>
  );
}
