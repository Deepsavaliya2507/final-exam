import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStoreDb } from "./firebaseConfig";

function App() {
  const [productname, setProductname] = useState([]);
  const [Price, setProductPrice] = useState("");
  const [Image, setProductImage] = useState("");

  const [Like, setLike] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const [updateProductName, setupdateProductName] = useState("");
  const [updatedProductPrice, setupdateProductPrice] = useState("");

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(fireStoreDb, "products"));

    const data = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().name) {
        data.push({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          image: doc.data().image,
          like: doc.data().like || false,
        });
      }
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (productname && Price && Image) {
      if (productname && Price && Image) {
        await addDoc(collection(fireStoreDb, "products"), {
          name: productname,
          image: Image,
          price: Price,
        });
        fetchData();
        setProductname("");
        setProductPrice("");
        setProductImage("");
      }
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(fireStoreDb, "products", id));
    fetchData();
  };

  // const handleLike = async (data) => {
  //   // await addDoc(collection(fireStoreDb, "addproducts"), {
  //   //   name: data.name,
  //   //   image: data.image,
  //   //   price: data.price,
  //   //   id: data.id,
  //   // });
  //   // fetchData();
  //   // const handleLike = async (id, like) => {
  //   const productref = doc(collection(fireStoreDb, "Product"), id);
  //   try {
  //     await updateDoc(productref, { like });
  //     setData((prevdata) =>
  //       prevdata.map((item) => (item.id == id ? { ...item, like } : item))
  //     );
  //   } catch (error) {
  //     console.log("like is not update", error);
  //   }
  //   // }
  // };

  return (
    <div className="App">
      <div>
        <h2>CRUD App with Firebase</h2>
        <input
          type="text"
          style={{
            border: "2px solid black",
            padding: "10px 30px",
            marginBottom: "10px",
          }}
          placeholder="Please add Product Image"
          value={Image}
          onChange={(e) => setProductImage(e.target.value)}
        />
        <br />
        <input
          type="text"
          style={{ border: "2px solid black", padding: "10px 30px" }}
          placeholder="Please add Product Name"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
        />
        <br />
        <input
          type="number"
          style={{
            border: "2px solid black",
            margin: "10px 0px",
            padding: "10px 30px",
          }}
          placeholder="Please add Product Price"
          value={Price}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <br />
        <button
          onClick={() => {
            handleCreate();
          }}
          style={{
            padding: "10px 30px",
            border: "2px solid black",
            backgroundColor: "wheat",
            margin: "0px 50px",
            borderRadius: "5px",
          }}
        >
          Add Product
        </button>
        {/* <button
          className="btn_like"
          onClick={(item) => handleLike(item.id, !item.like)}
          style={{ color: item.like ? "red" : "black" }}
        >
          <i class="fa-solid fa-heart icon_border card_icon_i"></i>
        </button> */}
      </div>

      <ul className="w-[1360px] container mx-auto grid grid-cols-4">
        {data.map((item) => (
          <li key={item.id}>
            <div>
              <div className="pt-12 pb-12 flex justify-around border-black">
                <div className="max-w-sm relative rounded mr-4 w-96 overflow-hidden shadow-lg bg-white py-[20px]">
                  <div className="grid justify-items-center">
                    <img
                      src={item.image}
                      className="w-[200px] h-[200px] rounded"
                    />
                  </div>
                  <span className="inline-block absolute top-0 right-0 text-sm font-semibold"></span>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      <div className="form">
                        <p>Name : {item.name}</p>
                      </div>
                    </div>
                    <p>Price : {item.price}</p>
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block pr-2 rounded- text-sm font-semibold">
                      <button
                        className="px-2 py-1 rounded-full text-sm text-blue-700 font-semibold border border-blue-700 hover:text-black
               hover:bg-white hover:border-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      >
                        Buy it Now
                      </button>
                    </span>
                    <span className="inline-block rounded-full text-sm font-semibold">
                      <button
                        // onClick={() => handleLike(item)}
                        className="px-2 py-1 rounded-full text-sm text-blue-700 font-semibold border border-blue-700 hover:text-black
               hover:bg-white hover:border-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      >
                        Add to Cart
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2>Add to Cart Product lists</h2>
      <ul className="w-[1360px] container mx-auto grid grid-cols-4">
        {data.map((item) => (
          <li key={item.id}>
            <div>
              <div className="pt-12 pb-12 flex justify-around border-black">
                <div className="max-w-sm relative rounded mr-4 w-96 overflow-hidden shadow-lg bg-white py-[20px]">
                  <div className="grid justify-items-center">
                    <img
                      src={item.image}
                      className="w-[200px] h-[200px] rounded"
                    />
                  </div>
                  <span className="inline-block absolute top-0 right-0 text-sm font-semibold"></span>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      <div className="form">
                        <p>Name : {item.name}</p>
                      </div>
                    </div>
                    <p>Price : {item.price}</p>
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block pr-2 rounded- text-sm font-semibold">
                      <button
                        className="px-2 py-1 rounded-full text-sm text-blue-700 font-semibold border border-blue-700 hover:text-black
               hover:bg-white hover:border-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      >
                        Buy it Now
                      </button>
                    </span>
                    <span className="inline-block rounded-full text-sm font-semibold">
                      <button
                        // onClick={() => handleLike(item)}
                        className="px-2 py-1 rounded-full text-sm text-blue-700 font-semibold border border-blue-700 hover:text-black
               hover:bg-white hover:border-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      >
                        Add to Cart
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
