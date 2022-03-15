import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import {AvatarProps, AvatarSize} from './Avatar.interfaces';

export const useStyles = makeStyles<Theme, AvatarProps>(theme =>
  createStyles({
    root: {
      background: props => (props.deleted ? theme.palette.secondary.main : '#BDBDBD'),
      width: props => {
        let size: number = theme.spacing(4.5);

        if (props.size === AvatarSize.TINY) {
          size = theme.spacing(3);
        }

        if (props.size === AvatarSize.MEDIUM) {
          size = theme.spacing(5);
        }

        if (props.size === AvatarSize.LARGE) {
          size = theme.spacing(6);
        }

        return size;
      },
      height: props => {
        let size: number = theme.spacing(4.5);

        if (props.size === AvatarSize.TINY) {
          size = theme.spacing(3);
        }

        if (props.size === AvatarSize.MEDIUM) {
          size = theme.spacing(5);
        }

        if (props.size === AvatarSize.LARGE) {
          size = theme.spacing(6);
        }

        return size;
      },

      '& .MuiSvgIcon-root': {
        fill: '#FFF',
      },
    },
  }),
);
