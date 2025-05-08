"use client";
import Layout from "@/src/layouts/Layout";
import ItemListing from "@/src/components/ItemListing";
import SearchForm from "@/src/components/SearchForm";
import { useSearchParams } from 'next/navigation';

const Listing = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?searchParams.get("category"):0;
  const location = searchParams.get("location")?searchParams.get("location"):0;
  const keyword = searchParams.get("keyword")? searchParams.get("keyword"): null;
  
  return (
    <Layout>
      <section className="hero-area">
        <div
          className="pt-120 hero-wrapper"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hero-content">
                  <div
                    className="hero-search-wrapper wow fadeInUp"
                    data-wow-delay="70ms"
                  >
                     <SearchForm />
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-area pt-110 pb-30">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two text-center  wow fadeInUp">
                <h2>
                  <span className="line">Latest</span> Destination
                </h2>
              </div>
            </div>
          </div>
          
            
          <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
            <ItemListing category={category} location={location} keyword={keyword}/>
          </div>
        </div>
      </section>


      
    </Layout>
  );
};
export default Listing;
