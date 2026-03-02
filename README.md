<p align="center">
<img src="https://i.imgur.com/wEgrF4w.png" width="350" height="350"/>
</p>
<h1 align="center">⚽ Brasileirão A e B ⚽</h1>
<p align="center">
<a href="https://github.com/gabrieldiaspereira/brasileirao/stargazers/"><img title="Estrelas" src="https://img.shields.io/github/stars/gabrieldiaspereira/brasileirao?label=estrelas&style=flat&color=#79C83D"></a>
<a href="https://github.com/gabrieldiaspereira/brasileirao/watchers"><img title="Acompanhando" src="https://img.shields.io/github/watchers/gabrieldiaspereira/brasileirao?label=acompanhando&style=flat&color=#79C83D"></a>
<a href="https://github.com/gabrieldiaspereira"><img title="Autor" src="https://img.shields.io/badge/autor-gabrieldiaspereira-blue.svg?logo=github&color=#79C83D"></a>
<a href="https://www.npmjs.com/package/@gabrieldiaspereira/brasileirao">
  <img src="https://img.shields.io/npm/v/@gabrieldiaspereira/brasileirao?color=green" />
</a>
<a href="https://www.npmjs.com/package/@gabrieldiaspereira/brasileirao">
  <img src="https://img.shields.io/npm/dm/@gabrieldiaspereira/brasileirao" />
</a>
</p>
<h3 align="center"> 🔎 Consulta de dados de tabela e de todas as rodadas.</h3>

<p align="center">
Biblioteca Node.js para consultar dados atualizados do Campeonato Brasileiro Série A e B.
</p>

[Read in English](README_EN.md)

## ✨ Features

- ✅ Série A
- ✅ Série B
- ✅ Rodadas completas
- ✅ Suporte a TypeScript
- ✅ Funções em Português e Inglês
- ✅ ESM e CommonJS

## Instalação :
npm :
```bash
npm i --save @gabrieldiaspereira/brasileirao
```

yarn :
```bash
yarn add @gabrieldiaspereira/brasileirao
```

## Exemplo de Uso

Em Português:
```js
import {obterDadosBrasileiraoA, obterDadosBrasileiraoB} from '@gabrieldiaspereira/brasileirao'

const brasileiraoA = await obterDadosBrasileiraoA() //Se não quiser os dados de rodadas dê false como parâmetro.
const brasileiraoB = await obterDadosBrasileiraoB() //Se não quiser os dados de rodadas dê false como parâmetro.
```

Em Inglês:
```js
import {getLeagueAData, getLeagueBData} from '@gabrieldiaspereira/brasileirao'

const leagueA = await getLeagueAData() // Pass false as parameter if you don't want rounds data.
const leagueB = await getLeagueBData() // Pass false as parameter if you don't want rounds data.
```

## Exemplo de Resposta
Em uma resposta bem-sucedida com as rodadas :
```js
{
    tabela: [
        {
            nome: 'Flamengo',
            escudo: 'https://p2.trrsf.com/image/fget/cf/51/51/s1.trrsf.com/musa/pro/6juc9voua610blou9p2ih6r6pj.png',
            posicao: '1',
            pontos: '14',
            jogos: '7',
            vitorias: '4',
            empates: '2',
            derrotas: '1',
            gols_pro: '13',
            gols_contra: '6',
            saldo_gols: '7',
            aproveitamento: '66%'
        },
        ...
    ],
    rodadas: [
        { 
            rodada: '1ª rodada',
            inicio: '13/04/2024',
            rodada_atual: false,
            partidas: [
                {
                    partida: 'Criciúma x Juventude',
                    data: 'Sáb 13/04 18h30',
                    local: 'Heriberto Hülse',
                    time_casa: 'Criciúma',
                    time_fora: 'Juventude',
                    gols_casa: '1',
                    gols_fora: '1',
                    resultado_texto: 'Criciúma 1 x 1 Juventude'
                },
                ...
            ]
        },
        ...
    ]
}

```

Em caso de erro, será rejeitado o objeto com a mensagem de erro :
```js
{
    erro: "Mensagem de erro"
}
```

## Referência da API

### Funções

#### `obterDadosBrasileiraoA(rodadas?: boolean): Promise<LeagueData>`
Obtém dados da Série A do Campeonato Brasileiro.

**Parâmetros:**
- `rodadas` (opcional, padrão: `true`): Se deve incluir os dados das rodadas na resposta.

**Retorna:** Promise que resolve para um objeto `LeagueData`.

---

#### `obterDadosBrasileiraoB(rodadas?: boolean): Promise<LeagueData>`
Obtém dados da Série B do Campeonato Brasileiro.

**Parâmetros:**
- `rodadas` (opcional, padrão: `true`): Se deve incluir os dados das rodadas na resposta.

**Retorna:** Promise que resolve para um objeto `LeagueData`.

---

### Interfaces TypeScript

#### `LeagueData`
```typescript
interface LeagueData {
    tabela: TeamTable[]    // Tabela de classificação
    rodadas?: Round[]      // Rodadas (opcional)
}
```

#### `TeamTable`
```typescript
interface TeamTable {
    nome: string              // Nome do time
    escudo: string            // URL do escudo do time
    posicao: string           // Posição na tabela
    pontos: string            // Pontos
    jogos: string             // Jogos disputados
    vitorias: string          // Vitórias
    empates: string           // Empates
    derrotas: string          // Derrotas
    gols_pro: string          // Gols marcados
    gols_contra: string       // Gols sofridos
    saldo_gols: string        // Saldo de gols
    aproveitamento: string    // Taxa de aproveitamento
}
```

#### `Round`
```typescript
interface Round {
    rodada: string           // Nome da rodada (ex: "1ª rodada")
    inicio: string           // Data de início (DD/MM/YYYY)
    rodada_atual: boolean    // Se é a rodada atual
    partidas: Match[]        // Partidas desta rodada
}
```

#### `Match`
```typescript
interface Match {
    partida: string          // Descrição da partida (ex: "Time A x Time B")
    data: string             // Data e hora da partida
    local: string            // Nome do estádio
    time_casa: string        // Time da casa
    time_fora: string        // Time visitante
    gols_casa: string        // Gols do time da casa
    gols_fora: string        // Gols do time visitante
    resultado_texto: string  // Texto do resultado
}
```

## Nota
A API também exporta funções com nomes em inglês para compatibilidade:
- `getLeagueAData` (alias para `obterDadosBrasileiraoA`)
- `getLeagueBData` (alias para `obterDadosBrasileiraoB`)
