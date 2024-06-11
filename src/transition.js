import { motion } from "framer-motion";

const transition = (OgComponent) => {
  const WrappedComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <OgComponent />
    </motion.div>
  );

  WrappedComponent.displayName = `Transition(${OgComponent.displayName || OgComponent.name || "Component"})`;

  return WrappedComponent;
};

export default transition;
