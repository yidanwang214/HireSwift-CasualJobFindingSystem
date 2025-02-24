import { InboxOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ConfigProvider, Upload, notification } from "antd";
import { useState } from "react";

export const categories = [
  {
    category: "Others",
    id: 0,
  },
  {
    category: "Accounting",
    id: 1,
  },
  {
    category: "Administration & Office Support",
    id: 2,
  },
  {
    category: "Advertising, Arts & Media",
    id: 3,
  },
  {
    category: "Banking & Financial Services",
    id: 4,
  },
  {
    category: "Call Centre & Customer Service",
    id: 5,
  },
  {
    category: "CEO & General Management",
    id: 6,
  },
  {
    category: "Community Services & Development",
    id: 7,
  },
  {
    category: "Construction",
    id: 8,
  },
  {
    category: "Consulting & Strategy",
    id: 9,
  },
  {
    category: "Design & Architecture",
    id: 10,
  },
  {
    category: "Education & Training",
    id: 11,
  },
  {
    category: "Engineering",
    id: 12,
  },
  {
    category: "Farming, Animals & Conservation",
    id: 13,
  },
  {
    category: "Government & Defence",
    id: 14,
  },
  {
    category: "Healthcare & Medical",
    id: 15,
  },
  {
    category: "Hospitality & Tourism",
    id: 16,
  },
  {
    category: "Human Resources & Recruitment",
    id: 17,
  },
  {
    category: "Information & Communication Technology",
    id: 18,
  },
  {
    category: "Insurance & Superannuation",
    id: 19,
  },
  {
    category: "Legal",
    id: 20,
  },
  {
    category: "Manufacturing, Transport & Logistics",
    id: 21,
  },
  {
    category: "Marketing & Communications",
    id: 22,
  },
  {
    category: "Mining, Resources & Energy",
    id: 23,
  },
  {
    category: "Real Estate & Property",
    id: 24,
  },
  {
    category: "Retail & Consumer Products",
    id: 25,
  },
  {
    category: "Sales",
    id: 26,
  },
  {
    category: "Science & Technology",
    id: 27,
  },
  {
    category: "Self Employment",
    id: 28,
  },
  {
    category: "Sport & Recreation",
    id: 29,
  },
  {
    category: "Trades & Services",
    id: 30,
  },
];

export const JobPublishForm = ({ onSubmit }) => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [formValue, setFormValue] = useState({
    categoryId: 0,
    title: "",
    description: "",
    image: undefined,
  });

  return (
    <Box
      sx={{ width: 480, padding: "16px 16px" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.({ ...formValue, tags: tags });
      }}
    >
      {/* Form to create new job */}
      <Typography variant="h4" gutterBottom>
        Publish New Job
      </Typography>
      <TextField
        required
        label="Job Title"
        margin="normal"
        fullWidth
        id="jobTitle"
        name="title"
        value={formValue?.title}
        onChange={(e) => {
          setFormValue({ ...formValue, title: e.target.value });
        }}
      />
      <TextField
        required
        label="Job Description"
        margin="normal"
        fullWidth
        id="jobDesc"
        name="description"
        multiline
        value={formValue?.description}
        onChange={(e) => {
          setFormValue({ ...formValue, description: e.target.value });
        }}
        rows={6}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Tag"
          margin="normal"
          value={currentTag}
          onChange={(event) => {
            setCurrentTag(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            setTags([...tags, currentTag]);
            setCurrentTag("");
          }}
        >
          Add Tag
        </Button>
      </div>

      <Stack
        direction={"row"}
        spacing={2}
        sx={{ overflow: "auto", padding: "16px 16px" }}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => {
              setTags(tags.filter((t) => t !== tag));
            }}
          />
        ))}
      </Stack>

      <Select
        label="Category"
        name="categoryId"
        fullWidth
        value={formValue?.categoryId}
        onChange={(e) => {
          setFormValue({ ...formValue, categoryId: e.target.value });
        }}
      >
        {categories.map((cat) => (
          <MenuItem value={cat.id} key={cat.id}>
            {cat.category}
          </MenuItem>
        ))}
      </Select>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <TextField
          type="number"
          label="Salary (Per hour) Start"
          required
          value={formValue?.salaryStart}
          onChange={(e) => {
            setFormValue({ ...formValue, salaryStart: e.target.value });
          }}
        />
        <TextField
          required
          type="number"
          label="Salary (Per hour) End"
          sx={{ marginLeft: "12px" }}
          value={formValue?.salaryEnd}
          onChange={(e) => {
            setFormValue({ ...formValue, salaryEnd: e.target.value });
          }}
        />
      </div>

      <TextField
        label="Location"
        margin="normal"
        fullWidth
        required
        value={formValue?.location}
        onChange={(e) => {
          setFormValue({ ...formValue, location: e.target.value });
        }}
      />

      <TextField
        label="Contact"
        margin="normal"
        fullWidth
        required
        value={formValue?.contact}
        onChange={(e) => {
          setFormValue({ ...formValue, contact: e.target.value });
        }}
      />

      <div
        style={{
          marginTop: "12px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle1">Cover Image Upload:</Typography>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            },
          }}
        >
          <Upload.Dragger
            name="file"
            maxCount={1}
            multiple={false}
            action={"http://localhost:3000/v1/upload"}
            onChange={(info) => {
              console.log("info: ", info);
              if (info.file.status === "done") {
                // upload completed
                setFormValue({ ...formValue, image: info.file.response });
                notification.info({ message: "Image upload completed" });
              } else if (info.file.status === "removed") {
                setFormValue({ ...formValue, image: undefined });
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag image to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for only single upload. Strictly prohibited from uploading
              company data or other banned files.
            </p>
          </Upload.Dragger>
        </ConfigProvider>
      </div>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ marginTop: "12px" }}
      >
        Publish
      </Button>
    </Box>
  );
};
