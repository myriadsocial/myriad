import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';

import DialogTitle from '../common/DialogTitle.component';
import Divider from '../common/divider.component';
import { BalanceComponent } from '../wallet/balance.component';
import { GetMyriaTutorial } from './GetMyriaTutorial.component';
import { TransactionComponent } from './transaction.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%'
    },
    titleText: {
      textAlign: 'center',
      fontWeight: 700
    },
    button: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.white,
      borderRadius: 15
    }
  })
);

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#2D2D2D',
  padding: '12px 24px'
});

export const TippingJarComponent = forwardRef((_, ref) => {
  const [showTippingJar, setShowTippingJar] = useState(false);
  const styles = useStyles();

  const myriaTutorialRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    triggerTippingJar: () => {
      setShowTippingJar(true);
    }
  }));

  const closeTippingJar = () => {
    setShowTippingJar(false);
  };

  const handleClickTutorial = () => {
    myriaTutorialRef.current.triggerMyriaTutorial();
  };

  const TippingJarActions = (
    <>
      <Button onClick={handleClickTutorial} variant="contained" className={styles.button}>
        Get Myria Token
      </Button>
    </>
  );

  return (
    <>
      <Dialog open={showTippingJar} onClose={closeTippingJar} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <StyledDialogTitle id="name" onClose={closeTippingJar}>
          <Typography variant="h5" className={styles.titleText}>
            {' '}
            Tipping Jar
          </Typography>
        </StyledDialogTitle>
        <DialogActions>{TippingJarActions}</DialogActions>
        <DialogContent dividers>
          <BalanceComponent />
          <Divider />
          <TransactionComponent />
        </DialogContent>
      </Dialog>

      <GetMyriaTutorial ref={myriaTutorialRef} />
    </>
  );
});
