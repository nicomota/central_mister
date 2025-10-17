// Interface que define a estrutura de um curso individual
// Gerenciar o progresso de cada aula
export interface Curso {
  id: number;           // ID único do curso
  nome: string;         // Nome da aula/curso
  url: string;          // URL do vídeo no YouTube
  completado: boolean;  // Status de conclusão da aula
}

// Interface que representa um módulo completo com suas aulas
// Desenvolvido para organizar os cursos em módulos temáticos
export interface Modulo {
  id: number;              // ID único do módulo
  nome_modulo: string;     // Nome do módulo (ex: "Cadastros Inteligentes")
  completado: boolean;     // Status de conclusão do módulo completo
  cursos: Curso[];         // Array com todas as aulas deste módulo
}

// Interface principal que armazena todo o progresso do usuário
// Esta estrutura é salva em arquivo JSON individual por usuário
export interface UserProgress {
  login: string;      // Email do usuário (usado como identificador)
  modulos: Modulo[];  // Array com todos os 10 módulos do sistema
}
