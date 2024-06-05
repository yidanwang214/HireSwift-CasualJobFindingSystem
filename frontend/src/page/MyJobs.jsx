import React, { useState } from "react";
import JobTable from "../components/JobTable/JobTable";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import { JobPublishForm } from "../components/JobPublishForm/JobPublish";
import client from "../utils/request";

const MyJobs = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [randomSeed, setRandomSeed] = useState(1.0);
  return (
    <>
      <ProfileHeader
        user={user}
        onPublishClick={() => {
          setDrawerOpen(true);
        }}
      />
      <JobTable randomSeed={randomSeed} />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <JobPublishForm
          onSubmit={async (values) => {
            console.log("we finally got: ", values);
            const ss = parseInt(values.salaryStart);
            const se = parseInt(values.salaryEnd);
            if (ss < 0 || se < 0) {
              console.error("salary should be positive or 0");
              return;
            }
            if (se < ss) {
              values.salaryEnd = values.salaryStart;
            }
            values.salaryPerHour = values.salaryStart + "-" + values.salaryEnd;

            const resp = await client.post("/jobs/create", {
              title: values.title,
              tags: values.tags,
              description: values.description,
              categoryId: values.categoryId,
              salaryPerHour: values.salaryPerHour,
              location: values.location,
              contact: values.contact,
              image: values.image,
            });
            console.log(resp.data);
            setDrawerOpen(false);
            setRandomSeed(Math.random());
          }}
        />
      </Drawer>
    </>
  );
};

export default MyJobs;
