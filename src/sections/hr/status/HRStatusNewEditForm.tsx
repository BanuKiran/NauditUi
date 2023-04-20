import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';
import { TimePicker } from '@mui/lab';
import { Autocomplete, Box, Button, Card, Chip, Grid, Stack, TextField } from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import Image from '../../../components/Image';
import { HRStatus, HRStatusRequest } from '../../../@types/hrstatus';
import { dispatch, useSelector } from '../../../redux/store';
import { addHRStatus, updateHRStatus } from '../../../redux/slices/hrstatus';
import { UserState } from '../../../@types/nistuser';
import { getUsers } from '../../../redux/slices/user';
import { SoftwaresState } from 'src/@types/softwares';
import { getManufacturers, getSoftwares } from 'src/redux/slices/software';
import { HOST_API } from '../../../config';
import { format } from 'date-fns';
import { HRProjectState } from 'src/@types/hrproject';
import { getHRProject } from 'src/redux/slices/hrproject';
import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<HRStatus> {
  softwareids: string[];
}

type Props = {
  isEdit: boolean;
  currentHRStatus?: HRStatus;
};

export default function HRStatusNewEditForm({ isEdit, currentHRStatus }: Props) {
  const navigate = useNavigate();
  const { users } = useSelector((state: { user: UserState }) => state.user);
  const { hrProjects } = useSelector((state: { hrproject: HRProjectState }) => state.hrproject);
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description is required'),
    task: Yup.string().required('task is required'),
    attachments: Yup.string().required('attachments is required'),
    workDate: Yup.string().required('WorkDate is required'),
    startTime: Yup.string().required('Start Time are required'),
    endTime: Yup.string().required('End Time are required'),
    durations: Yup.number().positive().integer().required('durations are required'),
    tags: Yup.string().required('tag is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentHRStatus?.id || '',
      name: currentHRStatus?.name || '',
      title: currentHRStatus?.title || '',
      description: currentHRStatus?.description || '',
      task: currentHRStatus?.task || '',
      attachments: currentHRStatus?.attachments || '',
      workDate: currentHRStatus?.workDate,
      startTime: currentHRStatus?.startTime || '',
      endTime: currentHRStatus?.endTime || '',
      durations: currentHRStatus?.durations,
      tags: currentHRStatus?.tags || '',
    }),

    [currentHRStatus]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentHRStatus) {
      reset(defaultValues);
    }

    if (!isEdit) {
      reset(defaultValues);
    }

  }, [isEdit, currentHRStatus]);

  useEffect(() => {
    dispatch(getHRProject());

  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    const request: HRStatusRequest = {
      name: data.name,
      title: data.title,
      description: data.description,
      task: data.task,
      attachments: data.attachments,
      workDate: moment(data.workDate).format('YYYY-MM-DD'),
      startTime: data.startTime,
      endTime: data.endTime,
      durations: data.durations,
      tags: data.tags,
    };

    try {
      if (isEdit && currentHRStatus) {
        request.id = data.id;
        dispatch(updateHRStatus(request));
      }

      if (!isEdit) {
        dispatch(addHRStatus(request));
        reset();
      }

      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');

      navigate(PATH_DASHBOARD.hr.status);
    } catch (error) {
      console.error(error);
    }
  };

  const [value, setValue] = React.useState<Date | null>(new Date());
  const [values, setValues] = React.useState<Date | null>(new Date());

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="task" label="Task" />
              <RHFTextField name="attachments" label="Attachments" />
              <Controller
                name="workDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="workDate"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              <RHFTextField name="startTime" label="Start Time" />
              <RHFTextField name="endTime" label="End Time" />
              <RHFTextField name="durations" label="Durations" />
              <RHFTextField name="tags" label="Tags" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="description" multiline rows={4} label="Description" />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Status' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

//-------------------------------