import { useState } from "react";
import { Upload, Button, message, Select, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageType, setImageType] = useState("");

  const handleFileChange = (info) => {
    const file = info.file.originFileObj;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!file || !imageType) {
      message.error("Please select an image and type");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", imageType);

    setUploading(true);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      message.success("Image uploaded successfully");
      console.log("Uploaded Image Path:", data.imagePath);
      setFile(null);
      setPreview(null);
      setImageType("");
    } catch (error) {
      message.error("Error uploading image");
      console.error(error);
    }

    setUploading(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-3">Upload Image</h2>

      <Select
        placeholder="Select Image Type"
        value={imageType}
        onChange={(value) => setImageType(value)}
        className="w-full mb-3"
      >
        <Option value="banner">Banner</Option>
        <Option value="offer">Offer</Option>
        <Option value="product">Product</Option>
        <Option value="order">Order</Option>
        <Option value="employee">Employee</Option>
        <Option value="profile">Profile</Option>
      </Select>

      <Upload
        beforeUpload={() => false}
        onChange={handleFileChange}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Select Image</Button>
      </Upload>

      {preview && (
        <div className="mt-3">
          <h3 className="text-sm font-medium">Preview:</h3>
          <Image src={preview} alt="Preview" width={200} />
        </div>
      )}

      <Button
        type="primary"
        onClick={handleUpload}
        loading={uploading}
        disabled={!file || !imageType}
        className="mt-3 w-full"
      >
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
