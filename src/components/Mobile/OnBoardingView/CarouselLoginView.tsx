import React from 'react';
import Carousel from 'react-elastic-carousel';

import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import Illustration from 'src/images/illustration/amico.svg';
import Illustration3 from 'src/images/illustration/gdpr_-_amico.svg';
import Illustration2 from 'src/images/illustration/money_income_-_amico.svg';
import i18n from 'src/locale';

type CarouselLoginViewProps = {
  onSignIn: () => void;
};

const useStyles = makeStyles<Theme, CarouselLoginViewProps>(theme =>
  createStyles({
    root: {
      background: '#FFF',
      minHeight: '100vh',
      paddingTop: 60,
      paddingBottom: 28,
      textAlign: 'center',
    },
    mb6: {
      marginBottom: theme.spacing(6),
    },
    mb8: {
      marginBottom: theme.spacing(8),
    },
    carousel: {
      marginBottom: theme.spacing(3),
      width: '100vw',
      '& .rec-slider-container': {
        margin: 0,
      },
      '& .rec.rec-arrow': {
        visibility: 'hidden',
        display: 'none',
      },
      '& .rec.rec-dot': {
        background: '#DECCFF',
        boxShadow: 'none',
        width: '12px',
        height: '12px',
      },
      '& .rec.rec-dot.jJKuoL': {
        width: '28px',
        background: theme.palette.primary.main,
        borderRadius: 20,
      },
      '& .rec.rec-dot:focus': {
        background: theme.palette.primary.main,
        width: '28px',
        borderRadius: 20,
      },
      '& .rec-carousel-wrapper': {
        alignItems: 'center',
      },
    },
    title: {
      lineHeight: '33.6px',
      fontWeight: 600,
      fontSize: '28px',
    },
    subtitle: {
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: '19.6px',
      fontSize: '14px',
    },
  }),
);

export const CarouselLoginView: React.FC<CarouselLoginViewProps> = props => {
  const {onSignIn} = props;
  const style = useStyles({...props});

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignContent="center"
      className={style.root}>
      <Grid item xs>
        <div className={style.carousel}>
          <Carousel isRTL={false} itemsToShow={1}>
            <div>
              <div className={style.mb8}>
                <Illustration />
              </div>
              <Typography
                variant="h2"
                className={`${style.title}`}
                component="span"
                gutterBottom={true}
                color="primary">
                <Typography variant="h2" className={style.title} component="span" color="primary">
                  {i18n.t('Login.Layout.Carousel_Title_1_left')}
                </Typography>{' '}
                {i18n.t('Login.Layout.Carousel_Title_1_right')}
              </Typography>
              <Typography variant="h4" className={style.subtitle} component="p" color="textPrimary">
                {i18n.t('Login.Layout.Carousel_Subtitle_1a')}
              </Typography>
              <Typography variant="h4" className={style.subtitle} component="p" color="textPrimary">
                {i18n.t('Login.Layout.Carousel_Subtitle_1b')}
              </Typography>
            </div>

            <div>
              <div className={style.mb8}>
                <Illustration2 />
              </div>
              <Typography
                variant="h2"
                className={style.title}
                component="span"
                color="primary"
                gutterBottom={true}>
                <Typography variant="h2" className={style.title} component="span" color="primary">
                  {i18n.t('Login.Layout.Carousel_Title_2_left')}
                </Typography>{' '}
                {i18n.t('Login.Layout.Carousel_Title_2_right')}
              </Typography>
              <Typography variant="h4" className={style.subtitle} component="p" color="textPrimary">
                {i18n.t('Login.Layout.Carousel_Subtitle_2')}
              </Typography>
            </div>

            <div>
              <div className={style.mb8}>
                <Illustration3 />
              </div>
              <Typography
                variant="h2"
                className={style.title}
                component="span"
                color="primary"
                gutterBottom={true}>
                {i18n.t('Login.Layout.Carousel_Title_3')}
              </Typography>
              <Typography variant="h4" className={style.subtitle} component="p" color="textPrimary">
                {i18n.t('Login.Layout.Carousel_Subtitle_3')}
              </Typography>
            </div>
          </Carousel>
        </div>
      </Grid>
      <Grid item xs>
        <Button variant="contained" color="primary" onClick={onSignIn}>
          {i18n.t('Login.Layout.Btn_Signin')}
        </Button>
      </Grid>
    </Grid>
  );
};
