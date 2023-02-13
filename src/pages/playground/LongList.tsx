/*
 * @Author: your name
 * @Date: 2021-08-30 15:34:23
 * @LastEditTime: 2021-08-30 16:18:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/pages/playground/LongList.tsx
 */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

export default function VirtualizedList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <FixedSizeList height={400} width={300}>
        {renderRow}
      </FixedSizeList> */}
    </div>
  );
}
