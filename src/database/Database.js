import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  Button,
  Image,
  Typography,
  TagInput,
  Toast,
  Popconfirm,
} from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";
import axios from "axios";
import { api } from "../api/api";

export default function Database() {
  const { Text } = Typography;

  const columns = [
    {
      title: "姓名",
      dataIndex: "username",
      render: (text, record, index) => {
        return (
          <div>
            <Avatar
              size="small"
              color="light-blue"
              style={{
                margin: 4,
              }}
              alt={record.username}
            >
              {record.username.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: "编号",
      dataIndex: "id",
    },
    {
      title: "面部图片",
      dataIndex: "face_image_url",
      render: (text, record, index) => {
        return (
          <div>
            <Image width={40} height={40} src={record.face_image_url} />
          </div>
        );
      },
    },
    {
      title: "指纹图片",
      dataIndex: "fingerprint_image_url",
      render: (text, record, index) => {
        return (
          <div>
            <Image width={40} height={40} src={record.fingerprint_image_url} />
          </div>
        );
      },
    },
    {
      title: "声纹信息",
      dataIndex: "voice_print_url",
      render: (text, record, index) => {
        return (
          <div>
            <audio controls>
              <source src={record.voice_print_url} type="audio/mpeg" />
              您的浏览器不支持 audio 元素。
            </audio>
          </div>
        );
      },
    },
    {
      title: "步态信息",
      render: (text, record, index) => {
        return (
          <div>
            <Text link={{ href: `${record.gait_near_url}` }}>
              步态信息（近）
            </Text>
            <br />
            <Text link={{ href: `${record.gait_far_url}` }}>
              步态信息（远）
            </Text>
          </div>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (text, record, index) => {
        return (
          <Popconfirm
            title="确认删除？"
            content="此操作不可逆！"
            onConfirm={() => {
              handleDelete(record.id);
              console.log(record.id);
            }}
            position="leftTop"
            okType="danger"
          >
            <Button theme="light" type="danger">
              删除
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  const [userInfo, setUserInfo] = useState([
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
    {
      id: 3,
      username: "郑贝来",
      face_image_url: "zbl_photo.jpg",
      fingerprint_image_url: "zbl_fingerprint.bmp",
      voice_print_url: "zbl_voiceprint.mp3",
      gait_near_url: "zbl_gait1.mp4",
      gait_far_url: "zbl_gait2.mp4",
    },
  ]);

  const [query, setQuery] = useState([]);

  const token = localStorage.getItem("token");

  const handleTagChange = (tags) => {
    setQuery(tags);
    console.log(tags);
  };

  const handleQueryByID = () => {
    axios
      .get(`/${api}/findById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userIds: query,
        },
      })
      .then((res) => {
        const { data } = res.data;
        if (res.status === 200) {
          setUserInfo(data.valid_users_info);
          data.invalid_users_info.forEach((item) => {
            Toast.warning({
              content: `${item.username} 不存在！`,
              theme: "light",
            });
          });
        } else if (res.status === 404) {
          Toast.warning({
            content: `用户不存在！${data.message}`,
            theme: "light",
          });
        } else if (res.status === 415) {
          Toast.warning({
            content: `请求信息错误！${data.message}`,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        Toast.error({
          content: `发生错误:${err}`,
          theme: "light",
        });
      });
  };

  const handleDelete = (id) => {
    axios
      .post(`/${api}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        userId: id,
      })
      .then((res) => {
        const { data } = res.data;
        if (res.status === 200) {
          Toast.success({
            content: `删除成功！`,
            theme: "light",
          });
        } else if (res.data === 400) {
          Toast.warning({
            content: `删除失败！${data.message}`,
            theme: "light",
          });
        } else if (res.status === 415) {
          Toast.warning({
            content: `请求信息错误！${data.message}`,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        Toast.error({
          content: `发生错误:${err}`,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    //获取所有数据，和前两个页面接口一样
  }, []);

  return (
    <>
      <TagInput
        placeholder="请输入查询编号（每个编号以回车键入）"
        prefix={<IconSearch />}
        suffix={
          <Button type="primary" htmlType="submit" onClick={handleQueryByID}>
            编号查询
          </Button>
        }
        allowDuplicates={false}
        onChange={handleTagChange}
        showClear
        addOnBlur
      />
      <Table columns={columns} dataSource={userInfo} pagination={false} />
    </>
  );
}
