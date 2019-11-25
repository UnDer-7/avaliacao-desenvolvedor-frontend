import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { cepMask, cpfMask } from '../../utils/masks';
import {
  deleteCliente,
  getAllClientes,
} from '../../resources/clientes.resource';
import NavBar from '../../components/NavBar';

class Home extends Component {
  clienteToRemove;

  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      showModal: false,
    };
  }

  componentDidMount() {
    this.findAll();
  }

  findAll = () => {
    getAllClientes().then(res => {
      this.setState({ clientes: res });
    });
  };

  handleShow = clienteId => {
    const { showModal } = this.state;
    if (!showModal || typeof clienteId === 'number') {
      this.clienteToRemove = clienteId;
    }
    this.setState({ showModal: !showModal });
  };

  render() {
    const { clientes, showModal } = this.state;

    return (
      <>
        <Modal show={showModal} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Remover Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deja remover esse Cliente?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShow}>
              cancelar
            </Button>
            <Button variant="primary" onClick={this.onRemove}>
              Remover
            </Button>
          </Modal.Footer>
        </Modal>
        <NavBar />
        <h1 align="center" className="p-4">
          Clientes
        </h1>
        <Row className="justify-content-md-center align-items-center">
          <Col md="12" lg="9">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>CEP</th>
                  <th>Cidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => {
                  return (
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cpfMask(cliente.cpf)}</td>
                      <td>{cepMask(cliente.cep)}</td>
                      <td>{cliente.localidade}</td>
                      <td width="10">
                        <ButtonGroup>
                          <Button
                            onClick={() =>
                              this.onNavigation(cliente.id, 'edit')
                            }>
                            Editar
                          </Button>
                          <Button
                            onClick={() =>
                              this.onNavigation(cliente.id, 'view')
                            }
                            variant="info">
                            Visualizar
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => this.handleShow(cliente.id)}>
                            Excluir
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    );
  }

  onNavigation = (id, action) => {
    const { history } = this.props;

    history.push(`/cliente/${action}/${id}`);
  };

  onRemove = () => {
    if (this.clienteToRemove) {
      deleteCliente(this.clienteToRemove).then(this.findAll);
      this.handleShow(null);
    }
  };
}

export default Home;
