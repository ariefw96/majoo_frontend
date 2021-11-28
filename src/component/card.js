import React, { } from 'react';
import { Image, Card, Button } from 'react-bootstrap'

const CardComponent = ({
    product_name,
    product_desc,
    product_price,
    product_image
}) => {

    console.log(product_desc);

    return (
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={process.env.REACT_APP_BASE_URL + product_image} style={{ height: '150px', padding: '3vh' }} />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', height: '30px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}>{product_name}</Card.Title>
                <Card.Text style={{ textAlign: 'center', fontWeight: 'bold', height: '20px', overflow: 'hidden' }}>
                    <p>{product_price}</p>
                </Card.Text>
                <Card.Text style={{ textAlign: 'justify', height: '20vh', overflow: 'scroll', textOverflow: 'ellipsis' }}>
                    <p dangerouslySetInnerHTML={{ __html: product_desc }} />
                </Card.Text>
                <div className="text-center">
                    <Button variant="success" style={{ width: '60%' }}>Beli</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardComponent;