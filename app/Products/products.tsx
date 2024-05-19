"use client";
import React, { useEffect, useState } from "react";
import styles from "./products.module.css";
import { getProducts } from "../apicalls/apicalls";
import { Grid } from "@mui/material";
import ProductCards from "../components/ProductCards/ProductCards";
import { ProductType } from "../apicalls/apicalls";
import { DndContext, closestCenter } from "@dnd-kit/core";

const Products = () => {
  const [products, setProducts]: any = useState([]);
  const [selectedCard, setSelectedCard]: any = useState();
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        console.log("Error-------", error);
      });
  }, []);

  const handleDragEnd = () => {};

  return (
    <div className={styles.products}>
      <h1 className={styles.heading}>Next.js Machine Test</h1>
      {products.length !== 0 ? (
        <div className={styles.productViewer}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Grid container spacing={2}>
              {products?.map((item: ProductType, index: number) => (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={index}
                  className={styles.grid}
                >
                  <ProductCards
                    title={item?.title}
                    price={item?.price}
                    desc={item?.description}
                    Image={item?.image}
                    showCard={item?.id === selectedCard}
                    onClick={() => {
                      setSelectedCard(item?.id);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </DndContext>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export default Products;
