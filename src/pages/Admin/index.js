import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Button, Container, Image, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { getAllProduct, deleteProduct, getCategory } from '../../api';
import { formatAmount } from '../../utils';
import Loading from '../../component/loading'
import Navbar from '../../component/navbar'

const Admin = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [renderModal, setRenderModal] = useState(false);
    const [page, setPage] = useState({ prev: null, now: null, next: null, last: null });

    //Paging
    let disabledPrev = page.now == 1 ? true : false;
    let disabledNext = page.now == page.last ? true : false;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            getProduct(1);
            getCategoryItems()
        } else {
            setRenderModal(false);
            navigate('../', { replace: true });
        }
    }, []);

    const getCategoryItems = async () => {
        const data = await getCategory();
        if (data.status == 200) {
            setRenderModal(false);
            setCategory(data.data);
        } else {
            setRenderModal(false);
            console.log("err", data);
        }
    }

    const getProduct = async (start) => {
        setRenderModal(true);
        const data = await getAllProduct(start, 4);
        if (data.status == 200) {
            setProduct(data.data);
            setPage(data.page)
        } else {
            setRenderModal(false);
            console.log("Data produk gagal ditampilkan.");
        }
    }

    const deleteProductAdmin = async (id) => {
        setRenderModal(true);
        const data = await deleteProduct({ id });
        if (data.status == 200) {
            getProduct(1);
            setRenderModal(false);
        } else {
            console.log("errDeleteProduct", data);
        }
    }

    const getDataPaging = (param) => {
        param == 'prev' ? getProduct(page.prev) : getProduct(page.next);
        setRenderModal(false);
    }

    const formatCategory = (id) => {
        if (category.length == 0) {
            return id;
        }
        let cat = category;
        let strCat = cat.filter((item) => {
            if (item.id_category == id) {
                return item
            }
        })
        console.log(strCat);
        return strCat[0].category;
    }

    return (
        <>
            <Navbar />
            <Container >
                <h1>List Produk</h1>
                <div style={{ minHeight: '75vh' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No. </th>
                                <th>Nama Produk</th>
                                <th>Deskripsi Produk</th>
                                <th>Harga Produk</th>
                                <th>Kategori Produk</th>
                                <th>Gambar Produk</th>
                                <th colSpan="2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length == 0 ? (
                                    <tr>
                                        <td colSpan="8">
                                            Tidak ada data yang ditampilkan.
                                        </td>
                                    </tr>
                                ) : (
                                    product.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{((page.now - 1) * 3) + index + 1}</td>
                                                <td>{item.product_name}</td>
                                                <td><p dangerouslySetInnerHTML={{ __html: item.product_desc }} /></td>
                                                <td>{formatAmount(item.product_price)}</td>
                                                <td>{formatCategory(item.product_category)}</td>
                                                <td><Image src={process.env.REACT_APP_BASE_URL + item.product_image} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                                                <td><Link style={{ textDecoration: 'none' }} to={`/Admin/EditProduk/${item.id}`}><Button variant="primary" style={{ color: 'white', fontWeight: 'bold' }}>Edit</Button></Link> </td>
                                                <td><Button variant="danger" style={{ color: 'white', fontWeight: 'bold' }} onClick={() => deleteProductAdmin(item.id)}>Delete</Button></td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                <Row style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                    <Col sm={2}><Button style={{ width: '100%' }} disabled={disabledPrev} onClick={() => getDataPaging('prev')}>Prev</Button></Col>
                    <Col><p style={{ textAlign: 'center' }}>Page {page.now} of {page.last}</p></Col>
                    <Col sm={2}><Button style={{ width: '100%' }} disabled={disabledNext} onClick={() => getDataPaging('next')}>Next</Button></Col>
                </Row>
            </Container>
            <Loading show={renderModal} />
        </>
    )
}

export default Admin;
