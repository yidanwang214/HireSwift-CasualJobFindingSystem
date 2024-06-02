import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./JobTable.css";
import client from "../../utils/request";
import axios from "axios";
import { Button, ConfigProvider, Popconfirm, Tag } from "antd";
import { ProProvider, ProTable } from "@ant-design/pro-components";
import enGB from "antd/locale/en_GB";
import "dayjs/locale/en-au";
import { useSelector } from "react-redux";

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

const JobTable = () => {
  const columns = [{}];
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, padding: "16px 32px" }}>
        <ConfigProvider
          locale={enGB}
          theme={{
            token: {
              colorPrimary: "#1976d2",
              borderRadius: "4px",
            },
          }}
        >
          <ProProvider.Provider value={{}}>
            <ProTable
              rowKey={"id"}
              request={async (params, _, filter) => {
                try {
                  const resp = await client.post("/jobs/list", {
                    page: params.current,
                    limit: params.pageSize,
                    query: {
                      ...filter,
                      search: params.keyword,
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
                  dataIndex: "category",
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
                        <Button key="applicants" type="link">
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
                    return ret;
                  },
                },
              ]}
            />
          </ProProvider.Provider>
        </ConfigProvider>
      </Paper>
    </Box>
  );
};

export default JobTable;
