import React, { useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';

//import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

interface StyledTabProps {
  label: string;
}

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  flexContainer: {
    justifyContent: 'flex-end'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#A942E9',
    '& > span': {
      maxWidth: 40,
      width: '100%'
      // backgroundColor: '#616161'
    }
  }
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'uppercase',
      color: theme.palette.common.white,
      minWidth: 40,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1
      }
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#424242',
      marginBottom: theme.spacing(2),
      color: '#E0E0E0'
    },
    title: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2),
      fontSize: 24
    },
    subtitle: {
      textTransform: 'uppercase',
      fontSize: 12
    }
  })
);

export const BalanceComponent = React.memo(function Wallet() {
  //const modalRef = useRef();

  //const showModal = () => {
  //const modal = myRef.current;
  //setTimeout(async () => {
  //try {
  //// Wait user to confirm !
  //const result = await modal.show();
  //const extensions = await web3Enable('my cool dapp');
  //if (extensions.length === 0) {
  //// no extension installed, or the user did not accept the authorization
  //// in this case we should inform the use and give a link to the extension
  //return;
  //}

  //// we are now informed that the user has at least one extension and that we
  //// will be able to show and use accounts
  //const allAccounts = await web3Accounts();
  //} catch (err) {
  //alert('CANCEL');
  //}
  //}, 100);
  //console.log('Waiting user for confirmation ...');
  //};

  const style = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div className={style.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography className={style.title} variant="h5">
            Total Balance
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={style.title} variant="h5">
            357 <span className={style.subtitle}>Myria</span>
          </Typography>
        </Grid>
      </Grid>
      <StyledTabs value={value} onChange={handleChange}>
        <StyledTab label="All" />
        <StyledTab label="In" />
        <StyledTab label="Out" />
      </StyledTabs>
    </div>
  );
});
