import React, { useEffect } from 'react'
import { Button, FormControl, FormLabel, GridItem, Input, Heading, SimpleGrid, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from "react-hook-form";
import InputError from '../../components/InputError';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditArtist, useNewArtist } from './queries';
import { Artist } from '../../models';
import DatePicker from '../../components/DatePicker';

const schema = yup.object().shape({
  name: yup.string().required("fieldRequired"),
  rate: yup.number().typeError("fieldRequired").required("fieldRequired").min(0.000001, "enterValidValue"),
  streams: yup.number().typeError("fieldRequired").required("fieldRequired"),
  careerStart: yup.date().nullable(),
});

interface Props {
  artist: Artist,
  onClose: () => void,
}

const ArtistEdit = ({ artist, onClose }: Props) => {
  const { t } = useTranslation();

  const { register, control, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (artist) {
      reset({...artist, careerStart: artist.careerStart ? new Date(artist.careerStart) : null});
    } else {
      reset();
    }
  }, [artist])

  const { mutateAsync: editArtist, isLoading: editSubmitting } = useEditArtist();
  const { mutateAsync: newArtist, isLoading: createSubmitting } = useNewArtist();

  const submit = async (data) => {
    if (data.id > 0) {
      await editArtist(data);
    } else {
      await newArtist(data);
    }

    onClose();
  };

  return (
    <SimpleGrid columns={6} spacing={2} p={6}>

      <GridItem colSpan={[6]}>
        <Heading size="md">{t(artist ? 'editArtist' : 'newArtist')}</Heading>
      </GridItem>
      <GridItem colSpan={[6]}>
        <FormControl isRequired>
          <FormLabel htmlFor="name" fontSize="sm">{t("name")}</FormLabel>
          <Input id="name" isInvalid={errors.name} {...register("name")} />
          <InputError text={errors.name?.message} />
        </FormControl>
      </GridItem>

      <GridItem colSpan={[6]}>
        <FormControl isInvalid={errors.rate} isRequired>
          <FormLabel htmlFor="rate" fontSize="sm">{t("rate")}</FormLabel>
          <Input type="number" id="rate" isInvalid={errors.rate} {...register("rate")} />
          <InputError text={errors.rate?.message} />
        </FormControl>
      </GridItem>

      <GridItem colSpan={[6]}>
        <FormControl isInvalid={errors.streams} isRequired>
          <FormLabel htmlFor="streams" fontSize="sm">{t("streams")}</FormLabel>
          <Input type="number" id="streams" isInvalid={errors.streams} {...register("streams")} />
          <InputError text={errors.streams?.message} />
        </FormControl>
      </GridItem>

      <GridItem colSpan={[6]}>
        <FormControl isInvalid={errors.careerStart}>
          <FormLabel htmlFor="careerStart" fontSize="sm">{t('careerStart')}</FormLabel>
          <Controller control={control} name="careerStart"
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                id="careerStart"
                onChange={onChange}
                selected={value}
                onBlur={onBlur}
                dateFormat='dd/MM/yyyy'
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={56} />
            )} />
          <InputError text={errors.careerStart?.message} />
        </FormControl>
      </GridItem>

      <GridItem colSpan={[6]}>
        <HStack mt={3} justifyContent="flex-end">
          <Button variant="ghost" mr={3} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSubmit(submit)} isLoading={editSubmitting || createSubmitting}>
            {t('save')}
          </Button>
        </HStack>
      </GridItem>

    </SimpleGrid>
  )
}

export default ArtistEdit;