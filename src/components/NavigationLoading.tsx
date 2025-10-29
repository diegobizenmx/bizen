"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NavigationLoadingProps {
  isLoading: boolean;
}

export default function NavigationLoading({ isLoading }: NavigationLoadingProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000",
            zIndex: 9999,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: 40,
              height: 40,
              border: "4px solid rgba(255,255,255,0.3)",
              borderTopColor: "#ffffff",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


