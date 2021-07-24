import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    position:'relative',
  },
});

export default function ImgMediaCard({image,name}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100"
          image={image}
          title="Contemplative Reptile"
        />
       <div style={{position:'absolute',top:'50%',left:'35%',color:'white'}}>
         {name.toUpperCase()}
       </div>
      </CardActionArea>
    </Card>
  );
}