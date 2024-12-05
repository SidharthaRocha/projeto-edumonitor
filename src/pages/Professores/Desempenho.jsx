import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaFilePdf, FaPlus, FaEdit, FaArrowLeft, FaUser } from "react-icons/fa";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom"; // Importação do hook de navegação
import "chart.js/auto";

const alunosData = [
  { id: 1, nome: "João Silva", notas: [8, 7, 9, 6] },
  { id: 2, nome: "Maria Oliveira", notas: [9, 8, 10, 7] },
  // Outros alunos...
];

export default function Desempenho() {
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [novaNota, setNovaNota] = useState("");
  const [notaEditada, setNotaEditada] = useState(null);
  const [alunos, setAlunos] = useState(alunosData);
  const navigate = useNavigate(); // Inicializa o hook

  const handleSelectAluno = (aluno) => {
    setSelectedAluno(aluno);
  };

  const handleAddNota = () => {
    if (!novaNota || isNaN(novaNota)) return;
    const updatedAlunos = alunos.map((aluno) =>
      aluno.id === selectedAluno.id
        ? { ...aluno, notas: [...aluno.notas, parseFloat(novaNota)] }
        : aluno
    );
    setAlunos(updatedAlunos);
    setNovaNota("");
  };

  const handleEditNota = (index) => {
    if (!notaEditada || isNaN(notaEditada)) return;
    const updatedAlunos = alunos.map((aluno) => {
      if (aluno.id === selectedAluno.id) {
        const updatedNotas = [...aluno.notas];
        updatedNotas[index] = parseFloat(notaEditada);
        return { ...aluno, notas: updatedNotas };
      }
      return aluno;
    });
    setAlunos(updatedAlunos);
    setNotaEditada("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Relatório de Desempenho - ${selectedAluno.nome}`, 10, 10);
    doc.setFontSize(12);
    selectedAluno.notas.forEach((nota, index) => {
      doc.text(`Avaliação ${index + 1}: ${nota}`, 10, 20 + index * 10);
    });
    doc.save(`${selectedAluno.nome}-relatorio.pdf`);
  };

  const chartData = selectedAluno
    ? {
        labels: selectedAluno.notas.map((_, index) => `Avaliação ${index + 1}`),
        datasets: [
          {
            label: "Notas",
            data: selectedAluno.notas,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div className="p-6">
      {/* Ícone de Voltar com React Router DOM */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/Dashboard-professor")}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <FaArrowLeft size={20} className="mr-2" /> Voltar
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Desempenho dos Alunos</h1>

      {/* Lista de Alunos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Selecione um Aluno</h2>
        <div className="flex flex-wrap gap-4">
          {alunos.map((aluno) => (
            <button
              key={aluno.id}
              onClick={() => handleSelectAluno(aluno)}
              className={`px-4 py-2 rounded text-white ${
                selectedAluno?.id === aluno.id ? "bg-blue-600" : "bg-blue-400"
              } hover:bg-blue-700`}
            >
              <FaUser className="inline mr-2" />
              {aluno.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico de Desempenho */}
      {selectedAluno && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Gráfico de Desempenho</h2>
            <Bar data={chartData} />
          </div>

          {/* Adicionar Notas */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Adicionar Nova Nota</h2>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={novaNota}
                onChange={(e) => setNovaNota(e.target.value)}
                placeholder="Insira a nota"
                className="border border-gray-300 rounded p-2 w-32"
              />
              <button
                onClick={handleAddNota}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <FaPlus className="inline mr-2" />
                Adicionar Nota
              </button>
            </div>
          </div>

          {/* Editar Notas */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Editar Notas</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2 border border-gray-300">Avaliação</th>
                  <th className="px-4 py-2 border border-gray-300">Nota</th>
                  <th className="px-4 py-2 border border-gray-300">Editar</th>
                </tr>
              </thead>
              <tbody>
                {selectedAluno.notas.map((nota, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">Avaliação {index + 1}</td>
                    <td className="px-4 py-2">{nota}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        placeholder="Nova Nota"
                        onChange={(e) => setNotaEditada(e.target.value)}
                        className="border border-gray-300 rounded p-1 mr-2 w-24"
                      />
                      <button
                        onClick={() => handleEditNota(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Relatório */}
          <div className="mb-6">
            <button
              onClick={generatePDF}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <FaFilePdf className="inline mr-2" />
              Download Relatório
            </button>
          </div>
        </>
      )}
    </div>
  );
}
