import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Image, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, getCategory } from '../../api'
import Loading from '../../component/loading'
import Navbar from '../../component/navbar'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditor from 'react-froala-wysiwyg';

const TambahProdukPage = () => {
    const inputRef = useRef();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [productCategory, setProductCategory] = useState(0);
    const [productImage, setProductImage] = useState({});
    const [isUpload, setIsUpload] = useState(false);
    const [category, setCategory] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryItems();
    }, []);

    const getCategoryItems = async () => {
        const data = await getCategory();
        if (data.status == 200) {
            setCategory(data.data);
        } else {
            console.log("err", data);
        }
    }

    const uploadFile = (e) => {
        const image = {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        }
        setProductImage(image);
        setIsUpload(true);
    }

    const addNewProduct = async () => {
        setModalLoading(true);
        const data = {
            product_name: productName,
            product_desc: productDesc.replace('<p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p>',''),
            product_price: productPrice,
            product_category: productCategory,
            product_image: productImage.raw
        }
        const response = await addProduct(data);
        if (response.status == 200) {
            setModalLoading(false);
            navigate('../Admin', { replace: true });
        } else {
            setModalLoading(false);
            alert("Koneksi bermasalah");
            console.log("err", response);
        }
    }

    const handleSelect = (event) => {
        setProductCategory(event.target.value);
    }

    const changeDesc = (model) => {
        setProductDesc(model);
    }

    console.log("ProdDesc",productDesc);

    return (
        <>
            <Navbar add={true} />
            <Container>
                <h1>Tambah Produk</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nama Produk</Form.Label>
                        <Form.Control value={productName} onChange={e => { setProductName(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Harga Produk</Form.Label>
                        <Form.Control type="number" min={0} value={productPrice} onChange={e => { setProductPrice(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Kategori Produk</Form.Label>
                        <br />
                        <select style={{ color: 'white', backgroundColor: '#2b72e3', padding: 10 }} onChange={handleSelect} value={productCategory}>
                            <option value={0} disabled>Pilih Kategori Produk</option>
                            {
                                category.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id_category}>{item.category}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Deksripsi Produk</Form.Label>
                        <FroalaEditor
                            tag="textarea"
                            model={productDesc}
                            onModelChange={changeDesc}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Pilih gambar</Form.Label>
                        <Form.Control type="file" ref={inputRef} onChange={uploadFile} />
                    </Form.Group>
                    <Form.Group>
                        {
                            isUpload ? <Image style={{ maxWidth: '500px', maxHeight: '500px', marginBottom: '20px' }} src={productImage.preview} alt="preview" thumbnail /> : ''
                        }
                    </Form.Group>
                    <Button variant="primary" onClick={() => addNewProduct()}>
                        Submit
                    </Button>
                </Form>
                <Loading show={modalLoading} />
            </Container>
        </>
    )

}

export default TambahProdukPage;