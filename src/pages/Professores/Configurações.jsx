import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ConfiguracoesProfessor = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [userInfo, setUserInfo] = useState({
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    senha: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
  });

  // Função para salvar perfil
  const handleSaveProfile = () => {
    alert('Informações atualizadas com sucesso!');
    // Lógica para enviar dados para o backend aqui
  };

  // Função para salvar notificações
  const handleSaveNotifications = () => {
    alert('Configurações de notificações salvas!');
    // Lógica para enviar dados para o backend aqui
  };

  return (
    <div className="min-h-screen bg-gray-100 font-poppins p-6">
      {/* Botão de Voltar */}
      <div className="mb-4">
        <Link
          to="/Dashboard-professor" // Substitua pelo caminho para onde o botão deve redirecionar
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          <FaArrowLeft className="mr-2" /> Voltar
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-indigo-800 mb-6">Configurações</h1>

      {/* Abas */}
      <div className="flex space-x-6 border-b border-gray-300 pb-2">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`text-lg font-semibold ${
            activeTab === 'perfil' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
        >
          Editar Perfil
        </button>
        <button
          onClick={() => setActiveTab('notificacoes')}
          className={`text-lg font-semibold ${
            activeTab === 'notificacoes' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
        >
          Configurar Notificações
        </button>
      </div>

      {/* Conteúdo */}
      <div className="mt-6">
        {activeTab === 'perfil' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Editar Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  value={userInfo.nome}
                  onChange={(e) => setUserInfo({ ...userInfo, nome: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Senha</label>
                <input
                  type="password"
                  value={userInfo.senha}
                  onChange={(e) => setUserInfo({ ...userInfo, senha: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notificacoes' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Configurar Notificações</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={notificationSettings.email}
                  onChange={() =>
                    setNotificationSettings((prev) => ({ ...prev, email: !prev.email }))
                  }
                  className="w-4 h-4"
                />
                <label className="text-gray-700">Receber notificações por email</label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={notificationSettings.sms}
                  onChange={() =>
                    setNotificationSettings((prev) => ({ ...prev, sms: !prev.sms }))
                  }
                  className="w-4 h-4"
                />
                <label className="text-gray-700">Receber notificações por SMS</label>
              </div>
              <button
                onClick={handleSaveNotifications}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfiguracoesProfessor;
