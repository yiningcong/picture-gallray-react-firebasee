import classes from "./ImagesList.module.css";

import { motion } from "framer-motion";
import ImageItem from "./ImageItem";

const ImagesList = (props) => {
  return (
    <section className={classes.starting}>
      <div className={classes.imgGrid}>
        {props.imgSet &&
          props.imgSet.map((img) => (
            <ImageItem
              key={img.id}
              id={img.id}
              title={img.title}
              imgUrl={img.imgUrl}
              uid={img.uid}
              isSaved={props.isSaved}
              board={props.board}
              user={props.userId}
            />
          ))}
      </div>
    </section>
  );
};

export default ImagesList;
