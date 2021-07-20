import PropTypes from "prop-types";

import { BsUpload } from "react-icons/bs";

const iconSelector = {
  upload: <BsUpload />,
};

export default function Button({
  type,
  title,
  titleType = "text",
  icon = null,
  action,
  className,
  disabled,
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={() => action()}
      disabled={disabled}
    >
      {titleType === "text" ? title : iconSelector[icon]}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  titleType: PropTypes.string,
  icon: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: "button",
  title: "Click me",
  titleType: "text",
  icon: "upload",
  action: () => console.log("Default button action"),
  className: "",
  disabled: false,
};
