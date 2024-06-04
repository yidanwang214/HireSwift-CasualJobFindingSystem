import React, { useCallback, useEffect, useState } from "react";
import UserProfileHeader from "../UserProfileHeader/UserProfileHeader";
import EditableInfoCard from "../EditableInfoCard/EditableInfoCard";
import RatingHistory from "../RatingHistory/RatingHistory";
import { useParams } from "react-router-dom";
import client from "../../utils/request";
import axios from "axios";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState();
  const { userId } = useParams();

  useEffect(() => {
    const ac = new AbortController();

    client
      .get(`/users/${userId ?? ""}`, { signal: ac.signal })
      .then((resp) => {
        const ui = resp.data;
        setUserInfo((prev) => ({ ...prev, ...ui }));
        console.log(ui);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        console.error(e);
      });

    client
      .get(`/extInfo/${userId ?? ""}`, { signal: ac.signal })
      .then((resp) => {
        const ei = resp.data;
        setUserInfo((prev) => ({ ...prev, ...ei }));
        console.log(ei);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        console.error(e);
      });
    return () => {
      ac.abort();
    };
  }, [userId]);

  const saveUserInfo = useCallback(
    async (fieldName) => {
      const resp = await client.post("/extInfo/update", {
        [fieldName]: userInfo[fieldName],
      });
    },
    [userId, userInfo]
  );

  // for (let i = 1; i <= 10; i++) {
  //   user.ratings.push({
  //     employer: `Company ${i}`,
  //     jobTitle: `Job Title ${i}`,
  //     rating: (Math.random() * 4 + 1).toFixed(1),
  //     comment: `This is a longer comment for job ${i}, highlighting the excellent work done and the positive feedback from the employer. The project was completed successfully with great attention to detail and efficiency.`,
  //     profilePic: "https://via.placeholder.com/50",
  //   });
  // }

  const updateUserInfo = (field, value) => {
    console.log("onupdate", field, value);
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <UserProfileHeader user={userInfo ?? {}} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="md:col-span-3">
          <EditableInfoCard
            title="Introduction"
            value={userInfo?.introduction}
            onUpdate={(value) => updateUserInfo("introduction", value)}
            onSave={() => saveUserInfo("introduction")}
            readonly={!!userId}
          >
            <textarea
              value={userInfo?.introduction}
              className="border p-2 rounded w-full mt-2"
              maxLength={100}
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Title"
            value={userInfo?.title}
            onUpdate={(e) => updateUserInfo("title", e)}
            onSave={() => saveUserInfo("title")}
            readonly={!!userId}
          >
            <textarea
              value={userInfo?.title}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-1">
          <EditableInfoCard
            title="Location"
            value={userInfo?.location}
            onSave={(value) => updateUserInfo("location", value)}
            readonly={!!userId}
          >
            <input
              type="text"
              value={userInfo?.location}
              onChange={(e) => updateUserInfo("location", e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Hourly Rate"
            value={`$${userInfo?.hourlyRate ?? 0}/hr`}
            readonly={!!userId}
            onSave={(value) =>
              updateUserInfo(
                "hourlyRate",
                parseFloat(value.replace(/[^0-9.]/g, "")).toFixed(2)
              )
            }
          >
            <input
              type="text"
              value={`$${userInfo?.hourlyRate ?? 0}/hr`}
              onChange={(e) =>
                updateUserInfo(
                  "hourlyRate",
                  e.target.value.replace(/[^0-9.]/g, "")
                )
              }
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-1">
          <EditableInfoCard
            title="Hours per Week"
            value={userInfo?.hoursPerWeek}
            onSave={(value) => updateUserInfo("hoursPerWeek", value)}
            readonly={!!userId}
          >
            <input
              type="text"
              value={userInfo?.hoursPerWeek}
              onChange={(e) => updateUserInfo("hoursPerWeek", e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Education"
            value={userInfo?.education}
            onSave={(value) => updateUserInfo("education", value)}
            readonly={!!userId}
          >
            <textarea
              value={userInfo?.education}
              onChange={(e) => updateUserInfo("education", e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-1">
          <EditableInfoCard
            title="Licenses"
            value={userInfo?.licenses}
            onSave={(value) => updateUserInfo("licenses", value)}
            readonly={!!userId}
          >
            <textarea
              value={userInfo?.licenses}
              onChange={(e) => updateUserInfo("licenses", e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Skills"
            value={userInfo?.skills}
            onSave={(value) => updateUserInfo("skills", value)}
            readonly={!!userId}
          >
            <textarea
              value={userInfo?.skills}
              onChange={(e) => updateUserInfo("skills", e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-1">
          <EditableInfoCard
            title="Languages"
            value={userInfo?.languages}
            readonly={!!userId}
            onSave={() => {
              /* Handle save */
            }}
          >
            <div style={{ maxHeight: "100px", overflowY: "auto" }}>
              <div className="mt-2">
                <input
                  type="text"
                  value={userInfo?.languages}
                  onChange={(e) => {
                    updateUserInfo("languages", e.target.value);
                  }}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          </EditableInfoCard>
        </div>
      </div>
      <RatingHistory ratings={userInfo?.ratings ?? []} />
    </div>
  );
};

export default UserProfile;
