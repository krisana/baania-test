import Head from 'next/head'
import React, { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css'
import DataTable from 'react-data-table-component';
import { Modal, Form, FloatingLabel, Row, Col, Container, Button } from 'react-bootstrap';
import { customStyles } from '../tableconfig';
import { getPostCodeDetail, createHome, updateHome, getHomes } from '../services';

export default function Home({ homes, postCodes }) {

  const { register, handleSubmit, setValue } = useForm();
  const [dataForm, setDataForm] = useState();
  const [data, setData] = useState(homes.payload);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(false);
  const [action, setAction] = useState('create');
  const [postCode, setPostCode] = useState();
  const [currentRow, setCurrentRow] = useState();
  const columns = useMemo(() => [
    {
      name: 'ID',
      selector: row => row.id,
    },
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Post Code',
      selector: row => row.post_code,
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'Action',
      cell: (row) => <ActionComponent row={row} onClick={handleUpdate} onClickDelete={handleDelete} />,
      width: 289
    },
  ]);

  const ActionComponent = ({ row, onClick, onClickDelete }) => {
    const clickHandler = () => onClick(row);
    const clickHandlerDelete = () => onClickDelete(row);

    return (
      <div>
        <button className='btn action-button btn-warning me-1' onClick={clickHandler}>VIEW DETAIL</button>
        <button className='btn action-button btn-danger' onClick={clickHandlerDelete}>DELETE</button>
      </div>
    );
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log('test use effect');
  }, [])

  const clearForm = () => {
    setAction('create')
    setCurrentRow(null);
    setValue('name', '');
    setValue('post_code', '');
    setValue('price', '');
    setValue('desc', '');
  }

  const handleCreate = () => {
    clearForm();
    setShow(true);
  }

  const handleUpdate = (row) => {
    setAction('update')
    if (row) {
      setCurrentRow(row)
      setValue('id', row.id);
      setValue('name', row.name);
      setValue('post_code', row.post_code);
      setValue('price', row.price);
      setValue('desc', row.desc);
    }
    setShow(true);
  };

  const handleDelete = (row) => {
    setAction('delete')
    console.log('deleted', row);
  }

  const onHandleClose = () => {
    handleClose();
  }

  const onChangePostCode = (e) => {
    getPostCodeDetail(e.target.value).then((res) => {
      setPostCode(res.data.payload);
    });
  }

  const onCloseStatus = () => {
    if(success) {
      setStatus(false)
      setSuccess(false)
    } else {
      setStatus(false)
      setShow(true)
    }
  }

  const onSubmit = (v) => {
    console.log(v);
    setDataForm(JSON.stringify(v))
    if (action === 'create') {
      createHome(v).then((res) => {
        if (res.status === 200) {
          clearForm();
          setShow(false);
          getHomes().then((homes) => {
            setData(homes.data.payload);
            setStatus(true)
            setSuccess(true)
          })
        } else {
          setStatus(true)
          setSuccess(false)
        }
      })
    } else if (action === 'update') {
      console.log('onSubmit ' + action, v);
      updateHome(v).then((res) => {
        if (res.status === 200) {
          clearForm();
          setShow(false);
          getHomes().then((homes) => {
            setData(homes.data.payload);
          })
        } else {
          setStatus(true)
          setSuccess(false)
        }
      })
    }
  }

  return (
    <div>
      <Head>
        <title>Baania Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Baania testing for interview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Container>
          <Row className="align-items-end custom-layout">
            <Col md={5}>
              <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" placeholder="http://localhost" />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group controlId="port">
                <Form.Label>Port</Form.Label>
                <Form.Control type="text" placeholder="8080" />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Button variant="primary" className='btn-custom w-100'>CONNECT</Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </header>
      <main className={styles.main}>
        <div className="container">
          <div className={styles.mainHeader}>
            <Row className='align-items-center'>
              <Col md={10}>
                <h4>HOUSE LISTS</h4>
              </Col>
              <Col md={2}>
                <Button variant="success" onClick={handleCreate} className='btn-custom w-100'>CREATE</Button>
              </Col>
            </Row>
          </div>
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <Container>
          <div className="custom-form-select">
            <FloatingLabel
              controlId="selectPostCode"
              label="SELECT POST CODE"
              className="mb-3"
            >
              <Form.Select
                aria-label="SELECT POST CODE"
                onChange={(e) => onChangePostCode(e)}
              >
                <option value="">SELECT POST CODE</option>
                {postCodes && postCodes.payload.map((item) => <option value={item.post_code}>{item.post_code}</option>)}
              </Form.Select>
            </FloatingLabel>
            {
              postCode ?
                <div className='post-detail'>
                  <p>Average: {postCode.average}</p>
                  <p>Median: {postCode.median}</p>
                </div>
                :
                null
            }
          </div>
        </Container>
      </footer>
      <Modal
        size="lg"
        show={show}
        centered
      >
        <Modal.Body>
          <h5>{action === 'update' ? 'Item Detail - ' + currentRow.id : 'Create'}</h5>
          <Form validated={false} onSubmit={handleSubmit((v) => onSubmit(v))}>
            {action === 'update' ? <input type="hidden" {...register("id")} /> : null}
            <Row>
              <Col sm={6}>
                <FloatingLabel
                  controlId="name"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control type="text" {...register("name", { required: true })} placeholder="Name" />
                </FloatingLabel>
              </Col>
              <Col sm={3}>
                <FloatingLabel
                  controlId="postCode"
                  label="Post Code"
                  className="mb-3"
                >
                  <Form.Control type="text" {...register("post_code", { max: 5, pattern: /[0-9]/, required: true })} placeholder="Post Code" />
                </FloatingLabel>
              </Col>
              <Col sm={3}>
                <FloatingLabel
                  controlId="price"
                  label="Price"
                  className="mb-3"
                >
                  <Form.Control type="number" step={1} {...register("price", { required: true })} placeholder="Price" />
                </FloatingLabel>
              </Col>
              <Col sm={12}>
                <FloatingLabel
                  controlId="desc"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control as="textarea" className='textarea-custom' rows={4} {...register("desc")} placeholder="Description" />
                </FloatingLabel>
              </Col>
            </Row>
            <div className="btn-modal">
              <Row className='align-items-center justify-content-center'>
                <Col>
                  <Button onClick={onHandleClose} variant="outline-secondary">CANCEL</Button>
                  <Button
                    type='submit'
                    className='btn-custom'
                    variant={action === 'update' ? 'warning' : 'success'}
                  >
                    {action === 'update' ? 'UPDATE' : 'CREATE'}
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        dialogClassName='modal-status'
        show={status}
        centered
      >
        <Modal.Body className={styles.modalStatus}>
          <div className={`status-circle status-${success ? 'success' : 'failed'}`}>
            {success ?
              <svg width="41" height="33" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M40.9091 3.322L17.9979 32.0648L0 17.0146L3.39583 12.926L17.2338 24.4944L36.7704 0L40.9091 3.322Z" fill="white" />
              </svg>
              :
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37 37L3 3M37 3L3 37" stroke="white" strokeWidth="5" strokeLinecap="round" />
              </svg>
            }
          </div>
          <div className="status-message">
            <h5>{success ? 'Success' : 'Fail'}</h5>
            <small>{success ? 'Create a successful!' : 'Let’s try one more again'}</small>
          </div>
          <Button onClick={() => onCloseStatus()} variant="outline-secondary" className='btn-status' >CONTINUE</Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context) {
  const getHomes = await fetch(`https://test-backend.baania.dev/home?take=100`)
  const getPostCode = await fetch(`https://test-backend.baania.dev/postCode`)
  const homes = await getHomes.json()
  const postCodes = await getPostCode.json()
  const data = {
    homes,
    postCodes
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: data, // will be passed to the page component as props
  }
}
