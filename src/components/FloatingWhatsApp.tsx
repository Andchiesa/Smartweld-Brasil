import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      href="https://wa.me/5521968998282?text=Falar%20com%20engenheiro%20humano"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group flex items-center justify-center isolate"
    >
      <motion.div
        animate={{
          boxShadow: ['0 0 0 0 rgba(37, 211, 102, 0.7)', '0 0 0 15px rgba(37, 211, 102, 0)'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute inset-0 rounded-full -z-10"
      />
      <MessageCircle className="w-7 h-7 fill-white" />
    </motion.a>
  );
}
