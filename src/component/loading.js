import { Modal, Spinner } from 'react-bootstrap';

const renderLoading = ({show}) => {
    return (
        <Modal
            size="sm"
            show={show}
            centered
    aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body>
                <Spinner animation="border" size="xl" variant="success" role="status"/>
                <span style={{marginLeft:'30px', marginTop:'-20px'}}>Harap tunggu...</span>
            </Modal.Body>
        </Modal>
    )
}

export default renderLoading;