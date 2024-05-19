import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styles from "./ProductCards.module.css";
import Typography from "@mui/material/Typography";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Define the interface for the props that ProductCards will accept
interface ProductCardType {
  id?: string; // ID of the card, used for sortable functionality
  title?: string; // Title of the product
  price?: number; // Price of the product
  desc?: string; // Description of the product
  Image?: string; // URL of the product image
  showCard?: boolean; // Boolean to indicate if the card should be highlighted
  onClick?: () => void; // Optional click handler
}

const ProductCards = ({ id = "0", ...props }: ProductCardType) => {
  // useSortable hook from @dnd-kit to make the card draggable and sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  // Style transformation for dragging animations
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={styles.card}
      ref={setNodeRef} // Reference for the draggable node
      style={style} // Apply the drag transform styles
      {...attributes} // Draggable attributes
      {...listeners} // Drag event listeners
    >
      <Card sx={{ width: "100%", height: "100%", position: "relative" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.Image} // Display the product image
          title={props.title} // Image title (used for accessibility)
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
