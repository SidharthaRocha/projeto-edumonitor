import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notificacoes = () => {
  const [mensagem, setMensagem] = useState('');
  const [destinatarios, setDestinatarios] = useState('');
  const [notificacoes, setNotificacoes] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const mockNotificacoes = [
      { id: 1, mensagem: 'Lembre-se da prova amanhã!', destinatarios: 'Turma A', status: 'Enviada' },
      { id: 2, mensagem: 'Tragam os projetos na sexta-feira.', destinatarios: 'Turma B', status: 'Lida' },
    ];
    setNotificacoes(mockNotificacoes);
  }, []);

  const handleEnviarNotificacao = () => {
    if (!mensagem || !destinatarios) {
      setStatus('Por favor, preencha todos os campos.');
      return;
    }

    const novaNotificacao = {
      id: notificacoes.length + 1,
      mensagem,
      destinatarios,
      status: 'Enviada',
    };

    setNotificacoes((prev) => [novaNotificacao, ...prev]);
    setMensagem('');
    setDestinatarios('');
    setStatus('Notificação enviada com sucesso!');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      {/* Ícone de Voltar */}
      <button
        onClick={() => navigate(-1)} // Voltar à página anterior
        className="flex items-center text-purple-800 hover:text-purple-600 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>

      <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Gerenciar Notificações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna 1: Enviar Notificação */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Enviar Notificação</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Destinatários</label>
            <input
              type="text"
              placeholder="Ex: Turma A, Aluno específico..."
              value={destinatarios}
              onChange={(e) => setDestinatarios(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mensagem</label>
            <textarea
              placeholder="Digite sua mensagem aqui..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={5}
            />
          </div>
          {status && <p className="text-sm text-green-600 mb-4">{status}</p>}
          <button
            onClick={handleEnviarNotificacao}
            className="w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Enviar
          </button>
        </div>

        {/* Coluna 2: Histórico de Notificações */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Histórico de Notificações</h2>
          {notificacoes.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {notificacoes.map((notificacao) => (
                <li
                  key={notificacao.id}
                  className="py-4 flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Para:</strong> {notificacao.destinatarios}
                    </p>
                    <p className="text-gray-800">{notificacao.mensagem}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-lg font-medium ${
                      notificacao.status === 'Lida'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {notificacao.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma notificação enviada ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notificacoes;
