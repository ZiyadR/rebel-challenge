import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

interface Props {
  title?: string,
  body?: string,
  closeText?: string,
  acceptText?: string,
  isLoading?: boolean,
  isDangerous?: boolean,
  isOpen: boolean,
  onAccept: () => Promise<void>,
  onClose: () => void,
}

export const ConfirmModal = (props: Props) => {
  const { t } = useTranslation();

  const { title, body, closeText, acceptText, isDangerous, isOpen, isLoading, onAccept, onClose } = props;
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accept = async () => {
    if(isSubmitting) return;
    setIsSubmitting(true);

    await onAccept();
    
    setIsSubmitting(false);
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || t('confirmation')}</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          {body || t('areYouSure')}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} disabled={isLoading}>
            {closeText || t('no')}
          </Button>
          <Button colorScheme={isDangerous ? "red" : "blue"} onClick={accept} isLoading={isLoading}>
            {acceptText || t('yes')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}