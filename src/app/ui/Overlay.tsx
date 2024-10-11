"use client";

import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineLogin,
  AiOutlineShopping,
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { getAllBucket, getBucketElement, getListAll } from "../api";

import { Logo } from "@pmndrs/branding";
import { ModalDialog } from "./ModalDialog";
import { state } from "./store";
import { useSnapshot } from "valtio";
import { useState } from "react";

export function Overlay() {
  const snap = useSnapshot(state);
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <Logo width="40" height="40" />
        <motion.div
          animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }}
          transition={transition}
        >
          <div className="flex flex-row gap-4">
            <AiOutlineLogin size="2.5em" />
            <AiOutlineShopping size="2.5em" />
          </div>
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 5,
                  stiffness: 40,
                  restDelta: 0.001,
                  duration: 0.3,
                }}
              >
                <h1>Own Your Style, Imprint Yourself</h1>
              </motion.div>
              <div className="support--content">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2,
                  }}
                >
                  <p>
                    Create your unique and exclusive shirt with our brand-new 3D
                    AI based customization tool.&nbsp;
                    <strong>Unleash your imagination</strong> and define your
                    own style.
                  </p>
                  <button
                    style={{ background: snap.color }}
                    onClick={() => (state.intro = false)}
                  >
                    CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            <Customizer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Customizer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snap, setSnap] = useState(state);
  const [tumbnails, setTumbnails] = useState([]);

  const handleDisplayList = async () => {
    const list = await getListAll();
    console.log(list?.items.map((item) => item.name));
  };

  const handleGetBucket = async () => {
    const bucket = await getAllBucket();
    console.log(bucket);
  };

  const handleElementDownolad = async () => {
    const element = await getBucketElement("DevYourWebBlack.png");

    console.log(element);
  };

  return (
    <div className="customizer">
      <div className="color-options ">
        <div onClick={() => console.log(snap)}>SHOW STATE</div>
        <div onClick={handleDisplayList}>GetList</div>
        <div onClick={handleElementDownolad}>Download</div>
        <div onClick={handleGetBucket}>GetBucket</div>
        {snap.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color }}
            onClick={() => (state.color = color)}
          ></div>
        ))}
      </div>
      <div className="decals">
        <div className="decals--container">
          <button
            style={{ background: snap.color }}
            onClick={() => setIsModalOpen(true)}
          >
            Upload New Design
          </button>
          <ModalDialog
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSnap={setSnap}
          />
          {snap.decals.map((decal) => (
            <div
              key={decal}
              className={`decal `}
              onClick={() => (state.decal = decal)}
            >
              <img src={decal + "_thumb.png"} alt="brand" />
            </div>
          ))}
        </div>
      </div>
      {/* TO DO IMPLEMENT POSIBLE CAMERA WEAR */}
      {/* <button style={{ background: snap.color }}>Wear it</button> */}
      <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement("a");
          link.setAttribute("download", "canvas.png");
          const canvas = document.querySelector("canvas");
          if (canvas) {
            // Add null check
            link.setAttribute(
              "href",
              canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream")
            );
            link.click();
          } else {
            console.error("Canvas element not found.");
          }
        }}
      >
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      <button
        className="exit"
        style={{ background: snap.color }}
        onClick={() => (state.intro = true)}
      >
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
    </div>
  );
}
