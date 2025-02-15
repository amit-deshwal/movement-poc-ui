import { FC } from "react";
import { ConnectButton } from "@razorlabs/razorkit";
import { motion } from "framer-motion";

const LandingPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-black">
      <motion.h1
        className="text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to NextGen AI Web3
      </motion.h1>
      <motion.p
        className="text-xl mb-8 text-center max-w-2xl text-gray-300"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Experience the future of decentralized applications powered by
        artificial intelligence.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ConnectButton
          className="!bg-gradient-to-r !from-purple-500 !to-blue-500 !text-white !font-semibold !py-4 !px-6 !rounded-full 
             !shadow-lg !hover:shadow-xl !transform !transition-transform !duration-300 
             hover:scale-105 hover:bg-gradient-to-l"
          style={{
            backgroundImage: "linear-gradient(to right, #6b46c1, #4299e1)", // Gradient background
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Shadow effect
            transition: "transform 0.3s ease", // Smooth scaling transition
          }}
        />
      </motion.div>
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <FeatureCard
          title="AI-Powered"
          description="Leverage cutting-edge AI algorithms for enhanced decision-making and user experiences."
          icon="🧠"
        />
        <FeatureCard
          title="Decentralized"
          description="Enjoy the benefits of a truly decentralized application with full control over your data."
          icon="🔗"
        />
        <FeatureCard
          title="Secure"
          description="Rest easy knowing your transactions and data are protected by advanced cryptography."
          icon="🔒"
        />
      </motion.div>
    </div>
  );
};

const FeatureCard: FC<{ title: string; description: string; icon: string }> = ({
  title,
  description,
  icon,
}) => (
  <div className="bg-gray-900 p-6 rounded-lg">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export default LandingPage;
