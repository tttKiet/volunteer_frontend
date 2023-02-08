import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAuth({ header, main, isShowModal, uploadPost, ToggleShowModal, deleteId }) {
    return (
        <>
            <Modal show={isShowModal} onHide={ToggleShowModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-4">{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fs-4">{main}</Modal.Body>
                <Modal.Footer>
                    <Button className="fs-5" variant="secondary" onClick={ToggleShowModal}>
                        Đóng
                    </Button>
                    <Button className="fs-5" variant="primary" onClick={() => uploadPost({ id: deleteId })}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAuth;
