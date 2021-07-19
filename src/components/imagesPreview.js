import { useState } from "react";
import PropTypes from "prop-types";

import { FiTrash } from "react-icons/fi";

const placeholder =
  "https://res.cloudinary.com/estefanodi2009/image/upload/v1626719135/picture_not_available_400-300.png";

const Image = ({ obj }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  return (
    <div
      className="image-box"
      onMouseEnter={() => obj.secure_url && setOverlayVisible(true)}
      onMouseLeave={() => obj.secure_url && setOverlayVisible(false)}
    >
      {overlayVisible && (
        <div className="image-overlay">
          <FiTrash color="white" size={25} />
        </div>
      )}
      <img key={obj.id} src={obj.secure_url || placeholder} alt={"preview"} />
    </div>
  );
};

export default function ImagesPreview({ images, deleteImage }) {
  return (
    <div className="images-container">
      {images.map((obj) => (
        <Image obj={obj} deleteImage={deleteImage}/>
      ))}
    </div>
  );
}

ImagesPreview.propTypes = {
  images: PropTypes.array,
};

ImagesPreview.defaultProps = {
  images: [],
};

Image.propTypes = {
  obj: PropTypes.object,
};

Image.defaultProps = {
  obj: {},
};
