import { Layout, Nav, Avatar, Image } from "@douyinfe/semi-ui";
import { Link, Outlet } from "react-router-dom";
import {
  IconLive,
  IconEdit,
  IconArchive,
  IconMicrophone,
  IconUserCardVideo,
  IconKanban
} from "@douyinfe/semi-icons";

export default function TheLayout() {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Nav mode="horizontal">
          <Nav.Header>
            <Image src="LOGO-HENG.png" alt="识身" height={50} preview={false} />
          </Nav.Header>
          <Nav.Footer>
            <Avatar color="light-blue" size="small">
              U
            </Avatar>
          </Nav.Footer>
        </Nav>
      </Header>
      <Layout>
        <Sider>
          <Nav
            style={{ height: "100%", maxWidth: 220 }}
            renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
              const routerMap = {
                first_identification: "/first_identification",
                second_identification: "/second_identification",
                database: "/database",
                dashboard: "/dashboard",
                monitor: "/monitor",
                data_entry: "/data_entry",
              };
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={routerMap[props.itemKey]}
                >
                  {itemElement}
                </Link>
              );
            }}
            defaultSelectedKeys={[
              window.location.pathname.split("/").filter(Boolean)[0],
            ]}
            items={[
              {
                itemKey: "first_identification",
                text: "第一层识别",
                icon: <IconUserCardVideo />,
              },
              {
                itemKey: "second_identification",
                text: "第二层识别",
                icon: <IconMicrophone />,
              },
              {
                itemKey: "database",
                text: "数据库",
                icon: <IconArchive />,
              },
              {
                itemKey: "dashboard",
                text: "仪表盘",
                icon: <IconKanban />
              },
              {
                itemKey: "monitor",
                text: "监控画面",
                icon: <IconLive />,
              },
              {
                itemKey: "data_entry",
                text: "录入",
                icon: <IconEdit />,
              },
            ]}
            footer={{
              collapseButton: true,
            }}
          ></Nav>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
