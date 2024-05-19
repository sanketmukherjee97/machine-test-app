import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styles from "./ProductCards.module.css";
import Typography from "@mui/material/Typography";

interface ProductCardType {
  title?: string;
  price?: number;
  desc?: string;
  Image?: string;
  showCard?: boolean;
  onClick?: () => void;
}

const ProductCards = (props: ProductCardType) => {
  return (
    <Card
      sx={{ width: "100%", height: "100%", position: "relative" }}
      onClick={props?.onClick}
    >
      <CardMedia sx={{ height: 140 }} image={props.Image} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>
      </CardContent>
      {!props?.showCard ? <div className={styles.blackCover}></div> : null}
    </Card>
  );
};

export default ProductCards;
