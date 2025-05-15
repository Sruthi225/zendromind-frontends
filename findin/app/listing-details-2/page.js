"use client";
import ListingDetailsRight from "@/src/components/ListingDetailsRight";
import VideoPopup from "@/src/components/VideoPopup";
import Layout from "@/src/layouts/Layout";
import { GallerySlider2, reletedListingSlider2 } from "@/src/sliderProps";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemDetails from "@/src/components/ItemDetails";
import { useSearchParams } from 'next/navigation';

const ListingDetails2 = () => {

  const searchParams = useSearchParams();
  const CategoryId = searchParams.get("categoryid")?searchParams.get("categoryid"):0;
  const ItemId = searchParams.get("itemid")?searchParams.get("itemid"):0;
  return (
      <ItemDetails ItemId = {ItemId} CategoryId={CategoryId}/>

  );
};
export default ListingDetails2;
