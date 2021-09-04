import React, { useState } from 'react';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import AlignedText from '../../../../ui/AlignedText';
import IOFileUploadArea from '../../../../ui/IOFileUploadArea';

const useStyles = makeStyles(() => ({
  pageHeader: {
    marginBottom: '50px',
  },
  sampleArea: {
    marginTop: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  reminder: {
    color: '#AAAAAA',
  },
}));

export default function SampleUploadCard({
  popUp = false, closePopUp, selectedFile, setSelectedFile, handleTempUpload,
}) {
  const classes = useStyles();

  // const error = useSelector((state) => state.error);
  // const loading = useSelector((state) => state.loading.myClass.problem);

  const [time, setTime] = useState(100000);
  const [memory, setMemory] = useState(65535);

  const handleConfirm = () => {
    const newSelectedFile = selectedFile.map((data) => ({
      ...data,
      no: data.id,
      time_limit: time,
      memory_limit: memory,
    }));
    setSelectedFile(newSelectedFile);
    handleTempUpload(newSelectedFile);
    closePopUp();
  };

  const handleCancel = () => {
    setSelectedFile([]);
    closePopUp();
  };

  return (
    <>
      <Dialog
        open={popUp}
        onClose={() => closePopUp()}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Upload Sample Data</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Please name your files in the following manner:</Typography>
          <Typography variant="body2" className={classes.reminder}>sample1.in （範例測資 1 的 input）</Typography>
          <Typography variant="body2" className={classes.reminder}>sample1.out （範例測資 1 的 output）</Typography>
          <AlignedText text="Default Time(ms)" childrenType="field">
            <TextField
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </AlignedText>
          <AlignedText text="Default Memory(kb)" childrenType="field">
            <TextField
              id="memory"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
            />
          </AlignedText>
          <IOFileUploadArea text="Sample Data" uploadCase="sample" selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="default">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
