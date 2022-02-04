import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  root: {
   maxWidth: '100%',
  },
  media: {
    height: 0,
    display: 'flex',
    paddingTop: '80%',
    backgroundColor: 'lavender',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  }
  }));