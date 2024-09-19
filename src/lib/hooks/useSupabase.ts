'use client';
import { useState } from 'react';
import { supabase } from '../supabase/product';

interface Color {
  color: string;
  hex: string;
  fakeImg: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  img1: string;
  img: string;
  description: string;
  category: string;
  colors: Color[];
  size: string[];
}

export const useSupabase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [proDlts, setProDlts] = useState<Product>();
  const getNewReleaseProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('category', `%newrelease%`);

    if (error) {
      console.log(error.message);
      return;
    }

    if (data) {
      const parsedData = data.map((product) => {
        // Check if colors need parsing
        let colors: Color[] = [];
        try {
          colors =
            typeof product.colors === 'string'
              ? JSON.parse(product.colors)
              : product.colors;
        } catch (e) {
          console.error('Error parsing colors:', e);
        }

        return {
          ...product,
          colors,
        };
      });

      setProducts(parsedData);
    }
  };
  const getSingleProduct = async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id);

    if (data) {
      const parsedData = data.map((product) => {
        let colors: Color[] = [];
        try {
          colors =
            typeof product.colors === 'string'
              ? JSON.parse(product.colors)
              : product.colors;
        } catch (e) {
          console.error('Error parsing colors:', e);
        }

        return {
          ...product,
          colors,
        };
      });

      setProduct(parsedData[0]);
    }

    if (error) {
      console.log(error.message);
      return;
    }
  };
  const getProductDlts = async (img: string) => {
    const { data, error } = await supabase.from('products').select('*');

    if (data) {
      const parsedData = data
        .map((product) => {
          let colors: Color[] = [];
          try {
            colors =
              typeof product.colors === 'string'
                ? JSON.parse(product.colors)
                : product.colors;
            const imgMatches = product.img === img || product.img1 === img;
            const fakeImgMatches = colors.some(
              (color) => color.fakeImg === img
            );

            if (imgMatches || fakeImgMatches) {
              return {
                ...product,
                colors,
              };
            }
          } catch (e) {
            console.error('Error parsing colors:', e);
          }
          return null;
        })
        .filter(Boolean);
      setProDlts(parsedData[0]);
    }
    if (error) {
      console.log(error.message);
      return;
    }
  };
  return {
    products,
    product,
    proDlts,
    getProductDlts,
    getNewReleaseProduct,
    getSingleProduct,
  };
};
