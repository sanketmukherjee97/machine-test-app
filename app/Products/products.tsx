"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    let pro = products;
    let temp;
    console.log("Dreaged", active, over);
    setSelectedCard(over?.id?.toString());
    temp = pro[parseInt(active?.id)];
    pro[parseInt(active?.id)] = pro[parseInt(over?.id)];
    pro[parseInt(over?.id)] = temp;
    setProducts(pro);
  };

  const handleDragStart = (event: any) => {
    const { active, over } = event;
    setSelectedCard(active?.id?.toString());
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
                    xs={2}
                    sm={4}
                    md={4}
                    key={index}
                    className={styles.grid}
                  >
                    <ProductCards
                      id={index.toString()}
                      title={item?.title}
                      price={item?.price}
                      desc={item?.description}
                      Image={item?.image}
                      showCard={index?.toString() === selectedCard}
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

export default Products;
