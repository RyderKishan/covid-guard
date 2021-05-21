import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { DialogActions } from './styles';
import InfoStep from './InfoStep';
import FilterStep from './FilterStep';
import CreateStep from './CreateStep';

const allSteps = [
  {
    key: 0,
    label: 'Info',
    next: () => true
  },
  {
    key: 1,
    label: 'Filters',
    next: (formik) =>
      formik.values.district &&
      formik.values.district.length > 0 &&
      formik.values.district.length < 4
  },
  {
    key: 2,
    label: 'Create',
    next: () => false
  }
];

const MonitorDialog = (props) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const { formik, showMonitorDialog, toggleMonitoDialog, states, filters } =
    props;

  const [activeStep, setActiveStep] = React.useState(0);
  // const [name, setName] = React.useState('');

  const monitorFormik = useFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      monitorInterval: Yup.number()
    }),
    enableReinitialize: true,
    initialValues: {
      name: '',
      monitorInterval: 30
    }
  });

  const closeModal = (flag) => {
    toggleMonitoDialog(flag);
    setActiveStep(0);
  };

  return (
    <Dialog
      fullScreen={!matches}
      maxWidth="sm"
      onClose={() => closeModal(false)}
      open={showMonitorDialog}
    >
      <DialogTitle>Create a Monitor</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {allSteps.map((stp) => (
            <Step key={stp.key}>
              {matches ? <StepLabel>{stp.label}</StepLabel> : <StepLabel />}
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <InfoStep />}
        {activeStep === 1 && (
          <FilterStep
            states={states}
            monitorFormik={monitorFormik}
            // setName={setName}
            formik={formik}
          />
        )}
        {activeStep === 2 && (
          <CreateStep
            filters={filters}
            formik={formik}
            monitorFormik={monitorFormik}
          />
        )}
      </DialogContent>
      <DialogActions>
        <div>
          <Button color="primary" onClick={() => closeModal(false)}>
            Cancel
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              !allSteps[activeStep].next(formik) ||
              activeStep === allSteps.length - 1
            }
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

MonitorDialog.defaultProps = {
  states: [],
  filters: {},
  formik: {},
  toggleMonitoDialog: () => {},
  showMonitorDialog: false
};

MonitorDialog.propTypes = {
  states: PropTypes.arrayOf(PropTypes.any),
  filters: PropTypes.any,
  formik: PropTypes.any,
  toggleMonitoDialog: PropTypes.func,
  showMonitorDialog: PropTypes.bool
};

export default MonitorDialog;
