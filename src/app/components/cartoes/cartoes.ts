import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardService, CardDTO } from '../../services/cardService';

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cartoes.html',
  styleUrls: ['./cartoes.css']
})
export class CartoesComponent implements OnInit {
  cartoes: CardDTO[] = [];
  errorMessage: string = '';

  mostrarFormularioCriacao: boolean = false;
  cartaoEmEdicao: CardDTO | null = null;

  novoCartao: CardDTO = {
    nome: '',
    status: true,
    tipoCartao: 'COMUM'
  };
  userId: number = 1; 

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.carregarCartoes();
  }

  toggleFormularioCriacao(): void {
    this.mostrarFormularioCriacao = !this.mostrarFormularioCriacao;
    if (this.mostrarFormularioCriacao) {
      this.cartaoEmEdicao = null;
    }
  }

  carregarCartoes(): void {
    this.cardService.getCards().subscribe({
      next: (data: any) => {
        this.cartoes = Array.isArray(data) ? data : (data.content || []);
      },
      error: (err) => {
        console.error('Erro ao carregar cartões', err);
        this.errorMessage = 'Não foi possível carregar a lista de cartões.';
      }
    });
  }

  criarCartao(): void {
    if (!this.novoCartao.nome || !this.userId) {
      alert('Por favor, preencha o nome e o ID do utilizador.');
      return;
    }

    this.cardService.createCard(this.novoCartao, this.userId).subscribe({
      next: () => {
        this.carregarCartoes();
        this.novoCartao = { nome: '', status: true, tipoCartao: 'COMUM' }; 
        this.mostrarFormularioCriacao = false; 
      },
      error: (err) => {
        console.error('Erro ao criar cartão', err);
        alert('Erro ao criar o cartão.');
      }
    });
  }

  selecionarParaEdicao(card: CardDTO): void {
    this.cartaoEmEdicao = { ...card };
    this.mostrarFormularioCriacao = false;
  }

  guardarEdicaoCartao(): void {
    if (!this.cartaoEmEdicao || this.cartaoEmEdicao.numeroCartao === undefined) {
      alert('Número do cartão inválido.');
      return;
    }

    // Função  para transformar string vazia ou espaços em branco em null
    const limparVazio = (valor: string | undefined | null) => {
      if (!valor || valor.trim() === '') {
        return null;
      }
      return valor;
    };

    // Monta o payload limpo aplicando a verificação em cada campo editável
    const payload: any = {
      nome: limparVazio(this.cartaoEmEdicao.nome),
      tipoCartao: this.cartaoEmEdicao.tipoCartao,
      status: this.cartaoEmEdicao.status
    };

    // Envia o payload tratado em vez de enviar o objeto inteiro direto do formulário
    this.cardService.updateCard(this.cartaoEmEdicao.numeroCartao, payload).subscribe({
      next: () => {
        this.carregarCartoes();
        this.cartaoEmEdicao = null;
      },
      error: (err) => {
        console.error('Erro ao atualizar cartão', err);
        alert('Erro ao atualizar o cartão.');
      }
    });
  }

  cancelarEdicaoCartao(): void {
    this.cartaoEmEdicao = null;
  }

  alternarStatus(numeroCartao: number | null | undefined): void {
    if (numeroCartao === undefined || numeroCartao === null) {
      alert('Erro: Número do cartão não encontrado.');
      return;
    }

    this.cardService.toggleStatusCard(numeroCartao).subscribe({
      next: () => this.carregarCartoes(),
      error: (err) => {
        console.error('Erro ao alterar status do cartão', err);
        alert('Erro ao ativar/desativar o cartão.');
      }
    });
  }

  deletarCartao(numeroCartao: number | null | undefined): void {
    if (numeroCartao === undefined || numeroCartao === null) {
      alert('Erro: Número do cartão não encontrado.');
      return;
    }

    if (confirm(`Tens a certeza que pretendes eliminar o cartão ${numeroCartao}?`)) {
      this.cardService.deleteCard(numeroCartao).subscribe({
        next: () => this.carregarCartoes(),
        error: (err) => {
          console.error('Erro ao eliminar cartão', err);
          alert('Erro ao eliminar o cartão.');
        }
      });
    }
  }
}