import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./JobTable.css";
import client from "../../utils/request";
import {
  Button,
  ConfigProvider,
  Modal,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import { ProProvider, ProTable } from "@ant-design/pro-components";
import enGB from "antd/locale/en_GB";
import "dayjs/locale/en-au";
import { useSelector } from "react-redux";
import { categories } from "../JobPublishForm/JobPublish";
import axios from "axios";

const getStatusTagColor = (tag) => {
  // 'Opening', 'Closed', 'In progress', 'Finished'
  if (tag === "Opening") {
    return "blue";
  } else if (tag === "Closed") {
    return "";
  } else if (tag === "In progress") {
    return "volcano";
  }
  return "green";
};

const ensureUndef = (str) => {
  if (!str) {
    return undefined;
  }
  if (str === "") {
    return undefined;
  }
  return str;
};

const catMap = {};
categories.forEach((c) => {
  catMap[c.id] = { text: c.category };
});

const JobTable = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [currentJobId, setCurrentJobId] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [appModalLoading, setAppModalLoading] = useState(false);
  const [appliantsList, setAppliantsList] = useState([]);

  useEffect(() => {
    if (!isModalOpen || !currentJobId) {
      return;
    }

    const ac = new AbortController();

    setAppModalLoading(true);
    client
      .get("/applications/byJob", {
        params: { jobId: currentJobId },
        signal: ac.signal,
      })
      .then((resp) => {
        const list = resp.data;
        setAppliantsList(list);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        console.error(e);
        setModalOpen(false);
      })
      .finally(() => {
        setAppModalLoading(false);
      });

    return () => {
      ac.abort();
    };
  }, [isModalOpen, currentJobId]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, padding: "16px 32px" }}>
        <ConfigProvider
          locale={enGB}
          theme={{
            token: {
              colorPrimary: "#1976d2",
              borderRadius: "4px",
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            },
          }}
        >
          <ProTable
            rowKey={"id"}
            request={async (params, _, filter) => {
              console.log(params, filter);
              try {
                const resp = await client.post("/jobs/list", {
                  page: params.current,
                  limit: params.pageSize,
                  query: {
                    status: params.status,
                    categoryId: params.categoryId
                      ? parseInt(params.categoryId)
                      : undefined,
                    search: ensureUndef(params.title),
                    location: ensureUndef(params.location),
                  },
                });
                const ret = resp.data;
                console.log(ret);
                return {
                  success: true,
                  total: ret.totalResults,
                  data: ret.results,
                };
              } catch (e) {
                console.error(e);
                return { success: false };
              }
            }}
            columns={[
              { title: "Job Title", dataIndex: "title" },
              {
                title: "Category",
                dataIndex: "categoryId",
                valueEnum: catMap,
                valueType: "select",
                render: (_, ent) => {
                  return ent.category;
                },
              },
              {
                title: "Salary (Hourly)",
                render: (_, ent) => {
                  return `$${ent.salaryStart} - $${ent.salaryEnd}`;
                },
                search: false,
              },
              {
                title: "Job Status",
                dataIndex: "status",
                valueType: "select",
                valueEnum: {
                  Opening: {
                    text: "Opening",
                  },
                  "In progress": {
                    text: "In progress",
                  },
                  Finished: {
                    text: "Finished",
                  },
                  Closed: {
                    text: "Closed",
                  },
                },
                render: (_, ent) => {
                  return (
                    <Tag
                      key={`tag_${ent.id}_${ent.status}`}
                      color={getStatusTagColor(ent.status)}
                    >
                      {ent.status}
                    </Tag>
                  );
                },
              },
              {
                title: "Created At",
                dataIndex: "createdAt",
                render: (_, ent) => {
                  return new Date(ent.createdAt).toLocaleString();
                },
                search: false,
              },
              {
                title: "Last Updated At",
                dataIndex: "updatedAt",
                render: (_, ent) => {
                  return new Date(ent.updatedAt).toLocaleString();
                },
                search: false,
              },
              {
                title: "Publisher",
                dataIndex: "ownerId",
                render: (_, ent) => {
                  const info = ent.ownerInfo;
                  if (info.id === userInfo.id) {
                    return "You";
                  } else {
                    return info.name;
                  }
                },
                search: false,
              },
              {
                title: "Location",
                dataIndex: "location",
              },
              {
                title: "Actions",
                valueType: "option",
                key: "option",
                render: (text, ent, _, action) => {
                  const ret = [
                    <Button
                      key="view"
                      type="link"
                      href={`/jobdescription/${ent.id}`}
                    >
                      View
                    </Button>,
                  ];

                  if (
                    ent.status === "Opening" &&
                    userInfo.role === "employer"
                  ) {
                    // employer choose
                    ret.push(
                      <Button
                        key="applicants"
                        type="link"
                        onClick={() => {
                          setModalOpen(true);
                          setCurrentJobId(ent.id);
                        }}
                      >
                        View Applicants
                      </Button>
                    );
                  } else if (
                    ent.status === "In progress" &&
                    userInfo.role === "employer"
                  ) {
                    // employer choose to end the job
                    ret.push(
                      <Button key="completed" type="link">
                        Mark as Completed
                      </Button>
                    );
                  }

                  if (
                    ent.status === "Opening" &&
                    userInfo.role === "employer"
                  ) {
                    ret.push(
                      <Popconfirm
                        key="remove"
                        title="Delete the job"
                        description="Are you sure to delete this job?"
                        onConfirm={async () => {
                          try {
                            await client.post("/jobs/delete", {
                              jobId: ent.id,
                            });
                            action?.reload();
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                      >
                        <Button type="link" danger>
                          Remove
                        </Button>
                      </Popconfirm>
                    );
                  }
                  return ret;
                },
              },
            ]}
          />
          <Modal
            title="View Appliants"
            open={isModalOpen}
            centered
            width={1024}
            // closeIcon={false}
            maskClosable={false}
            footer={null}
            onCancel={() => {
              setModalOpen(false);
            }}
          >
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Close
            </Button>
            <Table
              style={{ maxWidth: "1280px" }}
              dataSource={appliantsList}
              loading={appModalLoading}
              pagination={null}
              // [{"status":"Accepted","jobId":"665c61bf3ea51933ad6f58dc","note":"","employeeId":"665b0c2d2a3461265d6a609a","createdAt":"2024-06-02T13:58:25.837Z","updatedAt":"2024-06-02T14:03:31.044Z","id":"665c7a81e1708e4ab53840f6"}]
              columns={[
                {
                  title: "Employee",
                  dataIndex: "employeeId",
                },
                {
                  title: "Note",
                  dataIndex: "note",
                  ellipsis: true,
                  render: (txt) => {
                    return <Popover title={txt}>{txt}</Popover>;
                  },
                },
                {
                  title: "Created At",
                  dataIndex: "createdAt",
                  render: (txt) => {
                    return new Date(txt).toLocaleString();
                  },
                },
                {
                  title: "Rating",
                  dataIndex: "rating",
                },
                {
                  title: "Actions",
                  key: "action",
                  width: 200,
                  render: (_, ent) => {
                    // TODO: the view profile should be a link opened at new page
                    return (
                      <Space size="small">
                        <Button key="View Profile" type="link">
                          View Profile
                        </Button>
                        <Button key="Reject" danger type="link">
                          Reject
                        </Button>
                      </Space>
                    );
                  },
                },
              ]}
            />
          </Modal>
        </ConfigProvider>
      </Paper>
    </Box>
  );
};

export default JobTable;
