import React from 'react'
import { useDropzone, Accept } from 'react-dropzone'
import { Center, Icon, Text } from '@chakra-ui/react'
import { FiFilePlus as AddFileIcon } from 'react-icons/fi'
import { t } from 'i18next';

const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes == 0) return '0 Bytes';

  const k = 1024,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

interface Props {
  accept: Accept,
  isInvalid?: boolean,
  file: File,
  handleFile: (file: File) => void,
}

export const Dropzone = ({ accept, isInvalid, file, handleFile }: Props) => {

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles?.[0]

    if (!file) return;

    handleFile(file);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  const dropText = isDragActive ? t("dropFile") : t("dragFile");

  const borderColor = isInvalid ? 'red' : (isDragActive ? 'teal.400' : 'gray.400');

  return (
    <Center
      p={10}
      w="100%"
      cursor="pointer"
      color='gray.500' 
      bg={isDragActive ? 'gray.100' : 'gray.50'}
      _hover={{ bg: 'gray.100'  }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="2px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={AddFileIcon} mr={2} />

      {file ?
        <Text>{file.name} - {formatBytes(file.size)}</Text>
        :
        <Text>{dropText}</Text>
      }
      
    </Center>
  )
}

export default Dropzone;