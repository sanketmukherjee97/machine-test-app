import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styles from "./ProductCards.module.css";
import Typography from "@mui/material/Typography";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ProductCardType {
  id?: string;
  title?: string;
  price?: number;
  desc?: string;
  Image?: string;
  showCard?: boolean;
  onClick?: () => void;
}

const ProductCards = ({ id = "0", ...props }: ProductCardType) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className={styles.card}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card sx={{ width: "100%", height: "100%", position: "relative" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.Image}
          title={props.title}
        />
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
    </div>
  );
};

export default ProductCards;
