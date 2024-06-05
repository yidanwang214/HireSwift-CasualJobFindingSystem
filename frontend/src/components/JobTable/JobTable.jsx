import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./JobTable.css";
import client from "../../utils/request";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Rate,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { ProTable } from "@ant-design/pro-components";
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
  } else if (tag === "Finished") {
    return "green";
  }

  if (tag === "Accepted") {
    return "green";
  } else if (tag === "Rejected") {
    return "red";
  } else if (tag === "Pending") {
    return "blue";
  }
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

const JobTable = ({ randomSeed }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [currentJobId, setCurrentJobId] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [appModalLoading, setAppModalLoading] = useState(false);
  const [appliantsList, setAppliantsList] = useState([]);
  const [isRateModalOpen, setRateModalOpen] = useState(false);
  const [ratingForm] = Form.useForm();
  const tableRef = useRef();

  useEffect(() => {
    tableRef.current?.reload();
  }, [randomSeed]);

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
            actionRef={tableRef}
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
                title: "Applications",
                dataIndex: "applicants",
                render: (_, ent) => {
                  if (userInfo.role === "employee") {
                    const myApp = ent.applicants.find(
                      (s) => s.employeeId === userInfo.id
                    );
                    if (!myApp) {
                      return "";
                    }
                    return (
                      <Tag
                        key={`tag_${myApp.id}`}
                        color={getStatusTagColor(myApp.status)}
                      >
                        {myApp.status}
                      </Tag>
                    );
                  } else {
                    return ent.applicants.length;
                  }
                },
                search: false,
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
                      target="_blank"
                      rel="noopener noreferrer"
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
                      <Button
                        key="completed"
                        type="link"
                        onClick={async () => {
                          const resp = await client.post(
                            "/jobs/markAsComplete",
                            {
                              jobId: ent.id,
                            }
                          );
                          console.log(resp.data);

                          action?.reload();
                        }}
                      >
                        Mark as Completed
                      </Button>
                    );
                  } else if (ent.status === "Finished") {
                    if (
                      ent.applicants.some(
                        (s) =>
                          s.employeeId === userInfo.id &&
                          s.status === "Accepted"
                      ) &&
                      (!ent.ratings ||
                        ent.ratings.every((r) => r.raterId !== userInfo.id))
                    ) {
                      ret.push(
                        <Button
                          key="rate"
                          type="link"
                          onClick={() => {
                            setCurrentJobId(ent.id);
                            setRateModalOpen(true);
                          }}
                        >
                          Rate
                        </Button>
                      );
                    }
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
            width={1680}
            // closeIcon={false}
            maskClosable={false}
            footer={null}
            onCancel={() => {
              setModalOpen(false);
            }}
          >
            <Table
              // style={{ maxWidth: "1280px" }}
              dataSource={appliantsList}
              loading={appModalLoading}
              pagination={false}
              rowKey={"id"}
              // [{"status":"Accepted","jobId":"665c61bf3ea51933ad6f58dc","note":"","employeeId":"665b0c2d2a3461265d6a609a","createdAt":"2024-06-02T13:58:25.837Z","updatedAt":"2024-06-02T14:03:31.044Z","id":"665c7a81e1708e4ab53840f6"}]
              columns={[
                {
                  title: "Applicant",
                  dataIndex: "employee.name",
                  render: (_, ent) => ent.employee.name,
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
                  dataIndex: "employeeRating",
                  render: (v) => {
                    return <Rate disabled defaultValue={v} />;
                  },
                },
                {
                  title: "Actions",
                  key: "action",
                  // width: 200,
                  render: (_, ent) => {
                    return (
                      <Space size="small">
                        <Button
                          key="View Profile"
                          type="link"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`/profile/${ent.employeeId}`}
                        >
                          View Profile
                        </Button>
                        <Button
                          key="accept"
                          type="link"
                          onClick={() => {
                            client
                              .post("/applications/accept", {
                                applicationId: ent.id,
                              })
                              .then((resp) => {
                                console.log("accepted: ", resp.data);
                                tableRef.current?.reload();
                                setModalOpen(false);
                              });
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          key="Reject"
                          danger
                          type="link"
                          onClick={() => {
                            client
                              .post("/applications/reject", {
                                applicationId: ent.id,
                              })
                              .then((resp) => {
                                console.log("rejected: ", resp.data);
                                setModalOpen(false);
                              });
                          }}
                        >
                          Reject
                        </Button>
                      </Space>
                    );
                  },
                },
              ]}
            />
          </Modal>
          <Modal
            title="Rate"
            open={isRateModalOpen}
            maskClosable={false}
            centered
            footer={null}
            onCancel={() => {
              setRateModalOpen(false);
            }}
            destroyOnClose
            modalRender={(dom) => (
              <Form
                layout="vertical"
                form={ratingForm}
                name="form_in_modal"
                clearOnDestroy
                onFinish={async (values) => {
                  try {
                    const resp = await client.get(`/jobs/${currentJobId}`);
                    const data = resp.data;
                    console.log("laile!");
                    console.log(resp.data);
                    console.log(values);

                    const myApp = data.applicants.find((s) => {
                      if (userInfo.role === "employer") {
                        return s.status === "Accepted";
                      } else {
                        return s.employeeId === userInfo.id;
                      }
                    });
                    if (!myApp) {
                      throw new Error("no valid applicant found");
                    }

                    let recipientId;
                    if (userInfo.role === "employer") {
                      recipientId = myApp.employeeId;
                    } else {
                      // employee
                      recipientId = data.ownerInfo.id;
                    }

                    const applicationId = myApp.id;
                    const jobId = data.id;

                    await client.post("/rating/rate", {
                      ...values,
                      applicationId,
                      jobId,
                      recipientId,
                    });
                    setRateModalOpen(false);
                  } catch (e) {
                    console.error(e);
                    message.error("failed to save rating information: " + e);
                  } finally {
                    tableRef.current?.reload();
                  }
                }}
              >
                {dom}
              </Form>
            )}
          >
            <Form.Item name="rate" label="Rating">
              <Rate allowHalf />
            </Form.Item>
            <Form.Item name="comment" label="Comment">
              <Input type="textarea" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Modal>
        </ConfigProvider>
      </Paper>
    </Box>
  );
};

export default JobTable;
