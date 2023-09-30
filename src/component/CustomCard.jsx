import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop:"10px",
    height:"200px",
    width: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    width: "500px"
  },
  cover: {
    width: 300,
  }
}));

export default function CustomCard({data}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        height="100%"
        className={classes.cover}
        image={data.field_photo_image_section}
        title="pic"
        alt="Paella dish"
        component="img"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography id="title" component="h6" variant="h6">
          {data.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          {moment(data.last_update).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
