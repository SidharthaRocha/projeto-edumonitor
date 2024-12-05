import React, { useState } from "react";
import { FaTrash, FaUserCheck, FaEdit, FaArrowLeft } from "react-icons/fa"; // Import do ícone de setinha
import { Link } from "react-router-dom";

const alunosData = [
  { id: 1, nome: "João Silva", email: "joao@gmail.com", dataNascimento: "1990-05-15" },
  { id: 2, nome: "Maria Oliveira", email: "maria@gmail.com", dataNascimento: "1995-10-20" },
  // Adicione mais alunos conforme necessário
];

export default function AlunosList() {
  const [alunos, setAlunos] = useState(alunosData);
  const [showForm, setShowForm] = useState(false);
  const [newAluno, setNewAluno] = useState({ nome: "", email: "", dataNascimento: "" });
  const [editAluno, setEditAluno] = useState(null); // Estado para o aluno sendo editado
  const [search, setSearch] = useState("");
  const [selectedAluno, setSelectedAluno] = useState(null); // Estado para aluno selecionado para o modal

  const handleDeleteAluno = (id) => {
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
  };

  const handleAddAlunoClick = () => {
    setShowForm(true);
  };

  const handleAddAlunoSubmit = () => {
    setAlunos([...alunos, { ...newAluno, id: alunos.length + 1 }]);
    setNewAluno({ nome: "", email: "", dataNascimento: "" });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editAluno) {
      setEditAluno({ ...editAluno, [name]: value });
    } else {
      setNewAluno({ ...newAluno, [name]: value });
    }
  };

  const handleViewProfile = (aluno) => {
    setSelectedAluno(aluno);
  };

  const handleEditClick = (aluno) => {
    setEditAluno(aluno);
  };

  const handleEditSubmit = () => {
    setAlunos(
      alunos.map((aluno) =>
        aluno.id === editAluno.id ? editAluno : aluno
      )
    );
    setEditAluno(null);
  };

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
  {/* Botão de Voltar com ícone de setinha */}
  <Link to="/Dashboard-professor" className="mr-1 text-blue-500 hover:text-blue-700 flex items-center">
    <FaArrowLeft size={20} className="mr-2" /> 
  </Link>
  <h1 className="text-2xl font-bold">Lista de Alunos</h1>
</div>
      {/* Botão de Adicionar Aluno */}
      <button
        onClick={handleAddAlunoClick}
        className="bg-green-500 text-white px-4 py-2 mb-6 rounded hover:bg-green-600"
      >
        Adicionar Aluno
      </button>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar aluno"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
      />

      {/* Tabela de Alunos */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2 border border-gray-300">Nome</th>
            <th className="px-4 py-2 border border-gray-300">E-mail</th>
            <th className="px-4 py-2 border border-gray-300">Data de Nascimento</th>
            <th className="px-4 py-2 border border-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{aluno.nome}</td>
              <td className="px-4 py-2">{aluno.email}</td>
              <td className="px-4 py-2">{aluno.dataNascimento}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteAluno(aluno.id)}
                  className="text-red-500 hover:text-red-700 mx-2"
                >
                  <FaTrash size={18} />
                </button>
                <button
                  onClick={() => handleViewProfile(aluno)}
                  className="text-green-500 hover:text-green-700 mx-2"
                >
                  <FaUserCheck size={18} />
                </button>
                <button
                  onClick={() => handleEditClick(aluno)}
                  className="text-blue-500 hover:text-blue-700 mx-2"
                >
                  <FaEdit size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulário para Adicionar ou Editar Aluno */}
      {(showForm || editAluno) && (
        <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
          <h2 className="text-xl mb-4">
            {editAluno ? "Editar Aluno" : "Adicionar Novo Aluno"}
          </h2>
          <input
            type="text"
            name="nome"
            value={editAluno ? editAluno.nome : newAluno.nome}
            onChange={handleInputChange}
            placeholder="Nome"
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <input
            type="email"
            name="email"
            value={editAluno ? editAluno.email : newAluno.email}
            onChange={handleInputChange}
            placeholder="E-mail"
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <input
            type="date"
            name="dataNascimento"
            value={editAluno ? editAluno.dataNascimento : newAluno.dataNascimento}
            onChange={handleInputChange}
            placeholder="Data de Nascimento"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <button
            onClick={editAluno ? handleEditSubmit : handleAddAlunoSubmit}
            className="bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-600"
          >
            {editAluno ? "Salvar Alterações" : "Adicionar Aluno"}
          </button>
        </div>
      )}

      {/* Modal de Visualizar Aluno */}
      {selectedAluno && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Detalhes do Aluno</h2>
            <p><strong>Nome:</strong> {selectedAluno.nome}</p>
            <p><strong>E-mail:</strong> {selectedAluno.email}</p>
            <p><strong>Data de Nascimento:</strong> {selectedAluno.dataNascimento}</p>
            <button
              onClick={() => setSelectedAluno(null)}  // Fecha o modal
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
