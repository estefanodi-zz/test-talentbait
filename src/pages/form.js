import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import createInputs from "../utils/forms/createForm.json";
import { validate } from "../helpers/validateForm";

import Button from "../components/button";
import Message from "../components/message";
import ImagesPreview from "../components/imagesPreview"

import "../styles/form.css";
import { widgetStyle } from "../styles/widgetstyles";

const initial = {
  title: "",
  description: "",
  url: "",
};

export default function Form({ formType, match }) {
  const [formData, setFormData] = useState(initial);
  const [images, setImages] = useState([
    { public_id: "", secure_url: "", id: 1 },
    { public_id: "", secure_url: "", id: 2 },
    { public_id: "", secure_url: "", id: 3 },
  ]);
  const inputsSelector = {
    create: createInputs.inputs,
  };
  const [message, setMessage] = useState({
    isVisible: false,
    text: "",
    icon: "error",
  });
  useEffect(() => {
    if (formType === "update") {
      console.log("update");
    }
  }, [formType]);
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
    //! ADD THE AD HERE AT THIS POINT
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
          console.log('result ===>',result[0])
          const temp = [...images];
          const index = temp.findIndex( obj => !obj.secure_url)
          temp[index] = {
            secure_url: result[0].secure_url,
            public_id: result[0].public_id
          }
          console.log('temp ===>',temp)
          setImages(temp);
        }
      }
    );
  };
  //*=======================================================================
  //*========================  DELETE IMAGE  ===============================
  //*=======================================================================
  const deleteImage = () => {

  }
  return (
    <div className="form-container">
      {message.isVisible && <Message text={message.text} icon={message.icon} />}

      <form onSubmit={handleSubmit}>
        <div className="form-header">Create Form</div>
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
        <ImagesPreview images={images} deleteImage={deleteImage}/>
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
};

Form.defaultProps = {
  formType: "create",
};
