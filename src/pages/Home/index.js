import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { getAllProduct } from '../../api';
import NavbarHome from '../../component/navhome'
import Loading from '../../component/loading'
import Card from '../../component/card'
import { formatAmount } from '../../utils';


const Home = () => {
    const [product, setProduct] = useState([]);
    const [page, setPage] = useState({});
    const [renderLoading, setRenderLoading] = useState(false);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        setRenderLoading(true);
        const response = await getAllProduct(1, 100);
        if (response.status == 200) {
            setProduct(response.data);
            setPage(response.page);
            setRenderLoading(false);
        } else {
            console.log("err", response);
        }
    }

    return (
        <>
            <NavbarHome />
            <Container style={{minHeight:'90vh'}}>
                <h1 style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}>Produk</h1>
                <div className="d-flex flex-wrap" style={{justifyContent:'space-between', marginLeft:'-5px', marginRight:'-5px'}}>
                    {
                        product.map((item) => {
                            return (
                                <div style={{marginBottom:'20px',marginLeft:'5px', marginRight:'5px', border:'1', borderColor:'black', borderStyle:'solid'}} className="col-5 col-sm-5 col-md-3 col-lg-3 col-xl-2" >
                                    <Card
                                        product_name={item.product_name}
                                        product_desc={item.product_desc}
                                        product_price={formatAmount(item.product_price)}
                                        product_image={item.product_image}
                                    />
                                </div>

                            )
                        })
                    }
                </div>
            </Container>
            <div style={{position:'sticky', bottom:0}}>
                <div style={{ height:'5vh'}} className="btn-success">
                    <div style={{textAlign:'center', padding:'10px'}}>2021 @ Majoo Teknologi Indonesia</div>
                </div>
            </div>
            <Loading show={renderLoading} />
        </>

    )

}

export default Home;