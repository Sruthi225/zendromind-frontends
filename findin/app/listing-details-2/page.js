"use client";
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
