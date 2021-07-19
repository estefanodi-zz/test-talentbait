import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import createInputs from "../utils/forms/createForm.json";
import { validate } from "../helpers/validateForm";

import Button from "../components/button";
import Message from "../components/message";

import "../styles/form.css";
import { widgetStyle } from "../styles/widgetstyles";

const initial = {
  title: "",
  description: "",
  url: "",
};

const placeholder = 'https://res.cloudinary.com/estefanodi2009/image/upload/v1626719135/picture_not_available_400-300.png'

export default function Form({ formType, match }) {
  const [formData, setFormData] = useState(initial);
  const [images, setImages] = useState([
    { publicId: "", secureUrl: "", id: 1 },
    { publicId: "", secureUrl: "", id: 2 },
    { publicId: "", secureUrl: "", id: 3 },
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
          console.log("result ===>", result[0]);
          setImages([]);
        }
      }
    );
  };
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
        <div className="images-container">
          {images.map((obj) => (
            <img src={obj.secureUrl || placeholder} alt={"ad image"} />
          ))}
        </div>
        <div className="buttons-container">
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
            className={"form-button"}
            action={uploadWidget}
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
