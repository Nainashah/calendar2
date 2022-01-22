import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
import Faker from '@faker-js/faker';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  IconButton,
  DialogActions,
  Avatar,
  Typography,
  Checkbox,
} from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function CalendarForm({ event, range, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const isCreating = Object.keys(event).length === 0;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      if (event.id) {
        dispatch(updateEvent(event.id, newEvent));
        enqueueSnackbar('Update success!');
      } else {
        enqueueSnackbar('Create success!');
        dispatch(createEvent(newEvent));
      }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Checkbox {...label} defaultChecked sx={{ width: 'max-content' }} />
          <Avatar alt={Faker.name.findName()} src={Faker.image.avatar()} />
          <Stack direction={'column'} spacing={1}>
            <Typography variant="subtitle2">{Faker.name.findName()}</Typography>
            <Typography variant="caption">{"Project Manager"}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
          Add
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
