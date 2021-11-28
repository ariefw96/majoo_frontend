import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Dropdown, DropdownButton, Container, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct, getCategory } from '../../api';
import Loading from '../../component/loading'
import Navbar from '../../component/navbar'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditor from 'react-froala-wysiwyg';

const EditProdukPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState();
    const [productDesc, setProductDesc] = useState('');
    const [productCategory, setProductCategory] = useState(0);
    const [productImage, setProductImage] = useState({});
    const [isUpload, setIsUpload] = useState(false);
    const [category, setCategory] = useState([]);
    const [renderModal, setRenderModal] = useState(false)

    useEffect(() => {
        getProduct();
        getCategoryItems();
    }, []);

    const getProduct = async () => {
        setRenderModal(true);
        const response = await getSingleProduct({ id });
        if (response != 'err') {
            setProductName(response.data.product_name);
            setProductDesc(response.data.product_desc);
            setProductPrice(response.data.product_price);
            setProductCategory(response.data.product_category);
            setProductImage({ preview: response.data.product_image, raw: '' })
        } else {
            setRenderModal(false);
            console.log("Gagal menampilkan Produk");
        }
    }

    const getCategoryItems = async () => {
        const data = await getCategory();
        if (data.status == 200) {
            setCategory(data.data);
            setRenderModal(false);
        } else {
            setRenderModal(false);
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

    const editProductExec = async () => {
        setRenderModal(true);
        const data = {
            id,
            product_name: productName,
            product_desc: productDesc.replace('<p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p>',''),
            product_price: productPrice,
            product_category: productCategory,
            product_image: productImage.raw ? productImage.raw : null
        }
        const response = await updateProduct(data);
        if (response.status == 200) {
            console.log("sukses");
            setRenderModal(false);
            navigate('../Admin', { replace: true });
        } else {
            setRenderModal(false);
            console.log("err", response);
            alert("Terjadi kesalahan");
        }
    }

    const handleSelect = (event) => {
        setProductCategory(event.target.value);
    }

    const changeDesc = (model) => {
        setProductDesc(model);
    }

    return (
        <>
            <Navbar />
            <Container>
                <h1>Edit Produk</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nama Produk</Form.Label>
                        <Form.Control value={productName} onChange={e => { setProductName(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Harga Product</Form.Label>
                        <Form.Control value={productPrice} min={0} onChange={e => { setProductPrice(e.target.value) }} />
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
                        <Form.Control type="file" onChange={uploadFile} />
                    </Form.Group>
                    <Form.Group>
                        <Image style={{ maxWidth: '500px', maxHeight: '500px', marginBottom: '20px' }} src={isUpload ? productImage.preview : process.env.REACT_APP_BASE_URL + productImage.preview} alt="preview" thumbnail />
                    </Form.Group>
                    <Button variant="primary" onClick={() => editProductExec()}>
                        Submit
                    </Button>
                </Form>
                <Loading show={renderModal} />
            </Container>
        </>
    )

}

export default EditProdukPage;