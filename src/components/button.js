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
}) {
  return (
    <button type={type} className={className} onClick={() => action()}>
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
};

Button.defaultProps = {
  type: "button",
  title: "Click me",
  titleType: "text",
  icon: "upload",
  action: () => {},
  className: "",
};
