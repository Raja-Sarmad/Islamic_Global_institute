import RegistrationModal from './RegistrationModal';

// Updated to handle course prop properly
const Modal = ({ isOpen, onClose, course }) => {
  return (
    <RegistrationModal
      isOpen={isOpen}
      onClose={onClose}
      courseTitle={course?.title || "Free Trial"}
    />
  );
};

export default Modal;