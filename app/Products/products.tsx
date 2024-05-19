"use client";
import React, { useEffect, useState, useCallback, memo } from "react";
import styles from "./products.module.css";
import { getProducts } from "../apicalls/apicalls";
import { Grid } from "@mui/material";
import ProductCards from "../components/ProductCards/ProductCards";
import { ProductType } from "../apicalls/apicalls";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

const Products = () => {
  // State to hold products data
  const [products, setProducts]: any = useState([]);
  // State to hold the index of the selected card
  const [selectedCard, setSelectedCard]: any = useState(0);

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        console.log("Error-------", error);
      });
  }, []);

  // Add event listener for keyboard navigation
  useEffect(() => {
    window.addEventListener("keydown", detectKeyDown, true);
    return () => {
      window.removeEventListener("keydown", detectKeyDown);
    };
  }, []);

  // Function to handle keyboard navigation
  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      console.log(selectedCard);
      e.preventDefault();
      setSelectedCard((prevCard: any) => prevCard - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSelectedCard((prevCard: any) => prevCard + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedCard((prevCard: any) => prevCard - 4);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedCard((prevCard: any) => prevCard + 4);
    } else {
    }
  };

  // Handle drag end event
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    let pro = products;
    let temp;
    console.log("Dreaged", active, over);
    setSelectedCard(parseInt(over?.id));
    temp = pro[parseInt(active?.id)];
    pro[parseInt(active?.id)] = pro[parseInt(over?.id)];
    pro[parseInt(over?.id)] = temp;
    setProducts(pro);
  };

  // Handle drag start event
  const handleDragStart = (event: any) => {
    const { active, over } = event;
    setSelectedCard(parseInt(active?.id));
  };

  return (
    <div className={styles.products}>
      <h1 className={styles.heading}>Next.js Machine Test</h1>
      {products.length !== 0 ? (
        <div className={styles.productViewer}>
          <Grid container spacing={2}>
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={products}
                strategy={verticalListSortingStrategy}
              >
                {products?.map((item: ProductType, index: number) => (
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    key={index}
                    className={styles.grid}
                  >
                    <ProductCards
                      id={index.toString()}
                      title={item?.title}
                      price={item?.price}
                      desc={item?.description}
                      Image={item?.image}
                      showCard={index?.toString() === selectedCard?.toString()}
                    />
                  </Grid>
                ))}
              </SortableContext>
            </DndContext>
          </Grid>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export default memo(Products);
