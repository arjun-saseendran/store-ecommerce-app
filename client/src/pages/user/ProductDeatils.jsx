import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";

export const ProductDetails = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config dispatch
  const dispatch = useDispatch();

  // Set product
  const [product, setProduct] = useState({});

  // Config params
  const { id } = useParams();

  // Api call
  const [productData, loading, error] = useFetch(
    `/product/product-details/${id}`
  );

  useEffect(() => {
    if (productData) {
      // Set product details
      setProduct(productData);
    }
  }, [productData]);

  return (
    <Container className="h-100">
      <h1
        className={
          theme
            ? "h1 text-center fw-bold text-black mt-5"
            : "h1 text-center fw-bold text-white mt-5"
        }
      >
        Product Details
      </h1>
      <Card
        className="crd-box d-flex justify-content-center align-items-center mt-5 mx-auto pr-card"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <Card.Img
          className="object-fit-contain pr-card-img p-2"
          variant="top"
          src={product.image}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>

          <Card.Text>{product.description}</Card.Text>
          <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
            ₹{product.price}
          </Card.Text>
          <Button
            className={
              theme ? "w-100 mt-1 text-white" : "w-100 mt-1 text-white"
            }
            variant={theme ? "warning" : "dark"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 me-1"
              height="25px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            Buy Now
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
