const moment = require('moment');
const base_url = process.env.REACT_APP_BASE_URL;

const getAllProduct = async (start,size) => {
    const url = base_url + `/api/v1/product/all_product?page=${start}&size=${size}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const resp = await fetch(url, options);
        console.log("Respstatus", resp.status);
        const data = await resp.json();
        console.log("success || get-home", data);
        return data;
    } catch (err) {
        console.log("error || get-home", err);
        return 'err';
    }
}

const loginUser = async payload => {
    const url = base_url + '/api/v1/user/login';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload != null ? JSON.stringify(payload) : null
    };

    console.log("Payload Login", payload);

    try {
        const resp = await fetch(url, options);
        const data = await resp.json();
        console.log("success || login", data);
        if (data.status != 200) {
            throw 'err'
        }
        return data;
    } catch (e) {
        console.log("error || login");
        return 'err';
    }
}

const getSingleProduct = async payload => {
    const { id } = payload;
    const url = base_url + '/api/v1/product/get_product?id=' + id;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const resp = await fetch(url, options);
        const data = await resp.json();
        console.log("success || getSingleProduct", data);
        return data;
    } catch (err) {
        console.log("error || getSingleProduct", err);
        return 'err';
    }

}

const addProduct = async payload => {
    const url = base_url + '/api/v1/product/add_product'

    //FormData
    const formData = new FormData();
    formData.append('product_name', payload.product_name);
    formData.append('product_desc', payload.product_desc);
    formData.append('product_price', payload.product_price);
    formData.append('product_category', payload.product_category);
    formData.append('product_image', payload.product_image);

    //Request
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'access-token': localStorage.getItem('token'),
        },
        body: formData,
    };

    try {
        const resp = await fetch(url, options);
        const data = await resp.json();
        if (data.status == 401) {
            throw 'unauthorized'
        }
        console.log("SUCCESS || updateProduct", data);
        return data;
    } catch (e) {
        console.log("ERR || updateProduct");
        return 'err';
    }

}

const updateProduct = async payload => {
    const { id } = payload;
    const url = base_url + '/api/v1/product/update_product?id=' + id;

    //FormData
    const formData = new FormData();
    formData.append('product_name', payload.product_name);
    formData.append('product_desc', payload.product_desc);
    formData.append('product_price', payload.product_price);
    formData.append('product_category', payload.product_category);
    formData.append('product_image', payload.product_image)

    //Request
    const options = {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'access-token': localStorage.getItem('token'),
        },
        body: formData,
    };

    try {
        const resp = await fetch(url, options);
        const data = await resp.json();
        if (data.status == 401) {
            throw 'unauthorized'
        }
        console.log("SUCCESS || updateProduct", data);
        return data;
    } catch (e) {
        console.log("ERR || updateProduct");
        return 'err';
    }
}

const deleteProduct = async payload => {
    const { id } = payload;
    const url = base_url + '/api/v1/product/delete_product?id=' + id;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('token')
        },
    };

    try {
        const resp = await fetch(url, options);
        const data = await resp.json();
        if (data.status == 401) {
            throw 'unauthorized'
        }
        console.log("SUCCESS || deleteProduct", data);
        return data;
    } catch (e) {
        console.log("ERR || deleteProduct ", e);
        return 'err';
    }
}

const getCategory = async () =>{
    const url = base_url + '/api/v1/product/category';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try{
        const resp = await fetch(url, options);
        const data = await resp.json();
        if(data.status != 200){
            throw data
        }
        console.log("sukses get category", data);
        return data;
    }catch(e){
        console.log("er", e);
        return "err";
    }
}

export { getAllProduct, loginUser, getSingleProduct, updateProduct, deleteProduct, addProduct, getCategory };
