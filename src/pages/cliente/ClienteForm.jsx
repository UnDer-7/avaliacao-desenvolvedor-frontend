import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavBar from '../../components/NavBar';
import {
  cpfMask,
  telefoneMask,
  cepMask,
  celularMask,
  normalizeCep, normalizeCpf, normalizeTelefone
} from "../../utils/masks";
import findCEP from '../../resources/via-cep.resource';
import UFS from '../../utils/ufs';
import { createCliente } from '../../resources/clientes.resource';

export default class ClienteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
      emails: [{ email: '' }],
      telefones: [{ numero: '', tipoTelefone: 'CELULAR' }],
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: 'Selecione',
      complemento: '',
    };
  }

  buildNomeInput = () => {
    return (
      <Form.Group controlId="id-cliente_form_nome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          onChange={e => this.handleGenericChange(e, 'nome')}
          minLength="3"
          maxLength="100"
          type="text"
          placeholder="Nome do cliente"
        />
      </Form.Group>
    );
  };

  buildCPFInput = () => {
    const { cpf } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_cpf">
        <Form.Label>CPF</Form.Label>
        <Form.Control
          onChange={this.handleCPFtChange}
          value={cpf}
          type="text"
          placeholder="CPF do cliente"
        />
      </Form.Group>
    );
  };

  buildEmailInput = () => {
    const { emails } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_email">
        <Form.Label>E-mail</Form.Label>
        {emails.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <InputGroup className="pb-2" key={index}>
              <Form.Control
                onChange={e => this.handleEmailChange(e, index)}
                type="email"
                placeholder="E-mail do cliente"
              />
              <InputGroup.Append>
                <Button
                  variant="danger"
                  onClick={() => this.onRemovingEmail(index)}
                >
                  <FontAwesomeIcon icon={faTrash} color="white" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          );
        })}
        <Button onClick={this.onAddingMoreEmails}>
          Adicionar outro E-email
        </Button>
      </Form.Group>
    );
  };

  buildTelefoneInput = () => {
    const { telefones } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_telefone">
        <Form.Label>Telefone</Form.Label>
        {telefones.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <InputGroup className="pb-2" key={index}>
              <InputGroup.Prepend>
                <DropdownButton
                  id="id-cliente_form_telefone_tipo"
                  variant="success"
                  title={item.tipoTelefone}
                >
                  <Dropdown.Item
                    onClick={() =>
                      this.onTipoTelefoneSelected('RESIDENCIAL', index)
                    }
                  >
                    RESIDENCIAL
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() =>
                      this.onTipoTelefoneSelected('COMERCIAL', index)
                    }
                  >
                    COMERCIAL
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() =>
                      this.onTipoTelefoneSelected('CELULAR', index)
                    }
                  >
                    CELULAR
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup.Prepend>
              <Form.Control
                onChange={e => this.handleTelefoneChange(e, index)}
                type="text"
                maxLength={this.handleTelefoneMaxLength(item.tipoTelefone)}
                value={item.numero}
                placeholder="Telefone do cliente"
              />
              <InputGroup.Append>
                <Button
                  variant="danger"
                  onClick={() => this.onRemovingTelefone(index)}
                >
                  <FontAwesomeIcon icon={faTrash} color="white" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          );
        })}
        <Button onClick={this.onAddingMoreTelefones}>
          Adicionar outro telefone
        </Button>
      </Form.Group>
    );
  };

  buildCEPInput = () => {
    const { cep } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_cep">
        <Form.Label>CEP</Form.Label>
        <InputGroup className="pb-2">
          <Form.Control
            onChange={this.handleCEPChange}
            minLength="9"
            maxLength="9"
            type="text"
            placeholder="CEP"
            value={cep}
          />
          <InputGroup.Append>
            <Button onClick={this.onSearchingCEP}>
              <FontAwesomeIcon icon={faSearch} color="white" />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  };

  buildLogradouroInput = () => {
    const { logradouro } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_logradouro">
        <Form.Label>Logradouro</Form.Label>
        <Form.Control
          onChange={e => this.handleGenericChange(e, 'logradouro')}
          type="text"
          value={logradouro}
          placeholder="Logradouro"
        />
      </Form.Group>
    );
  };

  buildBairroInput = () => {
    const { bairro } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_bairro">
        <Form.Label>Bairro</Form.Label>
        <Form.Control
          onChange={e => this.handleGenericChange(e, 'bairro')}
          type="text"
          value={bairro}
          placeholder="Bairro"
        />
      </Form.Group>
    );
  };

  buildLocalidadeInput = () => {
    const { localidade } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_localidade">
        <Form.Label>Localidade</Form.Label>
        <Form.Control
          onChange={e => this.handleGenericChange(e, 'localidade')}
          type="text"
          value={localidade}
          placeholder="Localidade"
        />
      </Form.Group>
    );
  };

  buildUFInput = () => {
    const { uf } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_uf">
        <Form.Label>UF</Form.Label>
        <DropdownButton id="id-cliente_form_uf_dropdown" title={uf}>
          {UFS.map(item => {
            return (
              <Dropdown.Item
                key={item.ID}
                onClick={() => this.onUFSelection(item.Sigla)}
              >
                {item.Sigla}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Form.Group>
    );
  };

  buildComplementoInput = () => {
    const { complemento } = this.state;

    return (
      <Form.Group controlId="id-cliente_form_complemento">
        <Form.Label>Complemento</Form.Label>
        <Form.Control
          onChange={e => this.handleGenericChange(e, 'complemento')}
          type="text"
          value={complemento}
          placeholder="Complemento"
        />
      </Form.Group>
    );
  };

  buildSubmitButton = () => {
    return (
      <Button block type="submit">
        Salvar
      </Button>
    );
  };

  handleEmailChange = (event, index) => {
    const { emails } = this.state;

    emails[index].email = event.target.value;

    this.setState({ emails });
  };

  handleGenericChange = (event, key) => {
    this.setState({ [key]: event.target.value });
  };

  handleCEPChange = e => {
    this.setState({ cep: cepMask(e.target.value) });
  };

  handleCPFtChange = e => {
    this.setState({ cpf: cpfMask(e.target.value) });
  };

  handleTelefoneChange = (event, index) => {
    const { telefones } = this.state;

    if (telefones[index].tipoTelefone === 'CELULAR') {
      telefones[index].numero = celularMask(event.target.value);
    } else {
      telefones[index].numero = telefoneMask(event.target.value);
    }

    this.setState({ telefones });
  };

  handleTelefoneMaxLength = tipo => {
    if (tipo === 'CELULAR') return 15;
    return 14;
  };

  onAddingMoreEmails = () => {
    const { emails } = this.state;

    this.setState({ emails: [...emails, { email: '' }] });
  };

  onAddingMoreTelefones = () => {
    const { telefones } = this.state;

    this.setState({
      telefones: [...telefones, { numero: '', tipoTelefone: 'CELULAR' }],
    });
  };

  onRemovingEmail = index => {
    const { emails } = this.state;
    if (emails.length === 1) return;

    emails.splice(index, 1);
    this.setState({ emails });
  };

  onRemovingTelefone = index => {
    const { telefones } = this.state;
    if (telefones.length === 1) return;

    telefones.splice(index, 1);
    this.setState({ telefones });
  };

  onUFSelection = uf => {
    this.setState({ uf });
  };

  onSearchingCEP = () => {
    const { cep } = this.state;
    const cepString = normalizeCep(cep);
    if (cepString.length !== 8) return;

    findCEP(cep).then(this.onSuccessfulCEPSearch);
  };

  onSuccessfulCEPSearch = cep => {
    Object.keys(cep).forEach(key => {
      this.setState({ [key]: cep[key] });
    });
  };

  onTipoTelefoneSelected = (tipo, index) => {
    const { telefones } = this.state;
    telefones[index].tipoTelefone = tipo;
    this.setState({ telefones: [...telefones] });
  };

  onSubmission = e => {
    e.preventDefault();
    const userToSave = { ...this.state };
    const { cpf, cep } = userToSave;
    const { history } = this.props;

    userToSave.cpf = normalizeCpf(cpf);
    userToSave.cep = normalizeCep(cep);
    userToSave.telefones.forEach(item => {
      // eslint-disable-next-line no-param-reassign
      item.numero = normalizeTelefone(item.numero);
    });
    createCliente(userToSave).then(() => {
      history.push('/');
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <Form onSubmit={this.onSubmission}>
          <legend>Dados do Cliente</legend>
          {this.buildNomeInput()}
          {this.buildCPFInput()}
          {this.buildEmailInput()}
          {this.buildTelefoneInput()}
          {this.buildCEPInput()}
          {this.buildLogradouroInput()}
          {this.buildBairroInput()}
          {this.buildLocalidadeInput()}
          {this.buildUFInput()}
          {this.buildComplementoInput()}
          {this.buildSubmitButton()}
        </Form>
      </>
    );
  }
}
