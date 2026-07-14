import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { Category, ProductWithRelations, Review } from '../types';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    (async () => {
      const { data: rows } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (active) {
        setData((rows as Category[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  return { categories: data, loading };
}

export function useProducts(filter?: { categorySlug?: string; featured?: boolean; isNew?: boolean; bestSeller?: boolean }) {
  const [data, setData] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    (async () => {
      let query = supabase
        .from('products')
        .select('*, category:categories(*), product_images(*)')
        .order('created_at', { ascending: false });
      if (filter?.categorySlug) {
        query = query.eq('category.slug', filter.categorySlug);
      }
      if (filter?.featured) query = query.eq('featured', true);
      if (filter?.isNew) query = query.eq('is_new', true);
      if (filter?.bestSeller) query = query.eq('is_best_seller', true);
      const { data: rows } = await query;
      if (active) {
        setData((rows as ProductWithRelations[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [filter?.categorySlug, filter?.featured, filter?.isNew, filter?.bestSeller]);
  return { products: data, loading };
}

export function useProduct(slug: string | null) {
  const [data, setData] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    (async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      const { data: row } = await supabase
        .from('products')
        .select('*, category:categories(*), product_images(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (active) {
        setData((row as ProductWithRelations) ?? null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);
  return { product: data, loading };
}

export function useReviews(productId: string | null) {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    (async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      const { data: rows } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('approved', true)
        .order('created_at', { ascending: false });
      if (active) {
        setData((rows as Review[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [productId]);
  return { reviews: data, loading };
}

export function useFeaturedReviews(limit = 6) {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    (async () => {
      const { data: rows } = await supabase
        .from('reviews')
        .select('*, product:products(name)')
        .eq('approved', true)
        .order('rating', { ascending: false })
        .limit(limit);
      if (active) {
        setData((rows as Review[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [limit]);
  return { reviews: data, loading };
}
