import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import createForm from "../utils/forms/createForm.json";
import updateForm from "../utils/forms/updateForm.json";

import { validate } from "../helpers/validateForm";

import Button from "../components/button";
import Message from "../components/message";
import ImagesPreview from "../components/imagesPreview";

import "../styles/form.css";
import { widgetStyle } from "../styles/widgetstyles";

export default function Form({ formType, match, method, ads }) {
  const initial = {
    title: "",
    description: "",
    url: "",
    productName: match.params.productName,
  };
  const [formData, setFormData] = useState(formType === "create" && initial);
  const [images, setImages] = useState([
    { public_id: "", secure_url: "", id: 0 },
    { public_id: "", secure_url: "", id: 1 },
    { public_id: "", secure_url: "", id: 2 },
  ]);
  const inputsSelector = {
    create: createForm.inputs,
    update: updateForm.inputs,
  };
  const [message, setMessage] = useState({
    isVisible: false,
    text: "",
    icon: "error",
  });

  useEffect(() => {
    if (formType === "update" && ads.length !== 0) {
      const ad = ads.find((ad) => ad.productName === match.params.productName);
      const tempImages = [...images];
      ad.images.forEach((im, idx) => (tempImages[idx] = im));
      setImages(tempImages);
      delete ad.images;
      setFormData(ad);
    }
  }, [formType, ads]);
  //*=======================================================================
  //*======================  SUBMIT FORM  ==================================
  //*=======================================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validate(formData);
    if (!result[0])
      return setMessage({ isVisible: true, text: result[1], icon: "error" });
    if (images.length === 0)
      return setMessage({
        isVisible: true,
        text: "Upload at least 1 image",
        icon: "error",
      });
    if (images.length === 5)
      return setMessage({
        isVisible: true,
        text: "You can upload maximum 5 images",
        icon: "error",
      });
    method({ ...formData, images });

    setFormData(initial);
    return setMessage({
      isVisible: true,
      text: "Success",
      icon: "success",
    });
  };
  //*=======================================================================
  //*======================  CLOUDINARY WIDGET  ============================
  //*=======================================================================
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
        tags: ["ad-image"],
        stylesheet: widgetStyle,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error");
        } else {
          const temp = [...images];
          const index = temp.findIndex((obj) => !obj.secure_url);
          temp[index] = {
            secure_url: result[0].secure_url,
            public_id: result[0].public_id,
          };
          setImages(temp);
        }
      }
    );
  };
  //*=======================================================================
  //*========================  DELETE IMAGE  ===============================
  //*=======================================================================
  const deleteImage = (public_id) => {
    const temp = [...images];
    const index = temp.findIndex((im) => im.public_id === public_id);
    temp[index] = { public_id: "", secure_url: "", id: index };
    setImages(temp);
    //! MISSING DELETING IMAGE FROM CLOUDINARY
  };
  //*=======================================================================
  //*============================  RENDER  =================================
  //*=======================================================================
  return (
    <div className="form-container">
      {message.isVisible && <Message text={message.text} icon={message.icon} />}

      <form onSubmit={handleSubmit}>
        <div className="form-header">
          {formType === "create" ? "Create Form" : "Update Form"}
        </div>
        {inputsSelector[formType].map((inp) => {
          return (
            <>
              <label>{inp.name}</label>
              {inp.isTextArea ? (
                <textarea
                  name={inp.name}
                  placeholder={inp.placeholder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formData[inp.name]}
                ></textarea>
              ) : (
                <input
                  name={inp.name}
                  placeholder={inp.placeholder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formData[inp.name]}
                />
              )}
            </>
          );
        })}
        <ImagesPreview images={images} deleteImage={deleteImage} />
        <div className="form-buttons-container">
          <Button
            title={"Submit"}
            type={"submit"}
            className={"form-button"}
            action={() => {}}
          />
          <Button
            title={"Upload Image"}
            titleType={"icon"}
            icon={"upload"}
            type={"button"}
            className={"upload-button"}
            action={uploadWidget}
            disabled={images.filter((obj) => obj.secure_url).length === 3}
          />
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  formType: PropTypes.string,
  match: PropTypes.object,
  method: PropTypes.func,
  ads: PropTypes.array,
};

Form.defaultProps = {
  formType: "create",
  match: {},
  method: () => console.log("Default form method"),
  ads: [],
};
