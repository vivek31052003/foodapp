import React, {useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

// import Card from 'react-bootstrap/Card';
export default function Home() {
    const [search,setsearch] = useState('');
    const [foodCat,setFoodCat] = useState([]);
    const [fooditem,setfooditem] = useState([]);

    const loadData = async ()=>{
      let response = await fetch("http://localhost:5000/api/foodData",{
        method: "POST",
        headers:{
          'Content-Type' : 'application/json'
        }
      });
      response = await response.json();
      setfooditem(response[0]);
      setFoodCat(response[1]);
    }
    useEffect(()=>{
      loadData();

    },[])


  return (
    <div>
      <div><Navbar /></div>
      <div style={{objectFit:"contain !important"}}>
      <div id="carouselExampleCaptions" className="carousel slide"  >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner"  >
          <div className="carousel-item active" >
            <img
              src="http://source.unsplash.com/random/900x700/?burger"
              className="d-block w-100 "
              alt="..."
            />
            
          </div>
          <div className="carousel-item" style={{objectFit:"contain !important"}}>
            <img
              src="http://source.unsplash.com/random/900x700/?barbeque"
              className="d-block w-100"
              alt="..."
            />
            
          </div>
          <div className="carousel-item" style={{objectFit:"contain !important"}}>
            <img
              src="http://source.unsplash.com/random/900x700/?chicken"
              className="d-block w-100"
              alt="..."
            />
            
          </div>
          <div className="carousel-caption  d-md-block" style={{zIndex:"10"}}>
              <form className="d-flex" role="search" >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setsearch(e.target.value);}}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit" value={search} onClick={(e)=>{setsearch(e.target.value);e.preventDefault();console.log(search+"123")}}>
                  Search
                </button> */}
              </form>
            </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
      <div className="container">
        {
          foodCat != []
          ? foodCat.map((data)=>{
            return(
              <div className="row mb-3">
              <div key= {data._id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr/>
              {fooditem.length>0 ? 
                fooditem.filter((item)=>
                  (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
              )
              .map(filteritems=>{
                return(
                  <div key ={filteritems._id} className="col-12 col-md-6 col-lg-3">
                     <Card foodName ={filteritems.name} options = {filteritems.options[0]} imgSrc = {filteritems.img}/>
                  </div>
                )
              })
              :""}
              </div>
            )
          })
          : ""
        
        }
          

        
        </div>
      <div><Footer /></div>
      
    </div>
  );
}
