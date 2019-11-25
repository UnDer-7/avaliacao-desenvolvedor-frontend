import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { cepMask, cpfMask } from '../../utils/masks';
import { getAllClientes } from '../../resources/clientes.resource';
import NavBar from '../../components/NavBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
    };
  }

  componentDidMount() {
    getAllClientes().then(res => {
      this.setState({ clientes: res });
    });
  }

  render() {
    return (
      <>
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
                {this.state.clientes.map(cliente => {
                  return (
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cpfMask(cliente.cpf)}</td>
                      <td>{cepMask(cliente.cep)}</td>
                      <td>{cliente.localidade}</td>
                      <td width="10">
                        <ButtonGroup>
                          <Button>Editar</Button>
                          <Button variant="info">Visualizar</Button>
                          <Button variant="danger">Excluir</Button>
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
}

export default Home;
