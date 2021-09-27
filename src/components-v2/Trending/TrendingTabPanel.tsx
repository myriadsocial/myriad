import React from 'react';

import Typography from '@material-ui/core/Typography';

import {TrendingList} from './TrendingList';
import {useStyles} from './trending-tab-panel.styles';

import {Tag} from 'src/interfaces/experience';

type TrendingTabPanelProps = {
  trendings: Tag[];
};

export const TrendingTabPanel: React.FC<TrendingTabPanelProps> = props => {
  const {trendings} = props;
  const styles = useStyles();

  return (
    <div className={styles.root} id="worldwide">
      <div style={{marginBottom: 20}}>
        <Typography variant="h4">{'Trends'}</Typography>
      </div>
      <div className={styles.content}>
        <TrendingList trendings={trendings} />
      </div>
    </div>
  );
};
