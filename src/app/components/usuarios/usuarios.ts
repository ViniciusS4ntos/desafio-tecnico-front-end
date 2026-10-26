import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, UserDTO } from '../../services/userService';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: UserDTO[] = [];
  errorMessage: string = '';
  
  // Controlo para mostrar/esconder o formulário de novo utilizador
  mostrarFormularioCriacao: boolean = false;
  novoUtilizador: UserDTO = { nome: '', email: '', senha: '' };

  // Utilizador selecionado para edição
  utilizadorEmEdicao: UserDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Carrega os utilizadores automaticamente assim que o componente é inicializado
    this.carregarUtilizadores();
  }

  carregarUtilizadores(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        console.log('Dados recebidos:', data);
        this.usuarios = Array.isArray(data) ? data : (data.content || []);
      },
      error: (err) => {
        console.error('Erro ao carregar utilizadores:', err);
        this.errorMessage = 'Não foi possível carregar a lista de utilizadores.';
      }
    });
  }

  toggleFormularioCriacao(): void {
    this.mostrarFormularioCriacao = !this.mostrarFormularioCriacao;
    if (this.mostrarFormularioCriacao) {
      // Garante que o form abre completamente limpo criando uma nova referência
      this.novoUtilizador = { nome: '', email: '', senha: '' };
    }
    this.utilizadorEmEdicao = null; 
  }

  criarUtilizador(): void {
    if (!this.novoUtilizador.nome || !this.novoUtilizador.email || !this.novoUtilizador.senha) {
      alert('Por favor, preenche todos os campos (Nome, E-mail e Senha).');
      return;
    }

    this.userService.createUser(this.novoUtilizador).subscribe({
      next: () => {
        this.carregarUtilizadores(); // Atualiza a tabela com o novo usuário
        
        // Zera e substitui por uma nova instância para limpar os inputs instantaneamente da tela
        this.novoUtilizador = { nome: '', email: '', senha: '' };
        this.mostrarFormularioCriacao = false;
      },
      error: (err) => {
        console.error('Erro ao criar utilizador', err);
        alert('Erro ao criar o utilizador.');
      }
    });
  }

  deletarUtilizador(email: string): void {
    if (confirm(`Tens a certeza que pretendes apagar o utilizador com o e-mail ${email}?`)) {
      this.userService.deleteUser(email).subscribe({
        next: () => {
          this.carregarUtilizadores(); // Atualiza a tabela após apagar
        },
        error: (err) => {
          console.error('Erro ao apagar utilizador', err);
        }
      });
    }
  }

  selecionarParaEdicao(user: UserDTO): void {
    this.utilizadorEmEdicao = { ...user, senha: '' };
    this.mostrarFormularioCriacao = false; 
  }

  guardarEdicao(): void {
    if (!this.utilizadorEmEdicao) return;

    // Função auxiliar para transformar string vazia em null (se o backend aceitar null)
    // Ou se preferires não enviar o email caso ele não tenha mudado, podes ajustar aqui.
    const limparVazio = (valor: string | undefined | null) => {
      if (!valor || valor.trim() === '') {
        return null;
      }
      return valor;
    };

    // Monta o payload dinamicamente focado no utilizador
    const payload: any = {
      nome: limparVazio(this.utilizadorEmEdicao.nome),
      email: limparVazio(this.utilizadorEmEdicao.email)
    };

    // Se o utilizador preencheu uma nova senha, enviamos. 
    // Se deixou em branco, não mandamos o campo 'senha' para o backend não a sobrescrever com vazio/null.
    if (this.utilizadorEmEdicao.senha && this.utilizadorEmEdicao.senha.trim() !== '') {
      payload.senha = this.utilizadorEmEdicao.senha;
    }

    if (this.utilizadorEmEdicao.id) {
      this.userService.updateUser(this.utilizadorEmEdicao.id, payload).subscribe({
        next: () => {
          this.utilizadorEmEdicao = null;
          this.carregarUtilizadores(); // Atualiza a tabela após editar
        },
        error: (err) => {
          console.error('Erro ao atualizar utilizador', err);
          alert('Erro ao atualizar o utilizador.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.utilizadorEmEdicao = null;
  }
}