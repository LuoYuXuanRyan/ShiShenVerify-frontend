import React from "react";
import {
  Form,
  Select,
  Typography,
  Image,
  Button,
  Toast,
} from "@douyinfe/semi-ui";
import { IconPlus, IconUpload, IconFile } from "@douyinfe/semi-icons";
import styles from "./DataEntry.module.css";

export default function DataEntry() {
  const { Title, Text } = Typography;
  const uploadButton = (
    <Button icon={<IconUpload />} theme="light">
      点击上传文件或拖拽文件到这里
    </Button>
  );

  return (
    <>
      <div className={styles.outer_frame}>
        <div className={styles.inner_frame}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Title heading={1}>录入</Title>
          </div>

          <Form>
            <Form.Input
              label={{ text: "姓名" }}
              field="name"
              placeholder="请输入您的姓名"
            />
            <Form.RadioGroup label={{ text: "性别" }} field="sex" initValue={1}>
              <Form.Radio value={1}>男</Form.Radio>
              <Form.Radio value={2}>女</Form.Radio>
            </Form.RadioGroup>
            <Form.Select
              field="post"
              label={{ text: "职位" }}
              placeholder="请选择您的职位"
              style={{ width: "100%" }}
            >
              <Select.Option value={1}>老板</Select.Option>
              <Select.Option value={2}>职员</Select.Option>
            </Form.Select>
            <div className={styles.first_upload}>
              <Form.Upload
                accept=".jpg,.png,.jpeg"
                label={{ text: "人脸" }}
                listType="picture"
                renderThumbnail={(file) => <Image src={file.url} />}
                prompt={<Text>请上传您的人脸信息</Text>}
                promptPosition="bottom"
                uploadTrigger="custom"
                field="upload"
                action=""
                dragSubText="仅支持 png, jpeg"
                limit={1}
                draggable={true}
                dragMainText="点击上传文件或拖拽文件到这里"
                style={{ width: "200%" }}
                fieldStyle={{ alignSelf: "stretch", padding: 0 }}
              >
                <IconPlus />
              </Form.Upload>
              <div style={{ marginLeft: "3rem" }}>
                <Form.Upload
                  accept=".jpg,.png,.jpeg,.bmp"
                  label={{ text: "指纹" }}
                  listType="picture"
                  renderThumbnail={(file) => <Image src={file.url} />}
                  prompt={<Text>请上传您的指纹信息</Text>}
                  promptPosition="bottom"
                  uploadTrigger="custom"
                  field="upload"
                  action=""
                  dragSubText="仅支持 .jpg,.png,.jpeg,.bmp"
                  limit={1}
                  draggable={true}
                  dragMainText="点击上传文件或拖拽文件到这里"
                  style={{ width: "100%" }}
                  fieldStyle={{ alignSelf: "stretch", padding: 0 }}
                >
                  <IconPlus />
                </Form.Upload>
              </div>
            </div>
            <div className={styles.first_upload}>
              <Form.Upload
                accept=".mp3"
                previewFile={(file) => <IconFile size="large" />}
                label={{ text: "声音" }}
                listType="list"
                prompt={<Text>请上传您的声音信息</Text>}
                uploadTrigger="custom"
                field="upload"
                action=""
                dragSubText="仅支持 .mp3"
                limit={1}
                draggable={true}
                dragMainText="点击上传文件或拖拽文件到这里"
                fieldStyle={{
                  alignSelf: "stretch",
                  padding: 0,
                  width: "min-content",
                }}
              >
                {uploadButton}
              </Form.Upload>
              <Form.Upload
                accept=".mp4"
                label={{ text: "步态" }}
                listType="list"
                prompt={<Text>请上传您的步态信息</Text>}
                uploadTrigger="custom"
                field="upload"
                action=""
                dragSubText="仅支持 .mp4"
                limit={2}
                multiple
                draggable={true}
                dragMainText="点击上传文件或拖拽文件到这里"
                style={{ width: "min-content" }}
                fieldStyle={{
                  alignSelf: "stretch",
                  padding: 0,
                  width: "min-content",
                }}
              >
                {uploadButton}
              </Form.Upload>
            </div>
          </Form>
          <br />
          <br />
          <vr />
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => {
              Toast.success({ content: "上传成功！", theme: "light" });
            }}
          >
            确认上传
          </Button>
        </div>
      </div>
    </>
  );
}
