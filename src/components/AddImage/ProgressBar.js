import React, { useEffect } from "react";
import useStorage from "../../lib/useStorage";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setFile, setForm }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setForm((prev) => ({ ...prev, imgUrl: url }));
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
