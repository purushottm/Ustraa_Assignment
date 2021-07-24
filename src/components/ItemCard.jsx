import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight:'11rem',
    maxHeight:'11rem'
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    flexDirection: "column",
  },
  cover: {
    width: "35%",
  },
  controls: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const { value } = props;
//   console.log(props);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={value.image_urls_webp.x240}
        title={value.image_urls_webp.x200}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="subtitle2" variant="subtitle2">
            {value.name}{" "}
            {value?.rating ? (
              <span style={{ color: "grey", paddingLeft: "8px" }}>
                {value.rating}*
              </span>
            ) : null}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {value.weight === 0
              ? null
              : `(${value.weight}${value.weight_unit}) `}
          </Typography>
          <Typography variant="subtitle1">
            ₹{value.final_price}{" "}
            <span
              style={{
                color: "grey",
                textDecoration: "line-through",
                fontSize: "0.8rem",
              }}
            >
              ₹{value.price}
            </span>
          </Typography>
          <Typography variant="caption">
          { value.cashback_percentage ? `(${value.cashback_percentage}% OFF)`:null}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!value.is_in_stock}
          >
            {value.is_in_stock ? "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
