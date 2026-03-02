<p align="center">
<img src="https://i.imgur.com/wEgrF4w.png" width="350" height="350"/>
</p>
<h1 align="center">⚽ Brasileirão A and B ⚽</h1>
<p align="center">
<a href="https://github.com/gabrieldiaspereira/brasileirao/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/gabrieldiaspereira/brasileirao?label=stars&style=flat&color=#79C83D"></a>
<a href="https://github.com/gabrieldiaspereira/brasileirao/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/gabrieldiaspereira/brasileirao?label=watching&style=flat&color=#79C83D"></a>
<a href="https://github.com/gabrieldiaspereira"><img title="Author" src="https://img.shields.io/badge/author-gabrieldiaspereira-blue.svg?logo=github&color=#79C83D"></a>
<a href="https://www.npmjs.com/package/@gabrieldiaspereira/brasileirao">
  <img src="https://img.shields.io/npm/v/@gabrieldiaspereira/brasileirao?color=green" />
</a>
<a href="https://www.npmjs.com/package/@gabrieldiaspereira/brasileirao">
  <img src="https://img.shields.io/npm/dm/@gabrieldiaspereira/brasileirao" />
</a>
</p>
<h3 align="center"> 🔎 Query table data and all rounds of Brazilian Championship Series A and B.</h3>

<p align="center">
Node.js library to fetch updated data from Brazilian Championship Series A and B.
</p>

[Leia em Português](README.md)

## ✨ Features

- ✅ Series A (Brasileirão Série A)
- ✅ Series B (Brasileirão Série B)
- ✅ Complete rounds data
- ✅ TypeScript support
- ✅ Functions in Portuguese and English
- ✅ ESM and CommonJS

## Installation:
npm:
```bash
npm i --save @gabrieldiaspereira/brasileirao
```

yarn:
```bash
yarn add @gabrieldiaspereira/brasileirao
```

## Usage Example
```js
import {getLeagueAData, getLeagueBData} from '@gabrieldiaspereira/brasileirao'

const leagueA = await getLeagueAData() // Pass false as parameter if you don't want rounds data.
const leagueB = await getLeagueBData() // Pass false as parameter if you don't want rounds data.

```

## Response Example

⚠️ **Note:** Response fields remain in Portuguese to preserve data consistency with the original Brazilian Championship data.

On a successful response with rounds:
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

In case of error, the object will be rejected with the error message:
```js
{
    erro: "Error message"
}
```

## API Reference

### Functions

#### `getLeagueAData(rounds?: boolean): Promise<LeagueData>`
Fetches data for Brazilian Championship Series A (Brasileirão Série A).

**Parameters:**
- `rounds` (optional, default: `true`): Whether to include rounds data in the response.

**Returns:** Promise that resolves to a `LeagueData` object.

---

#### `getLeagueBData(rounds?: boolean): Promise<LeagueData>`
Fetches data for Brazilian Championship Series B (Brasileirão Série B).

**Parameters:**
- `rounds` (optional, default: `true`): Whether to include rounds data in the response.

**Returns:** Promise that resolves to a `LeagueData` object.

---

### TypeScript Interfaces

#### `LeagueData`
```typescript
interface LeagueData {
    tabela: TeamTable[]    // Table/standings
    rodadas?: Round[]      // Rounds (optional)
}
```

#### `TeamTable`
```typescript
interface TeamTable {
    nome: string              // Team name
    escudo: string            // Team badge URL
    posicao: string           // Position in table
    pontos: string            // Points
    jogos: string             // Matches played
    vitorias: string          // Wins
    empates: string           // Draws
    derrotas: string          // Losses
    gols_pro: string          // Goals scored
    gols_contra: string       // Goals conceded
    saldo_gols: string        // Goal difference
    aproveitamento: string    // Success rate
}
```

#### `Round`
```typescript
interface Round {
    rodada: string           // Round name (e.g., "1ª rodada")
    inicio: string           // Start date (DD/MM/YYYY)
    rodada_atual: boolean    // Whether it's the current round
    partidas: Match[]        // Matches in this round
}
```

#### `Match`
```typescript
interface Match {
    partida: string          // Match description (e.g., "Team A x Team B")
    data: string             // Match date and time
    local: string            // Stadium name
    time_casa: string        // Home team
    time_fora: string        // Away team
    gols_casa: string        // Home team goals
    gols_fora: string        // Away team goals
    resultado_texto: string  // Result text
}
```

## Note
The API also exports Portuguese-named functions for compatibility:
- `obterDadosBrasileiraoA` (alias for `getLeagueAData`)
- `obterDadosBrasileiraoB` (alias for `getLeagueBData`)
