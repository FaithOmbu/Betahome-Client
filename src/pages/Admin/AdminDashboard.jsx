import { useState, useEffect } from "react";
import AdminLayout from "../../components/Admin components/AdminLayout";
import { Link, Outlet } from "react-router-dom";
import "../../styles/Admin Styles/AdminDashboard.css";
import { properties } from "../../mockData/properties";
import { FaNetworkWired } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineBedroomParent } from "react-icons/md";
import { LuBath } from "react-icons/lu";
import { GiHomeGarage } from "react-icons/gi";
import { LuRectangleHorizontal } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import axios from "axios";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import Loading from "../../components/Loading";
import { formatPrice } from "../../utils/helpers";

const AdminDashboard = () => {
  // const houses = properties.slice(0, 3);

  const { BASE_URL } = useGlobalContext();
  const url = `${BASE_URL}/property/recent`;
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const getRecentProperties = async () => {
    try {
      const { data } = await axios(url);
      setProperties(data.properties);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecentProperties();
  }, []);

  return (
    <div className="pb-5">
      <AdminLayout>
        <Outlet />
        <div className="Admindash">
          <h1>Dashboard</h1>

          <div className=" linked me-5">
            <Link className="linked" to={"/"}>
              <IoHomeOutline /> Home{" "}
            </Link>{" "}
            / <Link className="linked"> Dashboard </Link>{" "}
          </div>
        </div>

        <div className="Recently-added-props">
          <h2>Recently added properties</h2>
      
        </div>

        <div className="AdminDashProperties mt-3 ">

          { isLoading ?  <Loading/> : properties.map((h, i) => {
            return (
              <div key={h._id} className="AdminDashboard-images">
                <img src={h.media.images[0]} alt={h.title} />
                <p className="posted-on"> posted on{new Date(h.createdAt).toLocaleDateString()}</p>
                <div className="networkFamily">
                  <p className="network">
                    {" "}
                    <FaNetworkWired /> {h.tags}{" "}
                  </p>{" "}
                  <p className="family">
                    {" "}
                    <MdFamilyRestroom /> {h.tags}
                  </p>
                </div>
                <h2>{h.title}</h2>

                <p className="location">
                  {" "}
                  <IoLocationSharp />
                  {h.location}
                </p>

                <h3 className="price">${formatPrice(h.price)}</h3>

                <p className="spaces">
                  <p>
                    {" "}
                    <MdOutlineBedroomParent />
                    {h.bedroom} Bedroom
                  </p>

                  <p>
                    {" "}
                    <LuBath />
                    {h.bathroom} Bathroom
                  </p>
                  {h.garage && <p>
                    {" "}
                    <GiHomeGarage />
                   Garage
                  </p>}
                  <p>
                    {" "}
                    <LuRectangleHorizontal />
                    {h.squareFeet} Squarefeet
                  </p>
                </p>
                <div>
                  <Link to={`/admin/properties/${h._id}`}>
                    <button className="AdminDashBtn">View</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
