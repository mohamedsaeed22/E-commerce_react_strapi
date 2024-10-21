import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const MyModal = ({
  onClose,
  isOpen,
  title,
  children,
  okText,
  onOkClick,
  isLoading,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            variant={"outline"}
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onOkClick} isLoading={isLoading}>
            {okText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
